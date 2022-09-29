// @flow
// $FlowFixMe
import { Global } from '@emotion/react';

import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import { useHistory } from 'react-router-dom';
import usePersistedState from 'effects/use-persisted-state';
import * as ICONS from 'constants/icons';
import Icon from 'component/common/icon';
import React from 'react';

type Props = {
  isPopoutWindow?: boolean,
  claimIsMine?: boolean,
  hyperchatsHidden?: boolean,
  noHyperchats?: boolean,
  isMobile?: boolean,
  isCompact?: boolean,
  hideChat?: () => void,
  setPopoutWindow?: (any) => void,
  toggleHyperchats?: () => void,
  toggleIsCompact?: () => void,
  activeChannelClaim?: ChannelClaim,
  activeClaimId?: string,
  setLivestreamChatMembersOnlyCreatorSetting?: any,
  // doUpdateCreatorSettings: (ChannelClaim, PerChannelSettings) => void,
  livestreamChatMembersOnly?: boolean,
  channelHasMembershipTiers?: any,
  doToast?: ({ message: string }) => void,
};

export default function LivestreamMenu(props: Props) {
  const {
    activeChannelClaim,
    activeClaimId,
    claimIsMine,
    hideChat,
    hyperchatsHidden,
    isCompact,
    isMobile,
    isPopoutWindow,
    noHyperchats,
    setLivestreamChatMembersOnlyCreatorSetting,
    setPopoutWindow,
    toggleHyperchats,
    toggleIsCompact,
    livestreamChatMembersOnly,
    channelHasMembershipTiers,
    doToast,
  } = props;

  const {
    location: { pathname },
  } = useHistory();

  const initialPopoutUnload = React.useRef(false);

  const [showTimestamps, setShowTimestamps] = usePersistedState('live-timestamps', false);

  function updateLivestreamMembersOnlyChat() {
    if (activeChannelClaim && setLivestreamChatMembersOnlyCreatorSetting) {
      setLivestreamChatMembersOnlyCreatorSetting(activeChannelClaim, activeClaimId, !livestreamChatMembersOnly);
    }

    if (livestreamChatMembersOnly) {
      doToast({ message: __('Members-only chat is now disabled.') });
    } else {
      doToast({ message: __('Members-only chat is now enabled.') });
    }
  }

  let toggleLivestreamChatMembersOnlyText = 'Enable Members-Only Chat';
  if (livestreamChatMembersOnly) toggleLivestreamChatMembersOnlyText = 'Disable Members-Only Chat';

  function handlePopout() {
    if (setPopoutWindow) {
      const popoutWindow = window.open('/$/popout' + pathname, 'Popout Chat', 'height=700,width=400');

      // Adds function to popoutWindow when unloaded and verify if it was closed
      const handleUnload = (e) => {
        if (!initialPopoutUnload.current) {
          initialPopoutUnload.current = true;
        } else {
          const timer = setInterval((a, b) => {
            if (popoutWindow.closed) {
              clearInterval(timer);
              setPopoutWindow(undefined);
            }
          }, 300);
        }
      };

      popoutWindow.onunload = handleUnload;

      if (window.focus) popoutWindow.focus();
      setPopoutWindow(popoutWindow);
    }
  }

  return (
    <>
      <MenuGlobalStyles showTimestamps={showTimestamps} />

      <Menu>
        <MenuButton className="menu__button">
          <Icon size={isMobile ? 16 : 18} icon={ICONS.SETTINGS} />
        </MenuButton>

        <MenuList className="menu__list">
          {channelHasMembershipTiers && claimIsMine && (
            <MenuItem className="comment__menu-option" onSelect={() => updateLivestreamMembersOnlyChat()}>
              <span className="menu__link">
                <Icon aria-hidden icon={ICONS.MEMBERSHIP} />
                {__(toggleLivestreamChatMembersOnlyText)}
              </span>
            </MenuItem>
          )}
          <MenuItem className="comment__menu-option" onSelect={() => setShowTimestamps(!showTimestamps)}>
            <span className="menu__link">
              <Icon aria-hidden icon={ICONS.TIME} />
              {__('Toggle Timestamps')}
            </span>
          </MenuItem>
          <MenuItem className="comment__menu-option" onSelect={toggleIsCompact}>
            <span className="menu__link">
              <Icon aria-hidden icon={!isCompact ? ICONS.COMPACT : ICONS.EXPAND} size={18} />
              {!isCompact ? __('Enable Compact Mode') : __('Disable Compact Mode')}
            </span>
          </MenuItem>

          {!isMobile ? (
            <>
              {!noHyperchats && (
                <MenuItem className="comment__menu-option" onSelect={toggleHyperchats}>
                  <span className="menu__link">
                    <Icon aria-hidden icon={hyperchatsHidden ? ICONS.EYE : ICONS.DISMISS_ALL} size={18} />
                    {hyperchatsHidden ? __('Display HyperChats') : __('Dismiss HyperChats')}
                  </span>
                </MenuItem>
              )}
              {/* No need for Hide Chat on mobile with the expand/collapse drawer */}
              <MenuItem className="comment__menu-option" onSelect={hideChat}>
                <span className="menu__link">
                  <Icon aria-hidden icon={ICONS.EYE} />
                  {__('Hide Chat')}
                </span>
              </MenuItem>

              {!isPopoutWindow && (
                <MenuItem className="comment__menu-option" onSelect={handlePopout}>
                  <span className="menu__link">
                    <Icon aria-hidden icon={ICONS.EXTERNAL} />
                    {__('Popout Chat')}
                  </span>
                </MenuItem>
              )}
            </>
          ) : (
            !noHyperchats && (
              <MenuItem className="comment__menu-option" onSelect={toggleHyperchats}>
                <span className="menu__link">
                  <Icon aria-hidden icon={hyperchatsHidden ? ICONS.EYE : ICONS.DISMISS_ALL} size={18} />
                  {hyperchatsHidden ? __('Display HyperChats') : __('Dismiss HyperChats')}
                </span>
              </MenuItem>
            )
          )}
        </MenuList>
      </Menu>
    </>
  );
}

type GlobalStylesProps = {
  showTimestamps?: boolean,
};

const MenuGlobalStyles = (globalStylesProps: GlobalStylesProps) => {
  const { showTimestamps } = globalStylesProps;

  return (
    <Global
      styles={{
        ':root': {
          '--live-timestamp-opacity': showTimestamps ? '0.5' : '0',
        },
      }}
    />
  );
};
