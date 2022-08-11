// @flow
import { parseURI } from 'util/lbryURI';
import { createSelector } from 'reselect';
import { createCachedSelector } from 're-reselect';
import { selectChannelClaimIdForUri, selectMyChannelClaimIds } from 'redux/selectors/claims';
import { ODYSEE_CHANNEL } from 'constants/channels';

type State = { memberships: any };

const selectState = (state: State) => state.memberships || {};

export const selectMembershipMineData = (state: State) => selectState(state).membershipMine;
export const selectMyActiveMemberships = (state: State) => selectMembershipMineData(state)?.activeMemberships;
export const selectMembershipFetchingIdsByChannel = (state: State) => selectState(state).fetchingIds;
export const selectMembershipsFetchedById = (state: State) => selectState(state).fetchedById;
export const selectById = (state: State) => selectState(state).membershipListById || {};
export const selectDidFetchMembershipsDataById = (state) => selectState(state).didFetchMembershipsDataById;

export const selectFetchingIdsForMembershipChannelId = (state: State, channelId: string) => {
  const fetchingIdsById = selectMembershipFetchingIdsByChannel(state);
  return fetchingIdsById[channelId];
};

export const selectFetchedIdsForMembershipChannelId = (state: State, channelId: string) => {
  const fetchedById = selectMembershipsFetchedById(state);
  return fetchedById[channelId];
};

export const selectCreatorIdMembershipForChannelId = (state: State, creatorId: string, channelId: string) => {
  const fetchedMemberships = selectFetchedIdsForMembershipChannelId(state, creatorId);
  return fetchedMemberships && fetchedMemberships[channelId];
};
export const selectOdyseeMembershipForChannelId = (state: State, channelId: string) =>
  selectCreatorIdMembershipForChannelId(state, ODYSEE_CHANNEL.ID, channelId);

export const selectOdyseeMembershipOptions = (state: State) => {
  const byId = selectById(state);
  return byId[ODYSEE_CHANNEL.ID];
};

export const selectChannelMembershipListByUri = createSelector(
  selectChannelClaimIdForUri,
  selectById,
  (channelId, byId) => byId[channelId]
);

export const selectCreatorMembershipsFetchedByUri = createSelector(
  selectChannelMembershipListByUri,
  (memberships) => memberships !== undefined
);

export const selectCreatorHasMembershipsByUri = createSelector(selectChannelMembershipListByUri, (memberships) =>
  Boolean(memberships?.length > 0)
);

export const selectMembershipMineFetched = createSelector(
  selectMembershipMineData,
  (membershipMine) => membershipMine !== undefined
);

export const selectMyActiveMembershipsForCreatorId = (state: State, creatorId: string) => {
  const activeMemberships = selectMyActiveMemberships(state);
  return activeMemberships && activeMemberships[creatorId];
};
export const selectMyActiveMembershipsForCreatorUri = (state: State, creatorUri: string) =>
  selectMyActiveMembershipsForCreatorId(state, selectChannelClaimIdForUri(state, creatorUri));
export const selectMyActiveCreatorMembershipForChannelId = (state: State, creatorId: string, channelId: string) => {
  const myActiveMembership = selectMyActiveMembershipsForCreatorId(state, creatorId);
  return myActiveMembership?.Membership?.channel_id === channelId ? myActiveMembership : undefined;
};
export const selectActiveCreatorMembershipNameForChannelId = (state: State, creatorId: string, channelId: string) => {
  const activeMembership = selectMyActiveCreatorMembershipForChannelId(state, creatorId, channelId);
  return activeMembership?.MembershipDetails?.name;
};
export const selectActiveOdyseeMembershipNameForChannelId = (state: State, id: string) =>
  selectActiveCreatorMembershipNameForChannelId(state, ODYSEE_CHANNEL.ID, selectChannelClaimIdForUri(state, id));

export const selectUserPurchasedMembershipForChannelUri = createCachedSelector(
  (state, uri) => uri,
  selectMembershipMineData,
  (uri, membershipMine) => {
    const { channelName } = parseURI(uri);

    const purchasedMemberships = membershipMine && Object.values(membershipMine.purchasedMemberships);

    if (purchasedMemberships === undefined) return undefined;

    // $FlowFixMe
    const purchasedMembershipForChannel = purchasedMemberships?.find(
      (membership) => membership.MembershipDetails.channel_name === `@${channelName || ''}`
    );

    return purchasedMembershipForChannel || null;
  }
)((state, uri) => `${String(uri)}`);

export const selectUserValidMembershipForChannelUri = createCachedSelector(
  (state, uri) => uri,
  selectMembershipMineData,
  (uri, membershipMine) => {
    const { channelName } = parseURI(uri);

    const purchasedMemberships = membershipMine && Object.values(membershipMine.purchasedMemberships);

    if (purchasedMemberships === undefined) return undefined;

    // $FlowFixMe
    const purchasedMembershipForChannel = purchasedMemberships?.find(
      (membership) => membership.MembershipDetails.channel_name === `@${channelName || ''}`
    );

    const subscriptionEndTime = purchasedMembershipForChannel?.Subscription?.current_period_end;

    const currentTimeInStripeFormat = new Date().getTime() / 1000;

    const membershipIsValid = currentTimeInStripeFormat < subscriptionEndTime;

    return membershipIsValid ? purchasedMembershipForChannel : null;
  }
)((state, uri) => `${String(uri)}`);
