// @flow
import 'videojs-contrib-ads'; // must be loaded in this order
import 'videojs-ima'; // loads directly after contrib-ads
import 'videojs-vtt-thumbnails';
import 'video.js/dist/alt/video-js-cdn.min.css';
import './plugins/videojs-mobile-ui/plugin';
import '@silvermine/videojs-chromecast/dist/silvermine-videojs-chromecast.css';
import '@silvermine/videojs-airplay/dist/silvermine-videojs-airplay.css';
import * as ICONS from 'constants/icons';
import { VIDEO_PLAYBACK_RATES } from 'constants/player';
import * as OVERLAY from './overlays';
import Button from 'component/button';
import classnames from 'classnames';
import events from './videojs-events';
import eventTracking from 'videojs-event-tracking';
import functions from './videojs-functions';
import hlsQualitySelector from './plugins/videojs-hls-quality-selector/plugin';
import keyboardShorcuts from './videojs-keyboard-shortcuts';
import LbryVolumeBarClass from './lbry-volume-bar';
import Chromecast from './chromecast';
import playerjs from 'player.js';
import qualityLevels from 'videojs-contrib-quality-levels';
import React, { useEffect, useRef, useState } from 'react';
import i18n from './plugins/videojs-i18n/plugin';
import recsys from './plugins/videojs-recsys/plugin';
// import runAds from './ads';
import videojs from 'video.js';
import { useIsMobile } from 'effects/use-screensize';
import { platform } from 'util/platform';
import usePersistedState from 'effects/use-persisted-state';

require('@silvermine/videojs-chromecast')(videojs);
require('@silvermine/videojs-airplay')(videojs);

export type Player = {
  // -- custom --
  claimSrcOriginal: ?{ src: string, type: string },
  claimSrcVhs: ?{ src: string, type: string },
  isLivestream?: boolean,
  // -- plugins ---
  mobileUi: (any) => void,
  chromecast: (any) => void,
  overlay: (any) => void,
  hlsQualitySelector: ?any,
  i18n: (any) => void,
  // -- base videojs --
  controlBar: { addChild: (string, any) => void },
  loadingSpinner: any,
  autoplay: (any) => boolean,
  tech: (?boolean) => { vhs: ?any },
  currentTime: (?number) => number,
  dispose: () => void,
  duration: () => number,
  ended: () => boolean,
  error: () => any,
  exitFullscreen: () => boolean,
  getChild: (string) => any,
  isFullscreen: () => boolean,
  muted: (?boolean) => boolean,
  on: (string, (any) => void) => void,
  one: (string, (any) => void) => void,
  play: () => Promise<any>,
  playbackRate: (?number) => number,
  readyState: () => number,
  requestFullscreen: () => boolean,
  src: ({ src: string, type: string }) => ?string,
  currentSrc: () => string,
  userActive: (?boolean) => boolean,
  volume: (?number) => number,
};

type Props = {
  adUrl: ?string,
  allowPreRoll: ?boolean,
  autoplay: boolean,
  claimId: ?string,
  title: ?string,
  channelTitle: string,
  embedded: boolean,
  internalFeatureEnabled: ?boolean,
  isAudio: boolean,
  poster: ?string,
  replay: boolean,
  shareTelemetry: boolean,
  source: string,
  sourceType: string,
  startMuted: boolean,
  userId: ?number,
  defaultQuality: ?string,
  onPlayerReady: (Player, any) => void,
  playNext: () => void,
  playPrevious: () => void,
  toggleVideoTheaterMode: () => void,
  claimRewards: () => void,
  doAnalyticsView: (string, number) => void,
  doAnalyticsBuffer: (string, any) => void,
  uri: string,
  claimValues: any,
  isLivestreamClaim: boolean,
  userClaimId: ?string,
  activeLivestreamForChannel: any,
  doToast: ({ message: string, linkText: string, linkTarget: string }) => void,
};

const IS_IOS = platform.isIOS();
const IS_MOBILE = platform.isMobile();

const PLUGIN_MAP = {
  eventTracking: eventTracking,
  hlsQualitySelector: hlsQualitySelector,
  qualityLevels: qualityLevels,
  recsys: recsys,
  i18n: i18n,
};

Object.entries(PLUGIN_MAP).forEach(([pluginName, plugin]) => {
  if (!Object.keys(videojs.getPlugins()).includes(pluginName)) {
    videojs.registerPlugin(pluginName, plugin);
  }
});

