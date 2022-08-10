import { connect } from 'react-redux';
import {
  selectStakedLevelForChannelUri,
  selectClaimForUri,
  selectClaimsByUri,
  selectTitleForUri,
  selectDateForUri,
} from 'redux/selectors/claims';
import { selectActiveChannelClaim } from 'redux/selectors/app';
import { selectOdyseeMembershipForChannelId, selectMembershipForChannelId } from 'redux/selectors/memberships';

import ChatComment from './view';

const select = (state, props) => {
  const { uri, comment } = props;
  const { channel_url: authorUri, channel_id: channelId } = comment;
  const authorTitle = selectTitleForUri(state, authorUri);
  const channelAge = selectDateForUri(state, authorUri);

  return {
    claim: selectClaimForUri(state, uri),
    stakedLevel: selectStakedLevelForChannelUri(state, authorUri),
    claimsByUri: selectClaimsByUri(state),
    odyseeMembership: selectOdyseeMembershipForChannelId(state, channelId),
    membership: selectMembershipForChannelId(state, uri, channelId),
    activeChannelClaim: selectActiveChannelClaim(state),
    authorTitle,
    channelAge,
  };
};

const perform = {};

export default connect(select, perform)(ChatComment);
