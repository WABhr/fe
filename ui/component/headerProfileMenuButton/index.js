import { connect } from 'react-redux';
import { doSignOut, doOpenModal } from 'redux/actions/app';
import { selectActiveChannelClaim } from 'redux/selectors/app';
import { selectUserEmail } from 'redux/selectors/user';
import HeaderProfileMenuButton from './view';

const select = (state) => ({
  activeChannelClaim: selectActiveChannelClaim(state),
  email: selectUserEmail(state),
});

const perform = (dispatch) => ({
  signOut: () => dispatch(doSignOut()),
  doOpenModal: (id, params) => dispatch(doOpenModal(id, params)),
});

export default connect(select, perform)(HeaderProfileMenuButton);
