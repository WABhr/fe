import { connect } from 'react-redux';
import { makeSelectTagInClaimOrChannelForUri, selectClaimForUri } from 'redux/selectors/claims';
import { doSetPlayingUri } from 'redux/actions/content';
import { doUserSetReferrer } from 'redux/actions/user';
import { selectUserVerifiedEmail } from 'redux/selectors/user';
import { DISABLE_COMMENTS_TAG } from 'constants/tags';
import { doCommentSocketConnect, doCommentSocketDisconnect } from 'redux/actions/websocket';
import { getChannelIdFromClaim } from 'util/claim';
import { selectActiveLivestreamForChannel, selectActiveLivestreamInitialized } from 'redux/selectors/livestream';
import { doFetchActiveLivestream } from 'redux/actions/livestream';
import LivestreamPage from './view';

const select = (state, props) => {
  const channelClaimId = getChannelIdFromClaim(selectClaimForUri(state, props.uri));
  return {
    isAuthenticated: selectUserVerifiedEmail(state),
    channelClaimId,
    chatDisabled: makeSelectTagInClaimOrChannelForUri(props.uri, DISABLE_COMMENTS_TAG)(state),
    activeLivestreamForChannel: selectActiveLivestreamForChannel(state, channelClaimId),
    activeLivestreamInitialized: selectActiveLivestreamInitialized(state),
  };
};

const perform = {
  doSetPlayingUri,
  doUserSetReferrer,
  doCommentSocketConnect,
  doCommentSocketDisconnect,
  doFetchActiveLivestream,
};

export default connect(select, perform)(LivestreamPage);
