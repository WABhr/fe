// @flow
import * as MODALS from 'constants/modal_types';
import * as ICONS from 'constants/icons';
import * as STRIPE from 'constants/stripe';
import React from 'react';
import FileActionButton from 'component/common/file-action-button';

type Props = {
  uri: string,
  fileAction?: boolean,
  // redux
  disableSupport: boolean,
  isRepost?: boolean,
  doOpenModal: (id: string, {}) => void,
  preferredCurrency: string,
  doTipAccountCheckForUri: (uri: string) => void,
  canReceiveFiatTips: ?boolean,
  doTipAccountCheckForUri: (uri: string) => void,
  canReceiveFiatTips: ?boolean,
};

export default function ClaimSupportButton(props: Props) {
  const {
    uri,
    fileAction,
    isRepost,
    disableSupport,
    doOpenModal,
    preferredCurrency,
    canReceiveFiatTips,
    doTipAccountCheckForUri,
  } = props;

  React.useEffect(() => {
    if (canReceiveFiatTips === undefined) {
      doTipAccountCheckForUri(uri);
    }
  }, [canReceiveFiatTips, doTipAccountCheckForUri, uri]);

  if (disableSupport) return null;

  const iconToUse = {
    [STRIPE.CURRENCIES.EUR]: { icon: ICONS.EURO, iconSize: 16 },
    [STRIPE.CURRENCIES.USD]: { icon: ICONS.FINANCE, iconSize: fileAction ? 22 : undefined },
  };

  return (
    <FileActionButton
      className={canReceiveFiatTips ? 'approved-bank-account__button' : undefined}
      title={__('Support this content')}
      label={isRepost ? __('Support Repost') : __('Support --[button to support a claim]--')}
      icon={iconToUse[preferredCurrency].icon}
      iconSize={iconToUse[preferredCurrency].iconSize}
      onClick={() => doOpenModal(MODALS.SEND_TIP, { uri, isSupport: true })}
      noStyle={!fileAction}
    />
  );
}
