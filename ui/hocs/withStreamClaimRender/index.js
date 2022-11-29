import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as SETTINGS from 'constants/settings';

import {
  selectClaimForUri,
  selectIsFetchingPurchases,
  selectPreorderTagForUri,
  selectPurchaseTagForUri,
  selectRentalTagForUri,
  selectIsStreamPlaceholderForUri,
  selectPendingFiatPaymentForUri,
  selectSdkFeePendingForUri,
} from 'redux/selectors/claims';
import { selectStreamingUrlForUri } from 'redux/selectors/file_info';
import {
  makeSelectFileRenderModeForUri,
  selectPlayingUri,
  selectPlayingCollectionId,
  selectCanViewFileForUri,
} from 'redux/selectors/content';
import { selectMembershipMineFetched, selectPendingUnlockedRestrictionsForUri } from 'redux/selectors/memberships';
import { selectIsActiveLivestreamForUri, selectIsListeningForIsLiveForUri } from 'redux/selectors/livestream';
import { selectClientSetting } from 'redux/selectors/settings';

import { doStartFloatingPlayingUri } from 'redux/actions/content';
import { doFileGetForUri } from 'redux/actions/file';
import { doCheckIfPurchasedClaimId } from 'redux/actions/stripe';
import { doMembershipMine, doMembershipList } from 'redux/actions/memberships';
import { doFetchChannelIsLiveForId } from 'redux/actions/livestream';

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
    isFetchingPurchases: selectIsFetchingPurchases(state),
    renderMode: makeSelectFileRenderModeForUri(uri)(state),
    streamingUrl: selectStreamingUrlForUri(state, uri),
    isLivestreamClaim: selectIsStreamPlaceholderForUri(state, uri),
    isCurrentClaimLive: selectIsActiveLivestreamForUri(state, uri),
    playingUri: selectPlayingUri(state),
    playingCollectionId: selectPlayingCollectionId(state),
    pendingFiatPayment: selectPendingFiatPaymentForUri(state, uri),
    sdkFeePending: selectSdkFeePendingForUri(state, uri),
    pendingUnlockedRestrictions: selectPendingUnlockedRestrictionsForUri(state, uri),
    canViewFile: selectCanViewFileForUri(state, uri),
    alreadyListeningForIsLive: selectIsListeningForIsLiveForUri(state, uri),
  };
};

const perform = {
  doCheckIfPurchasedClaimId,
  doFileGetForUri,
  doMembershipMine,
  doStartFloatingPlayingUri,
  doMembershipList,
  doFetchChannelIsLiveForId,
};

export default (Component) => withRouter(connect(select, perform)(FileRenderInitiator(Component)));
