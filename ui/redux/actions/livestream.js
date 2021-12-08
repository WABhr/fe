// @flow
import * as ACTIONS from 'constants/action_types';
import { doClaimSearch } from 'redux/actions/claims';
import { LIVESTREAM_LIVE_API, LIVESTREAM_STARTS_SOON_BUFFER } from 'constants/livestream';
import moment from 'moment';

export const doFetchNoSourceClaims = (channelId: string) => async (dispatch: Dispatch, getState: GetState) => {
  dispatch({
    type: ACTIONS.FETCH_NO_SOURCE_CLAIMS_STARTED,
    data: channelId,
  });
  try {
    await dispatch(
      doClaimSearch({
        channel_ids: [channelId],
        has_no_source: true,
        claim_type: ['stream'],
        no_totals: true,
        page_size: 20,
        page: 1,
        include_is_my_output: true,
      })
    );

    dispatch({
      type: ACTIONS.FETCH_NO_SOURCE_CLAIMS_COMPLETED,
      data: channelId,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.FETCH_NO_SOURCE_CLAIMS_FAILED,
      data: channelId,
    });
  }
};

const FETCH_ACTIVE_LIVESTREAMS_MIN_INTERVAL_MS = 5 * 60 * 1000;

const transformLivestreamData = (data: any): LivestreamInfo => {
  return data.reduce((acc, curr) => {
    acc[curr.claimId] = {
      live: curr.live,
      viewCount: curr.viewCount,
      creatorId: curr.claimId,
      startedStreaming: moment(curr.timestamp),
    };
    return acc;
  }, {});
};

const fetchLiveStreamData = async () => {
  const response = await fetch(LIVESTREAM_LIVE_API);
  const json = await response.json();
  if (!('data' in json)) throw new Error();
  return transformLivestreamData(json.data);
};

const filterUpcomingLiveStreamClaims = (upcomingClaims) => {
  const startsSoonMoment = moment().startOf('minute').add(LIVESTREAM_STARTS_SOON_BUFFER, 'minutes');
  // $FlowFixMe
  return Object.values(upcomingClaims).filter((claim) =>
    // $FlowFixMe
    moment.unix(claim.stream.value.release_time).isSameOrBefore(startsSoonMoment)
  );
};

const fetchUpcomingLivestreamClaims = (channelIds: Array<string>, nextOptions: any) => {
  return doClaimSearch({
    page: 1,
    page_size: nextOptions.page_size,
    has_no_source: true,
    channel_ids: channelIds,
    claim_type: ['stream'],
    order_by: ['^release_time'],
    release_time: `>${moment().subtract(5, 'minutes').unix()}`,
    limit_claims_per_channel: 1,
    no_totals: true,
  });
};

const fetchMostRecentLivestreamClaims = (channelIds: Array<string>, nextOptions: any) => {
  return doClaimSearch({
    page: 1,
    page_size: nextOptions.page_size,
    has_no_source: true,
    channel_ids: channelIds,
    claim_type: ['stream'],
    order_by: nextOptions.order_by, // **
    release_time: `<${moment().unix()}`,
    limit_claims_per_channel: 2, // **
    no_totals: true,
  });
};

const distanceFromStreamStart = (claimA, claimB, channelStartedStreaming) => {
  // $FlowFixMe
  const distanceA = Math.abs(moment.unix(claimA.stream.value.release_time).diff(channelStartedStreaming, 'minutes'));
  // $FlowFixMe
  const distanceB = Math.abs(moment.unix(claimB.stream.value.release_time).diff(channelStartedStreaming, 'minutes'));
  return [distanceA, distanceB];
};

