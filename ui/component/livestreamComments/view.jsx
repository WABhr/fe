// @flow
import 'scss/component/_livestream-comments.scss';

import { getStickerUrl } from 'util/comments';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import * as ICONS from 'constants/icons';
import Button from 'component/button';
import ChannelThumbnail from 'component/channelThumbnail';
import classnames from 'classnames';
import CommentCreate from 'component/commentCreate';
import CreditAmount from 'component/common/credit-amount';
import Icon from 'component/common/icon';
import LivestreamComment from 'component/livestreamComment';
import OptimizedImage from 'component/optimizedImage';
import React from 'react';
import Spinner from 'component/spinner';
import Tooltip from 'component/common/tooltip';
import UriIndicator from 'component/uriIndicator';

// 30 sec timestamp refresh timer
const UPDATE_TIMESTAMP_MS = 30 * 1000;

const IS_TIMESTAMP_VISIBLE = () =>
  // $FlowFixMe
  document.documentElement.style.getPropertyValue('--live-timestamp-opacity') === '0.5';

const TOGGLE_TIMESTAMP_OPACITY = () =>
  // $FlowFixMe
  document.documentElement.style.setProperty('--live-timestamp-opacity', IS_TIMESTAMP_VISIBLE() ? '0' : '0.5');

const VIEW_MODES = {
  CHAT: 'chat',
  SUPERCHAT: 'sc',
};
const COMMENT_SCROLL_TIMEOUT = 25;
const LARGE_SUPER_CHAT_LIST_THRESHOLD = 20;

type Props = {
  claim: ?StreamClaim,
  comments: Array<Comment>,
  embed?: boolean,
  fetchingComments: boolean,
  pinnedComments: Array<Comment>,
  superChats: Array<Comment>,
  uri: string,
  doCommentList: (string, string, number, number) => void,
  doResolveUris: (Array<string>, boolean) => void,
  doSuperChatList: (string) => void,
};

