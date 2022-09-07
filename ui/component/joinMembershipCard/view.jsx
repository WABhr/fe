// @flow
import React from 'react';
import { Form } from 'component/common/form';
import Card from 'component/common/card';
import ConfirmationPage from './internal/confirmationPage';
import PreviewPage from './internal/previewPage';
import Spinner from 'component/spinner';
import classnames from 'classnames';

type Props = {
  uri: string,
  doHideModal: () => void,
  membershipIndex: number,
  protectedMembershipIds: Array<number>,
  // -- redux --
  activeChannelClaim: ChannelClaim,
  channelName: ?string,
  channelClaimId: ?string,
  creatorMemberships: ?CreatorMemberships,
  hasSavedCard: ?boolean,
  doMembershipList: (params: MembershipListParams) => Promise<CreatorMemberships>,
  doGetCustomerStatus: () => void,
  doMembershipBuy: (membershipParams: MembershipBuyParams) => Promise<Membership>,
  doToast: (params: { message: string }) => void,
};

const JoinMembershipCard = (props: Props) => {
  const {
    uri,
    doHideModal,
    membershipIndex,
    protectedMembershipIds,
    // -- redux --
    activeChannelClaim,
    channelName,
    channelClaimId,
    creatorMemberships,
    hasSavedCard,
    doMembershipList,
    doGetCustomerStatus,
    doMembershipBuy,
    doToast,
  } = props;

  const [isOnConfirmationPage, setConfirmationPage] = React.useState(false);
  const [selectedMembershipIndex, setMembershipIndex] = React.useState(0);
  const selectedTier = creatorMemberships && creatorMemberships[selectedMembershipIndex];

  function handleJoinMembership() {
    if (!selectedTier) return;

    const membershipBuyParams: MembershipBuyParams = {
      membership_id: selectedTier.Membership.id,
      channel_id: activeChannelClaim.claim_id,
      channel_name: activeChannelClaim.name,
      price_id: selectedTier.NewPrices && selectedTier.NewPrices[0].Price.stripe_price_id,
    };

    doMembershipBuy(membershipBuyParams).then(() => {
      if (doHideModal) {
        doHideModal();
      } else {
        window.pendingMembership = true;
        setConfirmationPage(false);
      }

      doToast({
        message: __(
          "You are now a '%membership_tier_name%' member for %creator_channel_name%, enjoy the perks and special features!",
          {
            membership_tier_name: selectedTier.Membership.name,
            creator_channel_name: selectedTier.Membership.channel_name,
          }
        ),
      });
    });
  }

  React.useEffect(() => {
    if (membershipIndex) {
      setMembershipIndex(membershipIndex);
    }
  }, [membershipIndex]);

  React.useEffect(() => {
    if (channelClaimId && channelName && creatorMemberships === undefined) {
      doMembershipList({ channel_name: channelName, channel_id: channelClaimId });
    }
  }, [channelClaimId, channelName, creatorMemberships, doMembershipList]);

  React.useEffect(() => {
    if (hasSavedCard === undefined) {
      doGetCustomerStatus();
    }
  }, [doGetCustomerStatus, hasSavedCard]);

  const pageProps = React.useMemo(() => {
    return { uri, selectedTier };
  }, [selectedTier, uri]);

  if (window.pendingMembership || creatorMemberships === undefined || hasSavedCard === undefined) {
    return (
      <div className="main--empty">
        <Spinner />
      </div>
    );
  }

  let commaSeparatedMembershipNames;
  let membershipNames = [];
  if (creatorMemberships && protectedMembershipIds) {
    for (const membership of creatorMemberships) {
      const membershipId = membership.Membership.id;

      if (protectedMembershipIds.includes(membershipId)) {
        membershipNames.push(membership.Membership.name);
      }

      commaSeparatedMembershipNames = membershipNames.join(', ');
    }
  }

  return (
    <Form onSubmit={handleJoinMembership}>
      <Card
        className={classnames('card--join-membership', {
          'membership-tier1': selectedMembershipIndex === 0,
          'membership-tier2': selectedMembershipIndex === 1,
          'membership-tier3': selectedMembershipIndex === 2,
          'membership-tier4': selectedMembershipIndex === 3,
          'membership-tier5': selectedMembershipIndex === 4,
          'membership-tier6': selectedMembershipIndex === 5,
        })}
        body={
          <>
            {commaSeparatedMembershipNames && (
              <p className="section__subtitle section__subtitle--join-membership__perk">
                {commaSeparatedMembershipNames}
              </p>
            )}
            {isOnConfirmationPage ? (
              <ConfirmationPage {...pageProps} onCancel={() => setConfirmationPage(false)} />
            ) : (
              <PreviewPage
                {...pageProps}
                handleSelect={() => setConfirmationPage(true)}
                selectedMembershipIndex={selectedMembershipIndex}
                setMembershipIndex={setMembershipIndex}
                protectedMembershipIds={protectedMembershipIds}
              />
            )}
          </>
        }
      />
    </Form>
  );
};

export default JoinMembershipCard;