const useUpcomingClaim = (channelId: string, claim: any, startingSoonClaims: any, activeLivestreams: any) => {
  // Determine if this channel has a scheduled / upcoming livestream claim that's starting soon.
  const upcomingClaim = startingSoonClaims.find((claim) => claim.stream.signing_channel.claim_id === channelId);
  if (!upcomingClaim) return;

  // If it does have one, it can be considered the live claim, but only if the channel started streaming at a time closer to it's release time than the recent one.
  const [upcomingDistance, mostRecentDistance] = distanceFromStreamStart(
    upcomingClaim,
    claim,
    activeLivestreams[channelId].startedStreaming
  );
  const useUpcoming = upcomingDistance <= mostRecentDistance;

  if (!useUpcoming) return;
  return upcomingClaim;
};

const determineActiveLiveClaim = (claims, activeLivestreams) => {
  const activeClaims = {};

  Object.values(claims).forEach((claim) => {
    // $FlowFixMe
    const channelID = claim.stream.signing_channel.claim_id;
    if (activeClaims[channelID]) {
      const [distanceA, distanceB] = distanceFromStreamStart(
        claim,
        activeClaims[channelID],
        activeLivestreams[channelID].startedStreaming
      );

      if (distanceA < distanceB) {
        activeClaims[channelID] = claim;
      }
    } else {
      activeClaims[channelID] = claim;
    }
  });
  return activeClaims;
};

export const doFetchActiveLivestreams = (
  orderBy: Array<string> = ['release_time'],
  pageSize: number = 50,
  forceFetch: boolean = false
) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    const now = Date.now();
    const timeDelta = now - state.livestream.activeLivestreamsLastFetchedDate;

    const prevOptions = state.livestream.activeLivestreamsLastFetchedOptions;
    const nextOptions = { page_size: pageSize, order_by: orderBy };
    const sameOptions = JSON.stringify(prevOptions) === JSON.stringify(nextOptions);

    if (!forceFetch && sameOptions && timeDelta < FETCH_ACTIVE_LIVESTREAMS_MIN_INTERVAL_MS) {
      dispatch({ type: ACTIONS.FETCH_ACTIVE_LIVESTREAMS_SKIPPED });
      return;
    }

    dispatch({ type: ACTIONS.FETCH_ACTIVE_LIVESTREAMS_STARTED });

    try {
      const activeLivestreams = await fetchLiveStreamData();

      // Find the two most recent claims for the channels that are actively broadcasting a stream.
      const mostRecentClaims = await dispatch(
        fetchMostRecentLivestreamClaims(Object.keys(activeLivestreams), nextOptions)
      );

      // Using the stream start time, determine which of the most recent two claims should be considered live.
      const activeLiveClaims = determineActiveLiveClaim(mostRecentClaims, activeLivestreams);

      // Find the first upcoming claim (if one exists) for each channel that's actively broadcasting a stream.
      const upcomingClaims = await dispatch(fetchUpcomingLivestreamClaims(Object.keys(activeLivestreams), nextOptions));

      // Filter out any upcoming claims that aren't scheduled to start within the configured buffer time.
      const startingSoonClaims = filterUpcomingLiveStreamClaims(upcomingClaims);

      Object.values(activeLiveClaims).forEach((mostRecentClaim) => {
        // $FlowFixMe
        const channelId = mostRecentClaim.stream.signing_channel.claim_id;
        const claim =
          useUpcomingClaim(channelId, mostRecentClaim, startingSoonClaims, activeLivestreams) || mostRecentClaim;

        activeLivestreams[channelId] = {
          ...activeLivestreams[channelId],
          // $FlowFixMe
          latestClaimId: claim.stream.claim_id,
          // $FlowFixMe
          latestClaimUri: claim.stream.canonical_url,
        };
      });

      dispatch({
        type: ACTIONS.FETCH_ACTIVE_LIVESTREAMS_COMPLETED,
        data: {
          activeLivestreams,
          activeLivestreamsLastFetchedDate: now,
          activeLivestreamsLastFetchedOptions: nextOptions,
        },
      });
    } catch {
      dispatch({ type: ACTIONS.FETCH_ACTIVE_LIVESTREAMS_FAILED });
    }
  };
};
