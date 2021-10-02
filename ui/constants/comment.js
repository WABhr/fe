export const LINKED_COMMENT_QUERY_PARAM = 'lc';

export const SORT_COMMENTS_NEW = 'new';
export const SORT_COMMENTS_BEST = 'best';
export const SORT_COMMENTS_CONTROVERSIAL = 'controversial';

export const SORT_BY = {
  NEWEST: 0,
  OLDEST: 1,
  CONTROVERSY: 2,
  POPULARITY: 3,
  NEWEST_NO_PINS: 4,
};

export const BLOCK_LEVEL = {
  SELF: 'self',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
};

export const COMMENT_PAGE_SIZE_TOP_LEVEL = 10;
export const COMMENT_PAGE_SIZE_REPLIES = 10;

// ***************************************************************************
// SBL: Shared Blocked List
// ***************************************************************************

export const SBL_INVITE_STATUS = {
  ALL: 0,
  PENDING: 1,
  ACCEPTED: 2,
  REJECTED: 3,
  NONE: 4,
};
