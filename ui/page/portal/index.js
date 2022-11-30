import { connect } from 'react-redux';
import { selectHomepageData } from 'redux/selectors/settings';
import { selectUser } from 'redux/selectors/user';
import PortalPage from './view';

const select = (state) => {
  const homepageData = selectHomepageData(state) || {};
  const { portals } = homepageData;
  const { mainPortal } = portals || {};
  const user = selectUser(state);
  const { global_mod, internal_feature } = user;
  const showViews = global_mod || internal_feature;

  return {
    homepageData,
    portals: mainPortal?.portals,
    showViews,
  };
};

export default connect(select)(PortalPage);
