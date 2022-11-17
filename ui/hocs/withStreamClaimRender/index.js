import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as SETTINGS from 'constants/settings';

import {
  selectClaimWasPurchasedForUri,
  selectClaimForUri,
  selectClaimIsMine,
  selectIsFiatPaidForUri,
  selectIsFiatRequiredForUri,
  selectIsFetchingPurchases,
  selectPreorderTagForUri,
  selectPurchaseTagForUri,
  selectRentalTagForUri,
  selectCostInfoForUri,
  selectIsStreamPlaceholderForUri,
} from 'redux/selectors/claims';
import { selectStreamingUrlForUri } from 'redux/selectors/file_info';
import { selectClientSetting } from 'redux/selectors/settings';
import { makeSelectFileRenderModeForUri } from 'redux/selectors/content';
import { selectIsProtectedContentLockedFromUserForId, selectMembershipMineFetched } from 'redux/selectors/memberships';
import { selectIsActiveLivestreamForUri } from 'redux/selectors/livestream';

import { doUriInitiatePlay } from 'redux/actions/content';
import { doFileGetForUri } from 'redux/actions/file';
import { doCheckIfPurchasedClaimId } from 'redux/actions/stripe';
import { doMembershipMine, doMembershipList } from 'redux/actions/memberships';
import { doFetchChannelLiveStatus } from 'redux/actions/livestream';

import FileRenderInitiator from './view';

const select = (state, props) => {
  const { uri } = props;

  const claim = selectClaimForUri(state, uri);
  const { claim_id: claimId, signing_channel: channelClaim } = claim || {};
  const { name: channelName, claim_id: channelClaimId } = channelClaim || {};

  return {
    channelName,
    channelClaimId,
    claimId,
    myMembershipsFetched: selectMembershipMineFetched(state),
    preorderTag: selectPreorderTagForUri(state, props.uri),
    purchaseTag: selectPurchaseTagForUri(state, props.uri),
    rentalTag: selectRentalTagForUri(state, props.uri),
    autoplay: selectClientSetting(state, SETTINGS.AUTOPLAY_MEDIA),
    claimIsMine: selectClaimIsMine(state, claim),
    sdkPaid: selectClaimWasPurchasedForUri(state, uri),
    fiatPaid: selectIsFiatPaidForUri(state, uri),
    fiatRequired: selectIsFiatRequiredForUri(state, uri),
    isFetchingPurchases: selectIsFetchingPurchases(state),
    costInfo: selectCostInfoForUri(state, uri),
    renderMode: makeSelectFileRenderModeForUri(uri)(state),
    contentRestrictedFromUser: claimId && selectIsProtectedContentLockedFromUserForId(state, claimId),
    streamingUrl: selectStreamingUrlForUri(state, uri),
    isLivestreamClaim: selectIsStreamPlaceholderForUri(state, uri),
    isCurrentClaimLive: selectIsActiveLivestreamForUri(state, uri),
  };
};

const perform = {
  doCheckIfPurchasedClaimId,
  doFileGetForUri,
  doMembershipMine,
  doUriInitiatePlay,
  doMembershipList,
  doFetchChannelLiveStatus,
};

export default (Component) => withRouter(connect(select, perform)(FileRenderInitiator(Component)));