export default function LivestreamComments(props: Props) {
  const {
    claim,
    comments: commentsByChronologicalOrder,
    embed,
    fetchingComments,
    pinnedComments,
    superChats: superChatsByAmount,
    uri,
    doCommentList,
    doResolveUris,
    doSuperChatList,
  } = props;

  const discussionElement = document.querySelector('.livestream__comments');

  const restoreScrollPos = React.useCallback(() => {
    if (discussionElement) discussionElement.scrollTop = 0;
  }, [discussionElement]);

  const superChatTopTen = React.useMemo(() => {
    return superChatsByAmount ? superChatsByAmount.slice(0, 10) : superChatsByAmount;
  }, [superChatsByAmount]);

  const commentsRef = React.createRef();

  const [viewMode, setViewMode] = React.useState(VIEW_MODES.CHAT);
  const [scrollPos, setScrollPos] = React.useState(0);
  const [showPinned, setShowPinned] = React.useState(true);
  const [resolvingSuperChat, setResolvingSuperChat] = React.useState(false);
  const [forceUpdate, setForceUpdate] = React.useState(0);

  const claimId = claim && claim.claim_id;
  const commentsLength = commentsByChronologicalOrder && commentsByChronologicalOrder.length;
  const commentsToDisplay = viewMode === VIEW_MODES.CHAT ? commentsByChronologicalOrder : superChatsByAmount;
  const pinnedComment = pinnedComments.length > 0 ? pinnedComments[0] : null;
  const now = new Date();

  const showMoreSuperChatsButton =
    superChatTopTen && superChatsByAmount && superChatTopTen.length < superChatsByAmount.length;

  const shouldRefreshTimestamp =
    commentsByChronologicalOrder &&
    commentsByChronologicalOrder.some((comment) => {
      const { timestamp } = comment;
      const timePosted = timestamp * 1000;

      // 1000 * 60 seconds * 60 minutes === less than an hour old
      return now - timePosted < 1000 * 60 * 60;
    });

  let superChatsChannelUrls = [];
  let superChatsReversed = 0;
  let superChatsFiatAmount = 0;
  let superChatsLBCAmount = 0;
  if (superChatsByAmount) {
    const clonedSuperchats = JSON.parse(JSON.stringify(superChatsByAmount));

    // for top to bottom display, oldest superchat on top most recent on bottom
    superChatsReversed = clonedSuperchats.sort((a, b) => b.timestamp - a.timestamp);

    superChatsByAmount.forEach((superChat) => {
      const { is_fiat: isFiat, support_amount: tipAmount, channel_url: uri } = superChat;

      if (isFiat) {
        superChatsFiatAmount = superChatsFiatAmount + tipAmount;
      } else {
        superChatsLBCAmount = superChatsLBCAmount + tipAmount;
      }
      superChatsChannelUrls.push(uri || '0');
    });
  }

  function toggleSuperChat() {
    if (superChatsChannelUrls && superChatsChannelUrls.length > 0) {
      doResolveUris(superChatsChannelUrls, true);

      if (superChatsByAmount.length > LARGE_SUPER_CHAT_LIST_THRESHOLD) {
        setResolvingSuperChat(true);
      }
    }
    setViewMode(VIEW_MODES.SUPERCHAT);
  }

  // Refresh timestamp on timer
  React.useEffect(() => {
    if (shouldRefreshTimestamp) {
      const timer = setTimeout(() => {
        setForceUpdate(Date.now());
      }, UPDATE_TIMESTAMP_MS);

      return () => clearTimeout(timer);
    }
    // forceUpdate will re-activate the timer or else it will only refresh once
  }, [shouldRefreshTimestamp, forceUpdate]);

  React.useEffect(() => {
    if (claimId) {
      doCommentList(uri, '', 1, 75);
      doSuperChatList(uri);
    }
  }, [claimId, uri, doCommentList, doSuperChatList]);

  // Register scroll handler (TODO: Should throttle/debounce)
  React.useEffect(() => {
    function handleScroll() {
      if (discussionElement && viewMode === VIEW_MODES.CHAT) {
        const scrollTop = discussionElement.scrollTop;
        if (scrollTop !== scrollPos) {
          setScrollPos(scrollTop);
        }
      }
    }

    if (discussionElement && viewMode === VIEW_MODES.CHAT) {
      discussionElement.addEventListener('scroll', handleScroll);
      return () => discussionElement.removeEventListener('scroll', handleScroll);
    }
  }, [discussionElement, scrollPos, viewMode]);

  // Retain scrollPos=0 when receiving new messages.
  React.useEffect(() => {
    if (discussionElement && commentsLength > 0) {
      // Only update comment scroll if the user hasn't scrolled up to view old comments
      if (scrollPos >= 0) {
        // +ve scrollPos: not scrolled (Usually, there'll be a few pixels beyond 0).
        // -ve scrollPos: user scrolled.
        const timer = setTimeout(() => {
          // Use a timer here to ensure we reset after the new comment has been rendered.
          discussionElement.scrollTop = 0;
        }, COMMENT_SCROLL_TIMEOUT);
        return () => clearTimeout(timer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsLength]); // (Just respond to 'commentsLength' updates and nothing else)

  // Stop spinner for resolving superchats
  React.useEffect(() => {
    if (resolvingSuperChat) {
      // The real solution to the sluggishness is to fix the claim store/selectors
      // and to paginate the long superchat list. This serves as a band-aid,
      // showing a spinner while we batch-resolve. The duration is just a rough
      // estimate -- the lag will handle the remaining time.
      const timer = setTimeout(() => {
        setResolvingSuperChat(false);
        // Scroll to the top:
        if (discussionElement) {
          const divHeight = discussionElement.scrollHeight;
          discussionElement.scrollTop = divHeight * -1;
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [discussionElement, resolvingSuperChat]);

  if (!claim) return null;

  const chatContentToggle = (toggleMode: string, label: any) => (
    <Button
      className={classnames('button-toggle', { 'button-toggle--active': viewMode === toggleMode })}
      label={label}
      onClick={() => {
        if (toggleMode === VIEW_MODES.SUPERCHAT) {
          toggleSuperChat();
        } else {
          setViewMode(VIEW_MODES.CHAT);
        }

        if (discussionElement) {
          const divHeight = discussionElement.scrollHeight;
          discussionElement.scrollTop = toggleMode === VIEW_MODES.CHAT ? divHeight : divHeight * -1;
        }
      }}
    />
  );

  return (
    <div className="card livestream__discussion">
      <div className="card__header--between livestreamDiscussion__header">
        <div className="card__title-section--small livestreamDiscussion__title">
          {__('Live Chat')}

          <Menu>
            <MenuButton className="menu__button">
              <Icon size={18} icon={ICONS.SETTINGS} />
            </MenuButton>

            <MenuList className="menu__list">
              <MenuItem className="comment__menu-option" onSelect={TOGGLE_TIMESTAMP_OPACITY}>
                <span className="menu__link">
                  <Icon aria-hidden icon={ICONS.TIME} />
                  {__('Toggle Timestamps')}
                </span>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        {superChatsByAmount && (
          <div className="recommended-content__toggles">
            {/* the superchats in chronological order button */}
            {chatContentToggle(VIEW_MODES.CHAT, __('Chat'))}

            {/* the button to show superchats listed by most to least support amount */}
            {chatContentToggle(
              VIEW_MODES.SUPERCHAT,
              <>
                <CreditAmount amount={superChatsLBCAmount || 0} size={8} /> /
                <CreditAmount amount={superChatsFiatAmount || 0} size={8} isFiat /> {__('Tipped')}
              </>
            )}
          </div>
        )}
      </div>

      {fetchingComments && !commentsByChronologicalOrder && (
        <div className="main--empty">
          <Spinner />
        </div>
      )}

      <div ref={commentsRef} className="livestreamComments__wrapper">
        {viewMode === VIEW_MODES.CHAT && superChatsByAmount && (
          <div className="livestreamSuperchats__wrapper">
            <div className="livestreamSuperchats__inner">
              <TopSuperChats superChats={superChatTopTen} />

              {showMoreSuperChatsButton && (
                <Button
                  title={__('Show More...')}
                  label={__('Show More')}
                  button="inverse"
                  className="close-button"
                  onClick={toggleSuperChat}
                  iconRight={ICONS.MORE}
                />
              )}
            </div>
          </div>
        )}

        {pinnedComment && showPinned && viewMode === VIEW_MODES.CHAT && (
          <div className="livestreamPinned__wrapper">
            <LivestreamComment
              comment={pinnedComment}
              key={pinnedComment.comment_id}
              uri={uri}
              forceUpdate={forceUpdate}
            />

            <Button
              title={__('Dismiss pinned comment')}
              button="inverse"
              className="close-button"
              onClick={() => setShowPinned(false)}
              icon={ICONS.REMOVE}
            />
          </div>
        )}

        {/* top to bottom comment display */}
        {!fetchingComments && commentsByChronologicalOrder.length > 0 ? (
          <div className="livestream__comments">
            {viewMode === VIEW_MODES.CHAT &&
              commentsToDisplay.map((comment) => (
                <LivestreamComment comment={comment} key={comment.comment_id} uri={uri} forceUpdate={forceUpdate} />
              ))}

            {viewMode === VIEW_MODES.SUPERCHAT &&
              (resolvingSuperChat ? (
                <div className="main--empty">
                  <Spinner />
                </div>
              ) : (
                superChatsReversed &&
                superChatsReversed.map((comment) => (
                  <LivestreamComment comment={comment} key={comment.comment_id} uri={uri} forceUpdate={forceUpdate} />
                ))
              ))}
          </div>
        ) : (
          <div className="main--empty" style={{ flex: 1 }} />
        )}

        {scrollPos < 0 && viewMode === VIEW_MODES.CHAT && (
          <Button
            button="secondary"
            className="livestreamComments__scrollToRecent"
            label={__('Recent Comments')}
            onClick={restoreScrollPos}
            iconRight={ICONS.DOWN}
          />
        )}

        <div className="livestream__commentCreate">
          <CommentCreate isLivestream bottom embed={embed} uri={uri} onDoneReplying={restoreScrollPos} />
        </div>
      </div>
    </div>
  );
}

function TopSuperChats(props: any) {
  const { superChats } = props;
  const hasStickerSuperChats = superChats && superChats.filter(({ comment }) => !!getStickerUrl(comment));

  return superChats.map((superChat: Comment) => {
    const { comment, comment_id, channel_url, support_amount, is_fiat } = superChat;

    const stickerImg = <OptimizedImage src={getStickerUrl(comment)} waitLoad loading="lazy" />;
    const isSticker = hasStickerSuperChats && hasStickerSuperChats.includes(superChat);

    return (
      <Tooltip key={comment_id} title={isSticker ? stickerImg : comment}>
        <div className="livestream__superchat">
          <ChannelThumbnail uri={channel_url} xsmall />

          <div
            className={classnames('livestreamSuperchat__info', {
              'livestreamSuperchat__info--sticker': isSticker,
              'livestreamSuperchat__info--notSticker': hasStickerSuperChats && !isSticker,
            })}
          >
            <div className="livestreamSuperchat__info--user">
              <UriIndicator uri={channel_url} link />

              <CreditAmount
                hideTitle
                size={10}
                className="livestreamSuperchat__amount--large"
                amount={support_amount}
                isFiat={is_fiat}
              />
            </div>

            {isSticker && <div className="livestreamSuperchat__info--image">{stickerImg}</div>}
          </div>
        </div>
      </Tooltip>
    );
  });
}