// ****************************************************************************
// VideoJs
// ****************************************************************************

/*
properties for this component should be kept to ONLY those that if changed should REQUIRE an entirely new videojs element
 */
export default React.memo<Props>(function VideoJs(props: Props) {
  const {
    // adUrl, // TODO: this ad functionality isn't used, can be pulled out
    // allowPreRoll,
    autoplay,
    claimId,
    title,
    channelTitle,
    embedded,
    // internalFeatureEnabled, // for people on the team to test new features internally
    isAudio,
    poster,
    replay,
    shareTelemetry,
    source,
    sourceType,
    startMuted,
    userId,
    defaultQuality,
    onPlayerReady,
    playNext,
    playPrevious,
    toggleVideoTheaterMode,
    claimValues,
    doAnalyticsView,
    doAnalyticsBuffer,
    claimRewards,
    uri,
    userClaimId,
    isLivestreamClaim,
    activeLivestreamForChannel,
    doToast,
  } = props;

  // used to notify about default quality setting
  // if already has a quality set, no need to notify
  const [initialQualityChange, setInitialQualityChange] = usePersistedState(
    'initial-quality-change',
    Boolean(defaultQuality)
  );

  const isMobile = useIsMobile();

  const playerRef = useRef();
  const containerRef = useRef();
  const tapToUnmuteRef = useRef();
  const tapToRetryRef = useRef();
  const playerServerRef = useRef();

  const { url: livestreamVideoUrl } = activeLivestreamForChannel || {};
  const overrideNativeVhs = !platform.isIPhone();
  const showQualitySelector = (!isLivestreamClaim && overrideNativeVhs) || livestreamVideoUrl;

  // initiate keyboard shortcuts
  const { curried_function } = keyboardShorcuts({
    isMobile,
    isLivestreamClaim,
    toggleVideoTheaterMode,
    playNext,
    playPrevious,
  });

  const [reload, setReload] = useState('initial');

  const { createVideoPlayerDOM } = functions({ isAudio });

  const { unmuteAndHideHint, retryVideoAfterFailure, initializeEvents } = events({
    tapToUnmuteRef,
    tapToRetryRef,
    setReload,
    playerRef,
    replay,
    claimValues,
    userId,
    claimId,
    embedded,
    doAnalyticsView,
    doAnalyticsBuffer,
    claimRewards,
    uri,
    playerServerRef,
    isLivestreamClaim,
    channelTitle,
  });

  const videoJsOptions = {
    preload: 'auto',
    playbackRates: VIDEO_PLAYBACK_RATES,
    responsive: true,
    controls: true,
    html5: {
      vhs: {
        overrideNative: overrideNativeVhs, // !videojs.browser.IS_ANY_SAFARI,
        enableLowInitialPlaylist: false,
        fastQualityChange: true,
        useDtsForTimestampOffset: true,
      },
    },
    liveTracker: {
      trackingThreshold: 0,
      liveTolerance: 10,
    },
    inactivityTimeout: 2000,
    autoplay: autoplay,
    muted: startMuted,
    poster: poster, // thumb looks bad in app, and if autoplay, flashing poster is annoying
    plugins: { eventTracking: true, overlay: OVERLAY.OVERLAY_DATA },
    controlBar: {
      currentTimeDisplay: !isLivestreamClaim,
      timeDivider: !isLivestreamClaim,
      durationDisplay: !isLivestreamClaim,
      remainingTimeDisplay: !isLivestreamClaim,
      subsCapsButton: !IS_IOS,
    },
    techOrder: ['chromecast', 'html5'],
    chromecast: {
      requestTitleFn: (src) => title || '',
      requestSubtitleFn: (src) => channelTitle || '',
    },
    bigPlayButton: embedded, // only show big play button if embedded
    liveui: isLivestreamClaim,
    suppressNotSupportedError: true,
  };

  // Initialize video.js
  function initializeVideoPlayer(domElement) {
    if (!domElement) return;

    const vjs = videojs(domElement, videoJsOptions, async () => {
      const player = playerRef.current;
      const adapter = new playerjs.VideoJSAdapter(player);

      // this seems like a weird thing to have to check for here
      if (!player) return;

      // runAds(internalFeatureEnabled, allowPreRoll, player, embedded);

      // Replace volume bar with custom LBRY volume bar
      LbryVolumeBarClass.replaceExisting(player);

      // Add reloadSourceOnError plugin
      player.reloadSourceOnError({ errorInterval: 10 });

      // Initialize mobile UI.
      player.mobileUi({
        fullscreen: {
          enterOnRotate: false,
        },
      });

      player.i18n();

      // Add quality selector to player
      if (showQualitySelector) {
        player.hlsQualitySelector({
          displayCurrentQuality: true,
          originalHeight: claimValues?.video?.height,
          defaultQuality,
          initialQualityChange,
          setInitialQualityChange,
          doToast,
        });
      }

      // Add recsys plugin
      if (shareTelemetry) {
        player.recsys({
          videoId: claimId,
          userId: userId,
          embedded: embedded,
        });
      }

      // set playsinline for mobile
      player.children_[0].setAttribute('playsinline', '');

      // immediately show control bar while video is loading
      player.userActive(true);

      adapter.ready();

      Chromecast.initialize(player);
      player.airPlay();
    });

    // fixes #3498 (https://github.com/lbryio/lbry-desktop/issues/3498)
    // summary: on firefox the focus would stick to the fullscreen button which caused buggy behavior with spacebar
    vjs.on('fullscreenchange', () => document.activeElement && document.activeElement.blur());

    return vjs;
  }

  // useEffect(() => {
  //   if (showQualitySelector) {
  //     // Add quality selector to player
  //     const player = playerRef.current;
  //     if (player) player.hlsQualitySelector({ displayCurrentQuality: true });
  //   }
  // }, [showQualitySelector]);

  // This lifecycle hook is only called once (on mount), or when `isAudio` or `source` changes.
  useEffect(() => {
    (async function () {
      let vjsPlayer;
      const vjsParent = document.querySelector('.video-js-parent');

      const canUseOldPlayer = window.oldSavedDiv && vjsParent;

      // initialize videojs if it hasn't been done yet
      if (!canUseOldPlayer) {
        const vjsElement = createVideoPlayerDOM(containerRef.current);
        vjsPlayer = initializeVideoPlayer(vjsElement);
        if (!vjsPlayer) {
          return;
        }

        // Add reference to player to global scope
        window.player = vjsPlayer;
      } else {
        vjsPlayer = window.player;
      }

      if (!embedded) {
        vjsPlayer.bigPlayButton && window.player.bigPlayButton.hide();
      } else {
       vjsPlayer.bigPlayButton?.show();
      }

      // I think this is a callback function
      const videoNode = containerRef.current && containerRef.current.querySelector('video, audio');

      // add theatre and autoplay next button and initiate player events
      onPlayerReady(vjsPlayer, videoNode);

      // Set reference in component state
      playerRef.current = vjsPlayer;

      initializeEvents();

      window.addEventListener('keydown', curried_function(playerRef, containerRef));

      // todo: es-lint is confused by this syntax
      // eslint-disable-next-line no-unused-expressions
      vjsPlayer.controlBar?.show();

      let contentUrl;
      // TODO: pull this function into videojs-functions
      // determine which source to use and load it
      if (isLivestreamClaim && userClaimId) {
        vjsPlayer.isLivestream = true;
        vjsPlayer.addClass('livestreamPlayer');
        vjsPlayer.src({ type: 'application/x-mpegURL', src: livestreamVideoUrl });
      } else {
        vjsPlayer.isLivestream = false;
        vjsPlayer.removeClass('livestreamPlayer');

        // change to m3u8 if applicable
        const response = await fetch(source, { method: 'HEAD', cache: 'no-store' });
        playerServerRef.current = response.headers.get('x-powered-by');
        vjsPlayer.claimSrcOriginal = { type: sourceType, src: source };

        if (response && response.redirected && response.url && response.url.endsWith('m3u8')) {
          vjsPlayer.claimSrcVhs = { type: 'application/x-mpegURL', src: response.url };
          vjsPlayer.src(vjsPlayer.claimSrcVhs);

          contentUrl = response.url;
        } else {
          vjsPlayer.src(vjsPlayer.claimSrcOriginal);
        }
      }

      // initialize hover thumbnails
      if (contentUrl) {
        const trimmedPath = contentUrl.substring(0, contentUrl.lastIndexOf('/'));
        const thumbnailPath = trimmedPath + '/stream_sprite.vtt';

        // progress bar hover thumbnails
        if (!IS_MOBILE) {
          // if src is a function, it's already been initialized
          if (typeof vjsPlayer.vttThumbnails.src === 'function') {
            vjsPlayer.vttThumbnails.src(thumbnailPath);
          } else {
            // otherwise, initialize plugin
            vjsPlayer.vttThumbnails({
              src: thumbnailPath,
              showTimestamp: true,
            });
          }
        }
      }

      vjsPlayer.load();

      if (canUseOldPlayer) {
        document.querySelector('.video-js-parent')?.append(window.oldSavedDiv);
      }

      // allow tap to unmute if no perms on iOS
      if (autoplay && !embedded) {
        const promise = vjsPlayer.play();

        window.player.userActive(true);

        if (promise !== undefined) {
          promise.then(_ => {
            vjsPlayer.controlBar.el().classList.add('vjs-transitioning-video');
          }).catch(error => {
            const noPermissionError = typeof error === 'object' && error.name && error.name === 'NotAllowedError';

            if (noPermissionError) {
              if (IS_IOS) {
                // autoplay not allowed, mute video, play and show 'tap to unmute' button
                vjsPlayer.muted(true);
                vjsPlayer.play();
                document.querySelector('.video-js--tap-to-unmute')?.style.setProperty('visibility', 'visible');
                document.querySelector('.video-js--tap-to-unmute')?.style.setProperty('display', 'inline', 'important');
              } else {
                vjsPlayer.bigPlayButton.show();
                // player.bigPlayButton.el().style.setProperty('display', 'block', 'important');
              }
            };
          });
        }
      }

      // fix invisible vidcrunch overlay on IOS  << TODO: does not belong here. Move to ads.jsx (#739)
      if (IS_IOS) {
        // ads video player
        const adsClaimDiv = document.querySelector('.ads__claim-item');

        if (adsClaimDiv) {
          // hide ad video by default
          adsClaimDiv.style.display = 'none';

          // ad containing div, we can keep part on page
          const adsClaimParentDiv = adsClaimDiv.parentNode;

          // watch parent div for when it is on viewport
          const observer = new IntersectionObserver(function (entries) {
            // when ad div parent becomes visible by 1px, show the ad video
            if (entries[0].isIntersecting === true) {
              adsClaimDiv.style.display = 'block';
            }

            observer.disconnect();
          });

          // $FlowFixMe
          observer.observe(adsClaimParentDiv);
        }
      }
    })();

    // Cleanup
    return () => {
      window.removeEventListener('keydown', curried_function);

      const chapterMarkers = document.getElementsByClassName('vjs-chapter-marker');
      while (chapterMarkers.length > 0) {
        chapterMarkers[0].parentNode.removeChild(chapterMarkers[0]);
      }

      const player = playerRef.current;
      if (player) {
        try {
          window.cast.framework.CastContext.getInstance().getCurrentSession().endSession(false);
        } catch {}

        window.player.currentTime(0);
        window.player.userActive(false);
        window.player.pause();

        if (IS_IOS) {
          window.player.controlBar?.playToggle?.hide();
        }

        window.player?.controlBar?.getChild('ChaptersButton')?.hide();

        // this solves an issue with portrait videos
        const videoDiv = window.player?.tech_?.el(); // video element
        if (videoDiv) videoDiv.style.top = '0px';

        window.player.controlBar.el().classList.add('vjs-transitioning-video');

        window.oldSavedDiv = window.player.el();

        window.player.trigger('playerClosed');
      }
    };
  }, [isAudio, source, reload, userClaimId, isLivestreamClaim]);

  return (
    <div className={classnames('video-js-parent', { 'video-js-parent--ios': IS_IOS })} ref={containerRef}>
      <Button
        label={__('Tap to unmute')}
        button="link"
        icon={ICONS.VOLUME_MUTED}
        className="video-js--tap-to-unmute"
        onClick={unmuteAndHideHint}
        ref={tapToUnmuteRef}
      />
      <Button
        label={__('Retry')}
        button="link"
        icon={ICONS.REFRESH}
        className="video-js--tap-to-unmute"
        onClick={retryVideoAfterFailure}
        ref={tapToRetryRef}
      />
    </div>
  );
});
