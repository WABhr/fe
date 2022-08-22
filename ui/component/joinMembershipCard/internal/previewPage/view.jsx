// @flow
import React from 'react';
import classnames from 'classnames';
import { ChannelPageContext } from 'page/channel/view';
import * as ICONS from 'constants/icons';
import * as PAGES from 'constants/pages';
import Button from 'component/button';
import BalanceText from 'react-balance-text';
import MembershipBlock from './internal/membershipBlock';
import MembershipDetails from './internal/membershipDetails';
import ChannelThumbnail from 'component/channelThumbnail';
import * as MODALS from 'constants/modal_types';

type Props = {
  uri: string,
  selectedTier: CreatorMembership,
  selectedMembershipIndex: number,
  setMembershipIndex: (index: number) => void,
  handleSelect: () => void,
  // -- redux --
  canReceiveFiatTips: ?boolean,
  channelIsMine: boolean,
  creatorMemberships: CreatorMemberships,
  doTipAccountCheckForUri: (uri: string) => void,
  channelTitle: string,
  channelUri: string,
  doOpenModal: (id: string, props: {}) => void,
  protectedMembershipIds: Array<number>,
};

const PreviewPage = (props: Props) => {
  const {
    uri,
    selectedTier,
    selectedMembershipIndex,
    setMembershipIndex,
    handleSelect,
    protectedMembershipIds,
    // -- redux --
    canReceiveFiatTips,
    channelIsMine,
    creatorMemberships,
    doTipAccountCheckForUri,
    channelTitle,
    channelUri,
    doOpenModal,
  } = props;

  const isChannelTab = React.useContext(ChannelPageContext);

  const creatorHasMemberships = creatorMemberships && creatorMemberships.length > 0;
  const creatorPurchaseDisabled = !creatorHasMemberships || canReceiveFiatTips === false;

  React.useEffect(() => {
    if (canReceiveFiatTips === undefined) {
      doTipAccountCheckForUri(uri);
    }
  }, [canReceiveFiatTips, doTipAccountCheckForUri, uri]);

  if (creatorPurchaseDisabled) {
    return (
      <>
        <div>
          <BalanceText>
            {__(
              channelIsMine
                ? "Unfortunately you haven't activated your memberships functionality yet, but you can do so now at the link below"
                : "Unfortunately, this creator hasn't activated their membership functionality yet. You can try creating your own memberships with the link below!"
            )}
          </BalanceText>
        </div>

        <>
          <Button
            icon={ICONS.UPGRADE}
            button="primary"
            type="submit"
            label={__('Create Your Memberships')}
            navigate={`/$/${PAGES.CREATOR_MEMBERSHIPS}`}
          />
        </>
      </>
    );
  }

  if (isChannelTab) {
    return (
      <div className="join-membership__blocks-wrapper">
        {creatorMemberships.map((membership, index) => (
          <MembershipBlock
            membership={membership}
            channelIsMine={channelIsMine}
            handleSelect={() => {
              setMembershipIndex(index);
              doOpenModal(MODALS.JOIN_MEMBERSHIP, { uri, membershipIndex: index });
              // handleSelect();
            }}
            key={index}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="join-membership__modal-header">
        <ChannelThumbnail uri={channelUri} />
        <h2>{channelTitle}</h2>
        <h3>Join Membership</h3>
        <p>Support {channelTitle} with a monthly membership subscription to help and receive exclusive features.</p>
      </div>
      <div className="join-membership__modal-tabs">
        {creatorMemberships.map(({ Membership }, index) => (
          <Button
            key={Membership.id}
            label={Membership.name}
            button="alt"
            onClick={() => setMembershipIndex(index)}
            className={classnames('button-toggle', {
              'button-toggle--active': index === selectedMembershipIndex,
              'protected-membership-button': protectedMembershipIds && protectedMembershipIds.includes(Membership.id),
            })}
          />
        ))}
      </div>
      <div className="join-membership__modal-content">
        <MembershipDetails membership={selectedTier} />
      </div>

      <div className="join-membership__modal-action">
        <Button
          icon={ICONS.UPGRADE}
          button="primary"
          type="submit"
          disabled={channelIsMine}
          label={__('Signup for $%membership_price% a month', {
            membership_price: selectedTier.NewPrices[0].Price.amount / 100,
          })}
          onClick={handleSelect}
        />

        {channelIsMine && (
          <span className="info-label">{__("You're not able to signup for your own memberships")}</span>
        )}
      </div>
    </>
  );
};

export default PreviewPage;
