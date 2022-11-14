// @flow
import { createSelector } from 'reselect';
import { splitBySeparator } from 'util/lbryURI';

type State = { blocked: BlocklistState };

const selectState = (state: State) => state.blocked || {};

export const selectMutedChannels = (state: State) => {
  const blockedChannels = selectState(state).blockedChannels;

  return blockedChannels !== undefined ? blockedChannels || [] : undefined;
};
export const selectGeoBlockLists = (state: State) => selectState(state).geoBlockedList;

export const makeSelectChannelIsMuted = (uri: string) =>
  createSelector(selectMutedChannels, (state: Array<string>) => {
    return state.includes(uri);
  });

export const selectMutedAndBlockedChannelIds = createSelector(
  selectState,
  (state) => state.comments,
  (state, commentsState) => {
    const mutedUris = state.blockedChannel || [];
    const blockedUris = commentsState.moderationBlockList;
    return Array.from(
      new Set((mutedUris || []).concat(blockedUris || []).map((uri) => splitBySeparator(uri)[1]))
    ).sort();
  }
);
