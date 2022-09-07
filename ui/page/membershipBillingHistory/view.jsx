// restore flow
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import Page from 'component/page';
import Button from 'component/button';
import { useHistory } from 'react-router';

/** THIS PAGE IS NAMED WRONG THIS IS THE BILLING HISTORY PAGE **/

// eslint-disable-next-line flowtype/no-types-missing-file-annotation
type Props = {
  history: { action: string, push: (string) => void, replace: (string) => void },
  location: { search: string, pathname: string },
  totalBalance: ?number,
  openModal: (string, {}) => void,
  activeChannelClaim: ?ChannelClaim,
  channels: ?Array<ChannelClaim>,
  claimsByUri: { [string]: any },
  fetchUserMemberships: (claimIdCsv: string) => void,
  incognito: boolean,
  updateUserOdyseeMembershipStatus: () => void,
  user: ?User,
  locale: ?LocaleInfo,
  preferredCurrency: ?string,
};

// eslint-disable-next-line flowtype/no-types-missing-file-annotation
const OdyseeMembershipPage = (props: Props) => {
  // const {} = props;

  const { goBack } = useHistory();

  const myMemberships = [1, 2];

  /*
  React.useEffect(() => {
    fetchUserMemberships("7668ddc8e46d146b5c3b24f019ba9cd6e56ab893")
  }, []);
  */

  return (
    <Page className="premium-wrapper">
      <div className="billingHistory-back__button">
        {/* todo: how to show this conditionally */}
        <Button button="primary" label={__('Go Back')} onClick={() => goBack()} />
      </div>

      <h1 className="billingHistory__header">Your Billing History for test2342</h1>
      <table className="table table--transactions">
        <thead>
          <tr>
            <th className="date-header">Channel Name</th>
            <th className="channelName-header">Membership Tier</th>
            <th className="channelName-header">Payment Date</th>
            <th className="location-header">Support Amount</th>
            <th className="amount-header">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {myMemberships.map((pledge, i) => (
            <>
              <tr>
                <td>test2342</td>
                <td>Community MVP</td>
                <td>{new Date().toLocaleString()}</td>
                <td>$29.99</td>
                <Button button="link" /* navigate={pledge.url + '?view=membership'} */ style={{ marginTop: '5px' }}>
                  <span dir="auto" className="button__label">
                    See Receipt
                  </span>
                </Button>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </Page>
  );
};

export default OdyseeMembershipPage;
/* eslint-enable no-undef */
/* eslint-enable react/prop-types */