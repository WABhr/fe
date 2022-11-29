import { connect } from 'react-redux';
import { PAGE_SIZE } from 'constants/claim';
import {
  makeSelectClaimsInChannelForPage,
  makeSelectFetchingChannelClaims,
  selectClaimIsMine,
  makeSelectTotalPagesInChannelSearch,
  selectClaimForUri,
} from 'redux/selectors/claims';
import { selectUserHasOdyseePremiumPlus } from 'redux/selectors/memberships';
import { doResolveUris } from 'redux/actions/claims';
import * as SETTINGS from 'constants/settings';
import { makeSelectChannelIsMuted } from 'redux/selectors/blocked';
import { withRouter } from 'react-router';
import { selectClientSetting, selectShowMatureContent } from 'redux/selectors/settings';
import { selectAdBlockerFound } from 'redux/selectors/app';
import { doFetchChannelIsLiveForId } from 'redux/actions/livestream';
import { selectActiveLivestreamForChannel, selectActiveLivestreamInitialized } from 'redux/selectors/livestream';
import { getChannelIdFromClaim } from 'util/claim';
import ChannelContent from './view';

const select = (state, props) => {
  const { search } = props.location;
  const urlParams = new URLSearchParams(search);
  const page = urlParams.get('page') || 0;
  const claim = props.uri && selectClaimForUri(state, props.uri);
  const channelClaimId = getChannelIdFromClaim(claim);

  return {
    pageOfClaimsInChannel: makeSelectClaimsInChannelForPage(props.uri, page)(state),
    fetching: makeSelectFetchingChannelClaims(props.uri)(state),
    totalPages: makeSelectTotalPagesInChannelSearch(props.uri, PAGE_SIZE)(state),
    channelIsMine: selectClaimIsMine(state, claim),
    channelIsBlocked: makeSelectChannelIsMuted(props.uri)(state),
    claim,
    showMature: selectShowMatureContent(state),
    tileLayout: selectClientSetting(state, SETTINGS.TILE_LAYOUT),
    activeLivestreamForChannel: selectActiveLivestreamForChannel(state, channelClaimId),
    activeLivestreamInitialized: selectActiveLivestreamInitialized(state),
    adBlockerFound: selectAdBlockerFound(state),
    hasPremiumPlus: selectUserHasOdyseePremiumPlus(state),
  };
};

const perform = (dispatch) => ({
  doResolveUris: (uris, returnCachedUris) => dispatch(doResolveUris(uris, returnCachedUris)),
  doFetchChannelIsLiveForId: (channelID) => dispatch(doFetchChannelIsLiveForId(channelID)),
});

export default withRouter(connect(select, perform)(ChannelContent));
