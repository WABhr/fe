// restore flow
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';

import { FormField } from 'component/common/form';

import * as ICONS from 'constants/icons';
import * as PAGES from 'constants/pages';
import * as MODALS from 'constants/modal_types';

// import Card from 'component/common/card';
import Button from 'component/button';
import ErrorText from 'component/common/error-text';

// eslint-disable-next-line flowtype/no-types-missing-file-annotation
type Props = {
  bankAccountConfirmed: boolean,
  activeChannel: Claim,
  membershipPerks: MembershipTiers,
  creatorMemberships: CreatorMemberships,
  doMembershipAddTier: (params: MembershipAddTierParams) => Promise<Membership>,
  doGetMembershipPerks: (params: MembershipListParams) => Promise<MembershipPerks>,
  doMembershipList: (params: MembershipListParams) => Promise<CreatorMemberships>,
  doOpenModal: (modalId: string, {}) => void,
  doToast: (params: { message: string }) => void,
  doDeactivateMembershipForId: (membershipId: number) => Promise<Membership>,
};

// eslint-disable-next-line flowtype/no-types-missing-file-annotation
const CreateTiersTab = (props: Props) => {
  const {
    bankAccountConfirmed,
    activeChannel,
    membershipPerks,
    creatorMemberships: fetchedMemberships,
    doMembershipAddTier,
    doGetMembershipPerks,
    doMembershipList,
    doOpenModal,
    doToast,
    doDeactivateMembershipForId,
  } = props;

  const { name: activeChannelName, claim_id: activeChannelId } = activeChannel || {};

  const [isEditing, setIsEditing] = React.useState(false);
  const [creatorMemberships, setCreatorMemberships] = React.useState(fetchedMemberships || []);
  const [editTierDescription, setEditTierDescription] = React.useState('');
  const [pendingTier, setPendingTier] = React.useState(false);

  React.useEffect(() => {
    if (activeChannelName && activeChannelId) {
      doGetMembershipPerks({ channel_name: activeChannelName, channel_id: activeChannelId });
    }
  }, [activeChannelName, activeChannelId, doGetMembershipPerks]);

  React.useEffect(() => {
    if (activeChannelName && activeChannelId) {
      doMembershipList({ channel_name: activeChannelName, channel_id: activeChannelId });
    }
  }, [activeChannelId, activeChannelName, doMembershipList]);

  React.useEffect(() => {
    if (fetchedMemberships) {
      setCreatorMemberships(fetchedMemberships);
    }
  }, [fetchedMemberships]);

  // focus name when you create a new tier
  React.useEffect(() => {
    document.querySelector("input[name='tier_name']")?.focus();
  }, [pendingTier]);

  const editMembership = (e, tierIndex, tierDescription) => {
    setEditTierDescription(tierDescription);
    setIsEditing(tierIndex);
    // setPendingTier(true);
  };

  // when someone hits the 'Save' button from the edit functionality
  async function saveMembership(tierIndex) {
    const copyOfMemberships = creatorMemberships;

    // grab the tier name, description, monthly amount and perks
    // $FlowFixMe
    const newTierName = document.querySelectorAll('input[name=tier_name]')[0]?.value;
    const newTierDescription = editTierDescription;
    // $FlowFixMe
    const newTierMonthlyContribution = document.querySelectorAll('input[name=tier_contribution]')[0]?.value;

    let selectedPerks = [];

    for (const perk of membershipPerks) {
      // $FlowFixMe
      const odyseePerkSelected = document.querySelector(`input#perk_${perk.id}.membership_perks`).checked;
      // const odyseePerkSelected = document.getElementById(perkDescription.perkName)?.checked;
      if (odyseePerkSelected) {
        selectedPerks.push(perk.id);
      }
    }

    const selectedPerksAsArray = selectedPerks.toString();

    const newObject = {
      // displayName: newTierName,
      // description: newTierDescription,
      // amount: Number(newTierMonthlyContribution) * 100,
      // monthlyContributionInUSD: Number(newTierMonthlyContribution),
      // perks: selectedPerks,
      Membership: {
        name: newTierName,
        description: newTierDescription,
      },
      Prices: [{ unit_amount: Number(newTierMonthlyContribution) * 100 }],
      NewPrices: [{ Price: { amount: Number(newTierMonthlyContribution) * 100 } }],
      Perks: [], // TODO: list these dynamically
    };

    const oldObject = creatorMemberships[tierIndex];

    let oldStripePrice = oldObject?.Prices;
    if (oldStripePrice.length) {
      oldStripePrice = oldStripePrice[0].id;
    }

    // const oldMembershipId = oldObject?.Membership.id;

    // only hit backend if there is a difference between the current state
    // if (1 == 1) {
    copyOfMemberships[tierIndex] = newObject;

    // setCreatorMemberships(copyOfMemberships);

    const response = await doMembershipAddTier({
      channel_name: activeChannelName,
      channel_id: activeChannelId,
      name: newTierName,
      description: newTierDescription,
      amount: Number(newTierMonthlyContribution) * 100, // multiply to turn into cents
      currency: 'usd', // hardcoded for now
      perks: selectedPerksAsArray,
      // oldStripePrice,
      // oldMembershipId,
      // perks: selectedPerks,
    });
    console.log(response);

    // getExistingTiers();

    setIsEditing(false);
    console.log(newObject);
    setCreatorMemberships([...fetchedMemberships, newObject]);
    // }

    // TODO: better way than setTimeout
    // setTimeout(function () {
    //   document.getElementsByClassName('membership-tier__div')[tierIndex].scrollIntoView({ behavior: 'smooth' });
    // }, 15);
  }

  const containsPerk = (perkId, tier) => {
    if (!tier.Perks) return false;

    let perkIds = [];
    for (const tierPerk of tier.Perks) {
      perkIds.push(tierPerk.id);
    }

    return perkIds.includes(perkId);
  };

  function createEditTier(tier, membershipIndex) {
    // TODO: better way than setTimeout
    // setTimeout(function () {
    //   document.getElementById('edit-div').scrollIntoView({ behavior: 'smooth' });
    // }, 15);

    console.log('tier ');
    console.log(tier);

    return (
      <div className="edit-div" style={{ marginBottom: '45px' }}>
        <FormField type="text" name="tier_name" label={__('Tier Name')} defaultValue={tier.Membership.name} />
        {/* could be cool to have markdown */}
        {/* <FormField */}
        {/*  type="markdown" */}
        {/* /> */}
        <FormField
          type="textarea"
          rows="10"
          name="tier_description"
          label={__('Tier Description (You can also add custom benefits here)')}
          placeholder={__('Description of your tier')}
          value={editTierDescription}
          onChange={(e) => setEditTierDescription(e.target.value)}
        />
        <label htmlFor="tier_name" style={{ marginTop: '15px', marginBottom: '8px' }}>
          Odysee Perks
        </label>
        {membershipPerks.map((tierPerk, i) => (
          <>
            <FormField
              type="checkbox"
              defaultChecked={containsPerk(tierPerk.id, tier)}
              label={tierPerk.description}
              name={'perk_' + tierPerk.id}
              className="membership_perks"
            />
          </>
        ))}
        <FormField
          className="form-field--price-amount"
          type="number"
          name="tier_contribution"
          step="1"
          label={__('Monthly Contribution ($/Month)')}
          defaultValue={tier.Prices[0].unit_amount / 100}
          onChange={(event) => parseFloat(event.target.value)}
          disabled={tier.HasSubscribers}
        />
        {tier.HasSubscribers && (
          <h4 className="header--cant_change_price">
            This membership has subscribers, you can't update the price currently
          </h4>
        )}
        <div className="section__actions">
          <Button button="primary" label={'Save Tier'} onClick={() => saveMembership(membershipIndex)} />
          <Button
            button="link"
            label={__('Cancel')}
            onClick={() => {
              setIsEditing(false);
              // tier was just added, if canceled then 'delete' the tier
              if (pendingTier) {
                let membershipsBeforeDeletion = creatorMemberships;
                const membershipsAfterDeletion = membershipsBeforeDeletion.filter(
                  (tiers, index) => index !== membershipIndex
                );
                setCreatorMemberships(membershipsAfterDeletion);
                setPendingTier(false);
              }
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* page header */}
      <div className="create-tiers__header">
        <h1>Create Your Membership Tiers</h1>
        <h2>Define the tiers that your viewers can subscribe to.</h2>
      </div>

      <div className={classnames('tier-edit-functionality', { 'edit-functionality-disabled': !bankAccountConfirmed })}>
        {/* list through different tiers */}
        {creatorMemberships &&
          creatorMemberships.length > 0 &&
          creatorMemberships.map((membershipTier, membershipIndex) => (
            <div className="create-tier__card" key={membershipIndex}>
              {/* if the membership tier is marked as editing, show the edit functionality */}
              {isEditing === membershipIndex && <>{createEditTier(membershipTier, membershipIndex)}</>}
              {/* display info for the tier */}
              {/* this long conditional isnt fully necessary but some test environment data is bad atm */}
              {isEditing !== membershipIndex && membershipTier.NewPrices && membershipTier.NewPrices.length && (
                <div className="membership-tier__div">
                  <div style={{ marginBottom: 'var(--spacing-s)', fontSize: '1.1rem' }}>
                    {membershipIndex + 1}) Tier Name: {membershipTier.Membership.name}
                  </div>
                  <h1>{membershipTier.Membership.description}</h1>
                  <h1>Monthly Pledge: ${membershipTier.NewPrices[0].Price.amount / 100}</h1>
                  {membershipTier.Perks &&
                    membershipTier.Perks.map((tierPerk, i) => (
                      <>
                        <p>
                          <ul>
                            <li>{tierPerk.description}</li>
                          </ul>
                        </p>
                      </>
                    ))}
                  <div className="buttons-div" style={{ marginTop: '13px' }}>
                    {/* cancel membership button */}
                    <Button
                      button="alt"
                      onClick={(e) => editMembership(e, membershipIndex, membershipTier.Membership.description)}
                      className="edit-membership-button"
                      label={__('Edit Tier')}
                      icon={ICONS.EDIT}
                    />
                    {/* cancel membership button */}
                    <Button
                      button="alt"
                      onClick={(e) => {
                        let membershipsBeforeDeletion = creatorMemberships;

                        // const amountOfMembershipsCurrently = creatorMemberships.length;
                        // if (amountOfMembershipsCurrently === 1) {
                        //   const displayString = __('You must have at least one tier for your membership options');
                        //   return doToast({ message: displayString, isError: true });
                        // }

                        doOpenModal(MODALS.CONFIRM, {
                          title: __('Confirm Membership Deletion'),
                          subtitle: __('Are you sure you want to delete yor "%membership_name%" membership?', {
                            membership_name: membershipsBeforeDeletion[membershipIndex].Membership.name,
                          }),
                          busyMsg: __('Deleting your membership...'),
                          onConfirm: (closeModal, setIsBusy) => {
                            setIsBusy(true);
                            doDeactivateMembershipForId(membershipsBeforeDeletion[membershipIndex].Membership.id).then(
                              () => {
                                setIsBusy(false);
                                doToast({ message: __('Your membership was succesfully deleted.') });
                                const membershipsAfterDeletion = membershipsBeforeDeletion.filter(
                                  (tiers, index) => index !== membershipIndex
                                );
                                setCreatorMemberships(membershipsAfterDeletion);
                                closeModal();
                              }
                            );
                          },
                        });
                      }}
                      className="cancel-membership-button"
                      label={__('Delete Tier')}
                      icon={ICONS.DELETE}
                      disabled={membershipTier.HasSubscribers}
                    />
                  </div>
                  {membershipTier.HasSubscribers && (
                    <ErrorText>{__('This membership has active subscribers and cannot be deleted.')}</ErrorText>
                  )}
                </div>
              )}
            </div>
          ))}

        {/* add membership tier button */}
        {creatorMemberships && creatorMemberships.length < 6 && (
          <div>
            <Button
              button="primary"
              onClick={(e) => {
                const amountOfMembershipsCurrently = creatorMemberships.length;

                const newestMembership = {
                  Membership: {
                    name: 'Example Plan',
                    description: 'You can describe extra perks here',
                  },
                  Prices: [
                    {
                      unit_amount: 500,
                    },
                  ],
                  saved: false,
                };

                setEditTierDescription(newestMembership.Membership.description);
                setCreatorMemberships([...creatorMemberships, newestMembership]);
                setPendingTier(true);
                setIsEditing(amountOfMembershipsCurrently);
              }}
              className="add-membership__button"
              label={__('Add Tier')}
              icon={ICONS.ADD}
            />
          </div>
        )}
      </div>

      {!bankAccountConfirmed && (
        <>
          <div style={{ marginTop: '56px' }}>
            <h1 style={{ textAlign: 'center' }} className="confirm-account-to-create-tiers-header">
              Please confirm your bank account before you can create tiers
            </h1>
            <Button
              button="primary"
              className="membership_button"
              label={__('Connect a bank account')}
              icon={ICONS.FINANCE}
              navigate={`$/${PAGES.SETTINGS_STRIPE_ACCOUNT}`}
              style={{ maxWidth: '254px', margin: '0 auto', marginTop: '15px' }}
            />
          </div>
        </>
      )}

      {/* ** show additional info checkboxes, activate memberships button ***/}
      {/* ** disabling until the backend is ready ** */}
      {/* /!** additional options checkboxes **!/ */}
      {/* <div className="show-additional-membership-info__div"> */}
      {/*  <h2 className="show-additional-membership-info__header">Additional Info</h2> */}
      {/*  <FormField */}
      {/*    type="checkbox" */}
      {/*    defaultChecked={false} */}
      {/*    label={'Show the amount of supporters on your Become A Member page'} */}
      {/*    name={'showSupporterAmount'} */}
      {/*  /> */}
      {/*  <FormField */}
      {/*    type="checkbox" */}
      {/*    defaultChecked={false} */}
      {/*    label={'Show the amount you make monthly on your Become A Member page'} */}
      {/*    name={'showMonthlyIncomeAmount'} */}
      {/*  /> */}
      {/* </div> */}

      {/* /!* activate memberships button *!/ */}
      {/* <div className="activate-memberships-button__div"> */}
      {/*  <Button */}
      {/*    button="primary" */}
      {/*    onClick={(e) => openActivateMembershipsModal()} */}
      {/*    className="activate-memberships__button" */}
      {/*    label={__('Activate Memberships')} */}
      {/*    icon={ICONS.ADD} */}
      {/* /> */}
      {/* {/*</div> */}
    </div>
  );
};

export default CreateTiersTab;
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */