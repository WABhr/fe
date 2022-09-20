import { connect } from 'react-redux';
import { selectActiveChannelClaim } from 'redux/selectors/app';
import { selectMySupportersList, selectMembershipTiersForChannelId } from 'redux/selectors/memberships';
import { doGetMembershipSupportersList } from 'redux/actions/memberships';
import { selectMyChannelClaims } from 'redux/selectors/claims';
import SupportersTab from './view';

const select = (state) => {
  const activeChannelClaim = selectActiveChannelClaim(state);

  return {
    channelMembershipTiers: activeChannelClaim && selectMembershipTiersForChannelId(state, activeChannelClaim.claim_id),
    supportersList: selectMySupportersList(state),
    myChannelClaims: selectMyChannelClaims(state),
  };
};

const perform = {
  doGetMembershipSupportersList,
};

export default connect(select, perform)(SupportersTab);
