// @flow
import React from 'react';
import Button from 'component/button';
import { CHANNEL_ID } from 'constants/urlParams';

type Props = {
  page: string,
  search?: string,
  channelId?: string,
  // -- redux --
  defaultChannelId: ?string,
  activeChannelId: ?string,
};

const ButtonNavigateChannelId = (props: Props) => {
  const { page, search, channelId, defaultChannelId, activeChannelId, ...buttonProps } = props;

  const urlParams = new URLSearchParams(search);

  if (channelId) {
    urlParams.set(CHANNEL_ID, channelId);
  } else if (defaultChannelId && activeChannelId && defaultChannelId !== activeChannelId) {
    urlParams.set(CHANNEL_ID, activeChannelId);
  }

  return <Button {...buttonProps} navigate={`${page}?${urlParams.toString()}`} />;
};

export default ButtonNavigateChannelId;