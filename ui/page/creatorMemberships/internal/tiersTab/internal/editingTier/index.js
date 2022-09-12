import { connect } from 'react-redux';
import { selectMembershipPerks } from 'redux/selectors/memberships';
import { doMembershipAddTier, doMembershipList } from 'redux/actions/memberships';
import TiersTab from './view';

const select = (state, props) => ({
  membershipPerks: selectMembershipPerks(state),
});

const perform = {
  doMembershipAddTier,
  doMembershipList,
};

export default connect(select, perform)(TiersTab);
