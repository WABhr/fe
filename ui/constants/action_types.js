/*
  Constants for redux actions
  All names should be in present tense
  ex:
  XXX_START
  XXX_SUCCESS
  XXX_FAIL
  XXX_COMPLETE // if there is no fail case
*/

// redux-persist
export const REHYDRATE = 'persist/REHYDRATE';

// app
export const WINDOW_FOCUSED = 'WINDOW_FOCUSED';
export const DAEMON_READY = 'DAEMON_READY';
export const DAEMON_VERSION_MATCH = 'DAEMON_VERSION_MATCH';
export const DAEMON_VERSION_MISMATCH = 'DAEMON_VERSION_MISMATCH';
export const VOLUME_CHANGED = 'VOLUME_CHANGED';
export const VOLUME_MUTED = 'VOLUME_MUTED';
export const ADD_COMMENT = 'ADD_COMMENT';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const CHANGE_MODALS_ALLOWED = 'CHANGE_MODALS_ALLOWED';
export const TOGGLE_SEARCH_EXPANDED = 'TOGGLE_SEARCH_EXPANDED';
export const PASSWORD_SAVED = 'PASSWORD_SAVED';
export const SET_WELCOME_VERSION = 'SET_WELCOME_VERSION';
export const SET_ALLOW_ANALYTICS = 'SET_ALLOW_ANALYTICS';
export const SET_HAS_NAVIGATED = 'SET_HAS_NAVIGATED';
export const SET_SYNC_LOCK = 'SET_SYNC_LOCK';
export const TOGGLE_YOUTUBE_SYNC_INTEREST = 'TOGGLE_YOUTUBE_SYNC_INTEREST';
export const TOGGLE_SPLASH_ANIMATION = 'TOGGLE_SPLASH_ANIMATION';
export const SET_ACTIVE_CHANNEL = 'SET_ACTIVE_CHANNEL';
export const SET_INCOGNITO = 'SET_INCOGNITO';
export const SET_MOBILE_PLAYER_DIMENSIONS = 'SET_MOBILE_PLAYER_DIMENSIONS';
export const RELOAD_REQUIRED = 'RELOAD_REQUIRED';

// Navigation
export const CHANGE_AFTER_AUTH_PATH = 'CHANGE_AFTER_AUTH_PATH';
export const WINDOW_SCROLLED = 'WINDOW_SCROLLED';
export const HISTORY_NAVIGATE = 'HISTORY_NAVIGATE';

// Upgrades
export const UPGRADE_CANCELLED = 'UPGRADE_CANCELLED';
export const DOWNLOAD_UPGRADE = 'DOWNLOAD_UPGRADE';
export const UPGRADE_DOWNLOAD_STARTED = 'UPGRADE_DOWNLOAD_STARTED';
export const UPGRADE_DOWNLOAD_COMPLETED = 'UPGRADE_DOWNLOAD_COMPLETED';
export const UPGRADE_DOWNLOAD_PROGRESSED = 'UPGRADE_DOWNLOAD_PROGRESSED';
export const CHECK_UPGRADE_AVAILABLE = 'CHECK_UPGRADE_AVAILABLE';
export const CHECK_UPGRADE_START = 'CHECK_UPGRADE_START';
export const CHECK_UPGRADE_SUCCESS = 'CHECK_UPGRADE_SUCCESS';
export const CHECK_UPGRADE_FAIL = 'CHECK_UPGRADE_FAIL';
export const CHECK_UPGRADE_SUBSCRIBE = 'CHECK_UPGRADE_SUBSCRIBE';
export const UPDATE_VERSION = 'UPDATE_VERSION';
export const UPDATE_REMOTE_VERSION = 'UPDATE_REMOTE_VERSION';
export const SKIP_UPGRADE = 'SKIP_UPGRADE';
export const START_UPGRADE = 'START_UPGRADE';
export const AUTO_UPDATE_DECLINED = 'AUTO_UPDATE_DECLINED';
export const AUTO_UPDATE_DOWNLOADED = 'AUTO_UPDATE_DOWNLOADED';
export const CLEAR_UPGRADE_TIMER = 'CLEAR_UPGRADE_TIMER';

// Wallet
export const GET_NEW_ADDRESS_STARTED = 'GET_NEW_ADDRESS_STARTED';
export const GET_NEW_ADDRESS_COMPLETED = 'GET_NEW_ADDRESS_COMPLETED';
export const FETCH_TRANSACTIONS_STARTED = 'FETCH_TRANSACTIONS_STARTED';
export const FETCH_TRANSACTIONS_COMPLETED = 'FETCH_TRANSACTIONS_COMPLETED';
export const UPDATE_BALANCE = 'UPDATE_BALANCE';
export const CHECK_ADDRESS_IS_MINE_STARTED = 'CHECK_ADDRESS_IS_MINE_STARTED';
export const CHECK_ADDRESS_IS_MINE_COMPLETED = 'CHECK_ADDRESS_IS_MINE_COMPLETED';
export const SEND_TRANSACTION_STARTED = 'SEND_TRANSACTION_STARTED';
export const SEND_TRANSACTION_COMPLETED = 'SEND_TRANSACTION_COMPLETED';
export const SEND_TRANSACTION_FAILED = 'SEND_TRANSACTION_FAILED';
export const SUPPORT_TRANSACTION_STARTED = 'SUPPORT_TRANSACTION_STARTED';
export const SUPPORT_TRANSACTION_COMPLETED = 'SUPPORT_TRANSACTION_COMPLETED';
export const SUPPORT_TRANSACTION_FAILED = 'SUPPORT_TRANSACTION_FAILED';
export const FETCH_TXO_PAGE_STARTED = 'FETCH_TXO_PAGE_STARTED';
export const FETCH_TXO_PAGE_COMPLETED = 'FETCH_TXO_PAGE_COMPLETED';
export const FETCH_TXO_PAGE_FAILED = 'FETCH_TXO_PAGE_FAILED';
export const UPDATE_TXO_FETCH_PARAMS = 'UPDATE_TXO_FETCH_PARAMS';
export const FETCH_SUPPORTS_STARTED = 'FETCH_SUPPORTS_STARTED';
export const FETCH_SUPPORTS_COMPLETED = 'FETCH_SUPPORTS_COMPLETED';
export const ABANDON_SUPPORT_STARTED = 'ABANDON_SUPPORT_STARTED';
export const ABANDON_SUPPORT_COMPLETED = 'ABANDON_SUPPORT_COMPLETED';
export const ABANDON_CLAIM_SUPPORT_STARTED = 'ABANDON_CLAIM_SUPPORT_STARTED';
export const ABANDON_CLAIM_SUPPORT_COMPLETED = 'ABANDON_CLAIM_SUPPORT_COMPLETED';
export const ABANDON_CLAIM_SUPPORT_FAILED = 'ABANDON_CLAIM_SUPPORT_FAILED';
export const ABANDON_CLAIM_SUPPORT_PREVIEW = 'ABANDON_CLAIM_SUPPORT_PREVIEW';
export const PENDING_SUPPORTS_UPDATED = 'PENDING_SUPPORTS_UPDATED';
export const UPDATE_TOTAL_BALANCE = 'UPDATE_TOTAL_BALANCE';
export const CLEAR_SUPPORT_TRANSACTION = 'CLEAR_SUPPORT_TRANSACTION';
export const WALLET_ENCRYPT_START = 'WALLET_ENCRYPT_START';
export const WALLET_ENCRYPT_COMPLETED = 'WALLET_ENCRYPT_COMPLETED';
export const WALLET_ENCRYPT_FAILED = 'WALLET_ENCRYPT_FAILED';
export const WALLET_UNLOCK_START = 'WALLET_UNLOCK_START';
export const WALLET_UNLOCK_COMPLETED = 'WALLET_UNLOCK_COMPLETED';
export const WALLET_UNLOCK_FAILED = 'WALLET_UNLOCK_FAILED';
export const WALLET_DECRYPT_START = 'WALLET_DECRYPT_START';
export const WALLET_DECRYPT_COMPLETED = 'WALLET_DECRYPT_COMPLETED';
export const WALLET_DECRYPT_FAILED = 'WALLET_DECRYPT_FAILED';
export const WALLET_LOCK_START = 'WALLET_LOCK_START';
export const WALLET_LOCK_COMPLETED = 'WALLET_LOCK_COMPLETED';
export const WALLET_LOCK_FAILED = 'WALLET_LOCK_FAILED';
export const WALLET_STATUS_START = 'WALLET_STATUS_START';
export const WALLET_STATUS_COMPLETED = 'WALLET_STATUS_COMPLETED';
export const WALLET_RESTART = 'WALLET_RESTART';
export const WALLET_RESTART_COMPLETED = 'WALLET_RESTART_COMPLETED';
export const SET_TRANSACTION_LIST_FILTER = 'SET_TRANSACTION_LIST_FILTER';
export const UPDATE_CURRENT_HEIGHT = 'UPDATE_CURRENT_HEIGHT';
export const SET_DRAFT_TRANSACTION_AMOUNT = 'SET_DRAFT_TRANSACTION_AMOUNT';
export const SET_DRAFT_TRANSACTION_ADDRESS = 'SET_DRAFT_TRANSACTION_ADDRESS';
export const FETCH_UTXO_COUNT_STARTED = 'FETCH_UTXO_COUNT_STARTED';
export const FETCH_UTXO_COUNT_COMPLETED = 'FETCH_UTXO_COUNT_COMPLETED';
export const FETCH_UTXO_COUNT_FAILED = 'FETCH_UTXO_COUNT_FAILED';
export const TIP_CLAIM_MASS_STARTED = 'TIP_CLAIM_MASS_STARTED';
export const TIP_CLAIM_MASS_COMPLETED = 'TIP_CLAIM_MASS_COMPLETED';
export const TIP_CLAIM_MASS_FAILED = 'TIP_CLAIM_MASS_FAILED';
export const DO_UTXO_CONSOLIDATE_STARTED = 'DO_UTXO_CONSOLIDATE_STARTED';
export const DO_UTXO_CONSOLIDATE_COMPLETED = 'DO_UTXO_CONSOLIDATE_COMPLETED';
export const DO_UTXO_CONSOLIDATE_FAILED = 'DO_UTXO_CONSOLIDATE_FAILED';
export const PENDING_CONSOLIDATED_TXOS_UPDATED = 'PENDING_CONSOLIDATED_TXOS_UPDATED';

// Claims
export const FETCH_FEATURED_CONTENT_STARTED = 'FETCH_FEATURED_CONTENT_STARTED';
export const FETCH_FEATURED_CONTENT_COMPLETED = 'FETCH_FEATURED_CONTENT_COMPLETED';
export const RESOLVE_URIS_STARTED = 'RESOLVE_URIS_STARTED';
export const RESOLVE_URIS_COMPLETED = 'RESOLVE_URIS_COMPLETED';
export const FETCH_CHANNEL_CLAIMS_STARTED = 'FETCH_CHANNEL_CLAIMS_STARTED';
export const FETCH_CHANNEL_CLAIMS_COMPLETED = 'FETCH_CHANNEL_CLAIMS_COMPLETED';
export const FETCH_CHANNEL_CLAIM_COUNT_STARTED = 'FETCH_CHANNEL_CLAIM_COUNT_STARTED';
export const FETCH_CLAIM_LIST_MINE_STARTED = 'FETCH_CLAIM_LIST_MINE_STARTED';
export const FETCH_CLAIM_LIST_MINE_COMPLETED = 'FETCH_CLAIM_LIST_MINE_COMPLETED';
export const ABANDON_CLAIM_STARTED = 'ABANDON_CLAIM_STARTED';
export const ABANDON_CLAIM_SUCCEEDED = 'ABANDON_CLAIM_SUCCEEDED';
export const FETCH_CHANNEL_LIST_STARTED = 'FETCH_CHANNEL_LIST_STARTED';
export const FETCH_CHANNEL_LIST_COMPLETED = 'FETCH_CHANNEL_LIST_COMPLETED';
export const CREATE_CHANNEL_STARTED = 'CREATE_CHANNEL_STARTED';
export const CREATE_CHANNEL_COMPLETED = 'CREATE_CHANNEL_COMPLETED';
export const SET_PRIMARY_URI = 'SET_PRIMARY_URI';
export const SET_PLAYING_URI = 'SET_PLAYING_URI';
export const SET_CONTENT_POSITION = 'SET_CONTENT_POSITION';
export const CLEAR_CONTENT_POSITION = 'CLEAR_CONTENT_POSITION';
export const SET_CONTENT_LAST_VIEWED = 'SET_CONTENT_LAST_VIEWED';
export const CLEAR_CONTENT_HISTORY_URI = 'CLEAR_CONTENT_HISTORY_URI';
export const CLEAR_CONTENT_HISTORY_ALL = 'CLEAR_CONTENT_HISTORY_ALL';
export const RECOMMENDATION_UPDATED = 'RECOMMENDATION_UPDATED';
export const RECOMMENDATION_CLICKED = 'RECOMMENDATION_CLICKED';
export const TOGGLE_LOOP_LIST = 'TOGGLE_LOOP_LIST';
export const TOGGLE_SHUFFLE_LIST = 'TOGGLE_SHUFFLE_LIST';
export const FETCH_CHANNEL_LIST_FAILED = 'FETCH_CHANNEL_LIST_FAILED';
export const FETCH_COLLECTION_LIST_STARTED = 'FETCH_COLLECTION_LIST_STARTED';
export const FETCH_COLLECTION_LIST_COMPLETED = 'FETCH_COLLECTION_LIST_COMPLETED';
export const FETCH_COLLECTION_LIST_FAILED = 'FETCH_COLLECTION_LIST_FAILED';
export const CREATE_CHANNEL_FAILED = 'CREATE_CHANNEL_FAILED';
export const UPDATE_CHANNEL_STARTED = 'UPDATE_CHANNEL_STARTED';
export const UPDATE_CHANNEL_COMPLETED = 'UPDATE_CHANNEL_COMPLETED';
export const UPDATE_CHANNEL_FAILED = 'UPDATE_CHANNEL_FAILED';
export const IMPORT_CHANNEL_STARTED = 'IMPORT_CHANNEL_STARTED';
export const IMPORT_CHANNEL_COMPLETED = 'IMPORT_CHANNEL_COMPLETED';
export const IMPORT_CHANNEL_FAILED = 'IMPORT_CHANNEL_FAILED';
export const CLEAR_CHANNEL_ERRORS = 'CLEAR_CHANNEL_ERRORS';
export const CLEAR_CLAIM_SEARCH_HISTORY = 'CLEAR_CLAIM_SEARCH_HISTORY';
export const CLAIM_SEARCH_STARTED = 'CLAIM_SEARCH_STARTED';
export const CLAIM_SEARCH_COMPLETED = 'CLAIM_SEARCH_COMPLETED';
export const CLAIM_SEARCH_FAILED = 'CLAIM_SEARCH_FAILED';
export const CLAIM_SEARCH_BY_TAGS_STARTED = 'CLAIM_SEARCH_BY_TAGS_STARTED';
export const CLAIM_SEARCH_BY_TAGS_COMPLETED = 'CLAIM_SEARCH_BY_TAGS_COMPLETED';
export const CLAIM_SEARCH_BY_TAGS_FAILED = 'CLAIM_SEARCH_BY_TAGS_FAILED';
export const CLAIM_REPOST_STARTED = 'CLAIM_REPOST_STARTED';
export const CLAIM_REPOST_COMPLETED = 'CLAIM_REPOST_COMPLETED';
export const CLAIM_REPOST_FAILED = 'CLAIM_REPOST_FAILED';
export const CLEAR_REPOST_ERROR = 'CLEAR_REPOST_ERROR';
export const CHECK_PUBLISH_NAME_STARTED = 'CHECK_PUBLISH_NAME_STARTED';
export const CHECK_PUBLISH_NAME_COMPLETED = 'CHECK_PUBLISH_NAME_COMPLETED';
export const UPDATE_PENDING_CLAIMS = 'UPDATE_PENDING_CLAIMS';
export const UPDATE_CONFIRMED_CLAIMS = 'UPDATE_CONFIRMED_CLAIMS';
export const ADD_FILES_REFLECTING = 'ADD_FILES_REFLECTING';
export const UPDATE_FILES_REFLECTING = 'UPDATE_FILES_REFLECTING';
export const TOGGLE_CHECKING_REFLECTING = 'TOGGLE_CHECKING_REFLECTING';
export const TOGGLE_CHECKING_PENDING = 'TOGGLE_CHECKING_PENDING';
export const PURCHASE_LIST_STARTED = 'PURCHASE_LIST_STARTED';
export const PURCHASE_LIST_COMPLETED = 'PURCHASE_LIST_COMPLETED';
export const PURCHASE_LIST_FAILED = 'PURCHASE_LIST_FAILED';
export const COLLECTION_PUBLISH_STARTED = 'COLLECTION_PUBLISH_STARTED';
export const COLLECTION_PUBLISH_COMPLETED = 'COLLECTION_PUBLISH_COMPLETED';
export const COLLECTION_PUBLISH_FAILED = 'COLLECTION_PUBLISH_FAILED';
export const COLLECTION_PUBLISH_UPDATE_STARTED = 'COLLECTION_PUBLISH_UPDATE_STARTED';
export const COLLECTION_PUBLISH_UPDATE_COMPLETED = 'COLLECTION_PUBLISH_UPDATE_COMPLETED';
export const COLLECTION_PUBLISH_UPDATE_FAILED = 'COLLECTION_PUBLISH_UPDATE_FAILED';
export const COLLECTION_PUBLISH_ABANDON_STARTED = 'COLLECTION_PUBLISH_ABANDON_STARTED';
export const COLLECTION_PUBLISH_ABANDON_COMPLETED = 'COLLECTION_PUBLISH_ABANDON_COMPLETED';
export const COLLECTION_PUBLISH_ABANDON_FAILED = 'COLLECTION_PUBLISH_ABANDON_FAILED';
export const CLEAR_COLLECTION_ERRORS = 'CLEAR_COLLECTION_ERRORS';
export const COLLECTION_ITEMS_RESOLVE_STARTED = 'COLLECTION_ITEMS_RESOLVE_STARTED';
export const COLLECTION_ITEMS_RESOLVE_COMPLETED = 'COLLECTION_ITEMS_RESOLVE_COMPLETED';
export const COLLECTION_ITEMS_RESOLVE_FAILED = 'COLLECTION_ITEMS_RESOLVE_FAILED';
export const COLLECTION_NEW = 'COLLECTION_NEW';
export const COLLECTION_DELETE = 'COLLECTION_DELETE';
export const COLLECTION_PENDING = 'COLLECTION_PENDING';
export const COLLECTION_EDIT = 'COLLECTION_EDIT';
export const COLLECTION_COPY = 'COLLECTION_COPY';
export const COLLECTION_SAVE = 'COLLECTION_SAVE';
export const COLLECTION_ERROR = 'COLLECTION_ERROR';

// Files
export const FILE_LIST_STARTED = 'FILE_LIST_STARTED';
export const FILE_LIST_SUCCEEDED = 'FILE_LIST_SUCCEEDED';
export const FETCH_FILE_INFO_STARTED = 'FETCH_FILE_INFO_STARTED';
export const FETCH_FILE_INFO_COMPLETED = 'FETCH_FILE_INFO_COMPLETED';
export const FETCH_COST_INFO_STARTED = 'FETCH_COST_INFO_STARTED';
export const FETCH_COST_INFO_COMPLETED = 'FETCH_COST_INFO_COMPLETED';
export const LOADING_VIDEO_STARTED = 'LOADING_VIDEO_STARTED';
export const LOADING_VIDEO_COMPLETED = 'LOADING_VIDEO_COMPLETED';
export const LOADING_VIDEO_FAILED = 'LOADING_VIDEO_FAILED';
export const DOWNLOADING_STARTED = 'DOWNLOADING_STARTED';
export const DOWNLOADING_PROGRESSED = 'DOWNLOADING_PROGRESSED';
export const DOWNLOADING_COMPLETED = 'DOWNLOADING_COMPLETED';
export const PLAY_VIDEO_STARTED = 'PLAY_VIDEO_STARTED';
export const FETCH_AVAILABILITY_STARTED = 'FETCH_AVAILABILITY_STARTED';
export const FETCH_AVAILABILITY_COMPLETED = 'FETCH_AVAILABILITY_COMPLETED';
export const FILE_DELETE = 'FILE_DELETE';
export const FETCH_FILE_INFO_FAILED = 'FETCH_FILE_INFO_FAILED';
export const DOWNLOADING_CANCELED = 'DOWNLOADING_CANCELED';
export const SET_FILE_LIST_SORT = 'SET_FILE_LIST_SORT';
export const PURCHASE_URI_STARTED = 'PURCHASE_URI_STARTED';
export const PURCHASE_URI_COMPLETED = 'PURCHASE_URI_COMPLETED';
export const PURCHASE_URI_FAILED = 'PURCHASE_URI_FAILED';
export const CLEAR_PURCHASED_URI_SUCCESS = 'CLEAR_PURCHASED_URI_SUCCESS';

// Search
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAIL = 'SEARCH_FAIL';
export const UPDATE_SEARCH_OPTIONS = 'UPDATE_SEARCH_OPTIONS';
export const UPDATE_SEARCH_SUGGESTIONS = 'UPDATE_SEARCH_SUGGESTIONS';
export const SET_MENTION_SEARCH_RESULTS = 'SET_MENTION_SEARCH_RESULTS';

// Settings
export const DAEMON_SETTINGS_RECEIVED = 'DAEMON_SETTINGS_RECEIVED';
export const CLIENT_SETTING_CHANGED = 'CLIENT_SETTING_CHANGED';
export const UPDATE_IS_NIGHT = 'UPDATE_IS_NIGHT';
export const FINDING_FFMPEG_STARTED = 'FINDING_FFMPEG_STARTED';
export const FINDING_FFMPEG_COMPLETED = 'FINDING_FFMPEG_COMPLETED';
export const SYNC_CLIENT_SETTINGS = 'SYNC_CLIENT_SETTINGS';
export const DAEMON_STATUS_RECEIVED = 'DAEMON_STATUS_RECEIVED';
export const SHARED_PREFERENCE_SET = 'SHARED_PREFERENCE_SET';
export const SAVE_CUSTOM_WALLET_SERVERS = 'SAVE_CUSTOM_WALLET_SERVERS';

// User
export const AUTHENTICATION_STARTED = 'AUTHENTICATION_STARTED';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';
export const USER_EMAIL_DECLINE = 'USER_EMAIL_DECLINE';
export const USER_EMAIL_NEW_STARTED = 'USER_EMAIL_NEW_STARTED';
export const USER_EMAIL_NEW_SUCCESS = 'USER_EMAIL_NEW_SUCCESS';
export const USER_EMAIL_NEW_EXISTS = 'USER_EMAIL_NEW_EXISTS';
export const USER_EMAIL_NEW_DOES_NOT_EXIST = 'USER_EMAIL_NEW_DOES_NOT_EXIST';
export const USER_EMAIL_NEW_FAILURE = 'USER_EMAIL_NEW_FAILURE';
export const USER_EMAIL_NEW_CLEAR_ENTRY = 'USER_EMAIL_NEW_CLEAR_ENTRY';
export const USER_EMAIL_VERIFY_SET = 'USER_EMAIL_VERIFY_SET';
export const USER_EMAIL_VERIFY_STARTED = 'USER_EMAIL_VERIFY_STARTED';
export const USER_EMAIL_VERIFY_SUCCESS = 'USER_EMAIL_VERIFY_SUCCESS';
export const USER_EMAIL_VERIFY_FAILURE = 'USER_EMAIL_VERIFY_FAILURE';
export const USER_EMAIL_VERIFY_RETRY_STARTED = 'USER_EMAIL_VERIFY_RETRY_STARTED';
export const USER_EMAIL_VERIFY_RETRY_FAILURE = 'USER_EMAIL_VERIFY_RETRY_FAILURE';
export const USER_EMAIL_VERIFY_RETRY_SUCCESS = 'USER_EMAIL_VERIFY_RETRY_SUCCESS';
export const USER_PASSWORD_EXISTS = 'USER_PASSWORD_EXISTS';
export const USER_PASSWORD_RESET_STARTED = 'USER_PASSWORD_RESET_STARTED';
export const USER_PASSWORD_RESET_SUCCESS = 'USER_PASSWORD_RESET_SUCCESS';
export const USER_PASSWORD_RESET_FAILURE = 'USER_PASSWORD_RESET_FAILURE';
export const USER_PASSWORD_SET_STARTED = 'USER_PASSWORD_SET_STARTED';
export const USER_PASSWORD_SET_SUCCESS = 'USER_PASSWORD_SET_SUCCESS';
export const USER_PASSWORD_SET_FAILURE = 'USER_PASSWORD_SET_FAILURE';
export const USER_PASSWORD_SET_CLEAR = 'USER_PASSWORD_SET_CLEAR';
export const USER_PHONE_RESET = 'USER_PHONE_RESET';
export const USER_PHONE_NEW_STARTED = 'USER_PHONE_NEW_STARTED';
export const USER_PHONE_NEW_SUCCESS = 'USER_PHONE_NEW_SUCCESS';
export const USER_PHONE_NEW_FAILURE = 'USER_PHONE_NEW_FAILURE';
export const USER_PHONE_VERIFY_STARTED = 'USER_PHONE_VERIFY_STARTED';
export const USER_PHONE_VERIFY_SUCCESS = 'USER_PHONE_VERIFY_SUCCESS';
export const USER_PHONE_VERIFY_FAILURE = 'USER_PHONE_VERIFY_FAILURE';
export const USER_IDENTITY_VERIFY_STARTED = 'USER_IDENTITY_VERIFY_STARTED';
export const USER_IDENTITY_VERIFY_SUCCESS = 'USER_IDENTITY_VERIFY_SUCCESS';
export const USER_IDENTITY_VERIFY_FAILURE = 'USER_IDENTITY_VERIFY_FAILURE';
export const USER_FETCH_STARTED = 'USER_FETCH_STARTED';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';
export const USER_INVITE_STATUS_FETCH_STARTED = 'USER_INVITE_STATUS_FETCH_STARTED';
export const USER_INVITE_STATUS_FETCH_SUCCESS = 'USER_INVITE_STATUS_FETCH_SUCCESS';
export const USER_INVITE_STATUS_FETCH_FAILURE = 'USER_INVITE_STATUS_FETCH_FAILURE';
export const USER_INVITE_NEW_STARTED = 'USER_INVITE_NEW_STARTED';
export const USER_INVITE_NEW_SUCCESS = 'USER_INVITE_NEW_SUCCESS';
export const USER_INVITE_NEW_FAILURE = 'USER_INVITE_NEW_FAILURE';
export const USER_YOUTUBE_IMPORT_STARTED = 'USER_YOUTUBE_IMPORT_STARTED';
export const USER_YOUTUBE_IMPORT_FAILURE = 'USER_YOUTUBE_IMPORT_FAILURE';
export const USER_YOUTUBE_IMPORT_SUCCESS = 'USER_YOUTUBE_IMPORT_SUCCESS';
export const USER_SET_REFERRER_STARTED = 'USER_SET_REFERRER_STARTED';
export const USER_SET_REFERRER_SUCCESS = 'USER_SET_REFERRER_SUCCESS';
export const USER_SET_REFERRER_FAILURE = 'USER_SET_REFERRER_FAILURE';
export const USER_SET_REFERRER_RESET = 'USER_SET_REFERRER_RESET';
export const USER_EMAIL_VERIFY_RETRY = 'USER_EMAIL_VERIFY_RETRY';

// Rewards
export const FETCH_REWARDS_STARTED = 'FETCH_REWARDS_STARTED';
export const FETCH_REWARDS_COMPLETED = 'FETCH_REWARDS_COMPLETED';
export const CLAIM_REWARD_STARTED = 'CLAIM_REWARD_STARTED';
export const CLAIM_REWARD_SUCCESS = 'CLAIM_REWARD_SUCCESS';
export const CLAIM_REWARD_FAILURE = 'CLAIM_REWARD_FAILURE';
export const CLAIM_REWARD_CLEAR_ERROR = 'CLAIM_REWARD_CLEAR_ERROR';
export const FETCH_REWARD_CONTENT_COMPLETED = 'FETCH_REWARD_CONTENT_COMPLETED';

// Language
export const DOWNLOAD_LANGUAGE_SUCCESS = 'DOWNLOAD_LANGUAGE_SUCCESS';
export const DOWNLOAD_LANGUAGE_FAILURE = 'DOWNLOAD_LANGUAGE_FAILURE';
export const FETCH_HOMEPAGES_DONE = 'FETCH_HOMEPAGES_DONE';
export const FETCH_HOMEPAGES_FAILED = 'FETCH_HOMEPAGES_FAILED';

// Subscriptions
export const CHANNEL_SUBSCRIBE = 'CHANNEL_SUBSCRIBE';
export const CHANNEL_UNSUBSCRIBE = 'CHANNEL_UNSUBSCRIBE';
export const HAS_FETCHED_SUBSCRIPTIONS = 'HAS_FETCHED_SUBSCRIPTIONS';
export const CHECK_SUBSCRIPTION_STARTED = 'CHECK_SUBSCRIPTION_STARTED';
export const CHECK_SUBSCRIPTION_COMPLETED = 'CHECK_SUBSCRIPTION_COMPLETED';
export const CHECK_SUBSCRIPTIONS_SUBSCRIBE = 'CHECK_SUBSCRIPTIONS_SUBSCRIBE';
export const FETCH_SUBSCRIPTIONS_START = 'FETCH_SUBSCRIPTIONS_START';
export const FETCH_SUBSCRIPTIONS_FAIL = 'FETCH_SUBSCRIPTIONS_FAIL';
export const FETCH_SUBSCRIPTIONS_SUCCESS = 'FETCH_SUBSCRIPTIONS_SUCCESS';
export const SET_VIEW_MODE = 'SET_VIEW_MODE';

// Publishing
export const CLEAR_PUBLISH = 'CLEAR_PUBLISH';
export const UPDATE_PUBLISH_FORM = 'UPDATE_PUBLISH_FORM';
export const PUBLISH_START = 'PUBLISH_START';
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS';
export const PUBLISH_FAIL = 'PUBLISH_FAIL';
export const CLEAR_PUBLISH_ERROR = 'CLEAR_PUBLISH_ERROR';
export const REMOVE_PENDING_PUBLISH = 'REMOVE_PENDING_PUBLISH';
export const DO_PREPARE_EDIT = 'DO_PREPARE_EDIT';
export const UPDATE_UPLOAD_ADD = 'UPDATE_UPLOAD_ADD';
export const UPDATE_UPLOAD_PROGRESS = 'UPDATE_UPLOAD_PROGRESS';
export const UPDATE_UPLOAD_REMOVE = 'UPDATE_UPLOAD_REMOVE';

// Media
export const MEDIA_PLAY = 'MEDIA_PLAY';
export const MEDIA_PAUSE = 'MEDIA_PAUSE';

// Notifications
export const NOTIFICATION_LIST_STARTED = 'NOTIFICATION_LIST_STARTED';
export const NOTIFICATION_LIST_COMPLETED = 'NOTIFICATION_LIST_COMPLETED';
export const NOTIFICATION_LIST_FAILED = 'NOTIFICATION_LIST_FAILED';
export const NOTIFICATION_CATEGORIES_COMPLETED = 'NOTIFICATION_CATEGORIES_COMPLETED';
export const NOTIFICATION_READ_STARTED = 'NOTIFICATION_READ_STARTED';
export const NOTIFICATION_READ_COMPLETED = 'NOTIFICATION_READ_COMPLETED';
export const NOTIFICATION_READ_FAILED = 'NOTIFICATION_READ_FAILED';
export const NOTIFICATION_SEEN_STARTED = 'NOTIFICATION_SEEN_STARTED';
export const NOTIFICATION_SEEN_COMPLETED = 'NOTIFICATION_SEEN_COMPLETED';
export const NOTIFICATION_SEEN_FAILED = 'NOTIFICATION_SEEN_FAILED';
export const NOTIFICATION_DELETE_STARTED = 'NOTIFICATION_DELETE_STARTED';
export const NOTIFICATION_DELETE_COMPLETED = 'NOTIFICATION_DELETE_COMPLETED';
export const NOTIFICATION_DELETE_FAILED = 'NOTIFICATION_DELETE_FAILED';
export const CREATE_TOAST = 'CREATE_TOAST';
export const DISMISS_TOAST = 'DISMISS_TOAST';
export const CREATE_ERROR = 'CREATE_ERROR';
export const DISMISS_ERROR = 'DISMISS_ERROR';
export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';
export const EDIT_NOTIFICATION = 'EDIT_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';
export const FETCH_DATE = 'FETCH_DATE';

// Comments
export const COMMENT_LIST_STARTED = 'COMMENT_LIST_STARTED';
export const COMMENT_LIST_COMPLETED = 'COMMENT_LIST_COMPLETED';
export const COMMENT_LIST_FAILED = 'COMMENT_LIST_FAILED';
export const COMMENT_LIST_RESET = 'COMMENT_LIST_RESET';
export const COMMENT_BY_ID_STARTED = 'COMMENT_BY_ID_STARTED';
export const COMMENT_BY_ID_COMPLETED = 'COMMENT_BY_ID_COMPLETED';
export const COMMENT_CREATE_STARTED = 'COMMENT_CREATE_STARTED';
export const COMMENT_CREATE_COMPLETED = 'COMMENT_CREATE_COMPLETED';
export const COMMENT_CREATE_FAILED = 'COMMENT_CREATE_FAILED';
export const COMMENT_ABANDON_STARTED = 'COMMENT_ABANDON_STARTED';
export const COMMENT_ABANDON_COMPLETED = 'COMMENT_ABANDON_COMPLETED';
export const COMMENT_ABANDON_FAILED = 'COMMENT_ABANDON_FAILED';
export const COMMENT_UPDATE_STARTED = 'COMMENT_UPDATE_STARTED';
export const COMMENT_UPDATE_COMPLETED = 'COMMENT_UPDATE_COMPLETED';
export const COMMENT_UPDATE_FAILED = 'COMMENT_UPDATE_FAILED';
export const COMMENT_HIDE_STARTED = 'COMMENT_HIDE_STARTED';
export const COMMENT_HIDE_COMPLETED = 'COMMENT_HIDE_COMPLETED';
export const COMMENT_HIDE_FAILED = 'COMMENT_HIDE_FAILED';
export const COMMENT_REACTION_LIST_STARTED = 'COMMENT_REACTION_LIST_STARTED';
export const COMMENT_REACTION_LIST_COMPLETED = 'COMMENT_REACTION_LIST_COMPLETED';
export const COMMENT_REACTION_LIST_FAILED = 'COMMENT_REACTION_LIST_FAILED';
export const COMMENT_REACT_STARTED = 'COMMENT_REACT_STARTED';
export const COMMENT_REACT_COMPLETED = 'COMMENT_REACT_COMPLETED';
export const COMMENT_REACT_FAILED = 'COMMENT_REACT_FAILED';
export const COMMENT_PIN_STARTED = 'COMMENT_PIN_STARTED';
export const COMMENT_PIN_COMPLETED = 'COMMENT_PIN_COMPLETED';
export const COMMENT_PIN_FAILED = 'COMMENT_PIN_FAILED';
export const COMMENT_MARK_AS_REMOVED = 'COMMENT_MARK_AS_REMOVED';
export const COMMENT_MODERATION_BLOCK_LIST_STARTED = 'COMMENT_MODERATION_BLOCK_LIST_STARTED';
export const COMMENT_MODERATION_BLOCK_LIST_COMPLETED = 'COMMENT_MODERATION_BLOCK_LIST_COMPLETED';
export const COMMENT_MODERATION_BLOCK_LIST_FAILED = 'COMMENT_MODERATION_BLOCK_LIST_FAILED';
export const COMMENT_MODERATION_BLOCK_STARTED = 'COMMENT_MODERATION_BLOCK_STARTED';
export const COMMENT_MODERATION_BLOCK_COMPLETE = 'COMMENT_MODERATION_BLOCK_COMPLETE';
export const COMMENT_MODERATION_BLOCK_FAILED = 'COMMENT_MODERATION_BLOCK_FAILED';
export const COMMENT_MODERATION_UN_BLOCK_STARTED = 'COMMENT_MODERATION_UN_BLOCK_STARTED';
export const COMMENT_MODERATION_UN_BLOCK_COMPLETE = 'COMMENT_MODERATION_UN_BLOCK_COMPLETE';
export const COMMENT_MODERATION_UN_BLOCK_FAILED = 'COMMENT_MODERATION_UN_BLOCK_FAILED';
export const COMMENT_FETCH_MODERATION_DELEGATES_STARTED = 'COMMENT_FETCH_MODERATION_DELEGATES_STARTED';
export const COMMENT_FETCH_MODERATION_DELEGATES_FAILED = 'COMMENT_FETCH_MODERATION_DELEGATES_FAILED';
export const COMMENT_FETCH_MODERATION_DELEGATES_COMPLETED = 'COMMENT_FETCH_MODERATION_DELEGATES_COMPLETED';
export const COMMENT_MODERATION_AM_I_LIST_STARTED = 'COMMENT_MODERATION_AM_I_LIST_STARTED';
export const COMMENT_MODERATION_AM_I_LIST_FAILED = 'COMMENT_MODERATION_AM_I_LIST_FAILED';
export const COMMENT_MODERATION_AM_I_LIST_COMPLETED = 'COMMENT_MODERATION_AM_I_LIST_COMPLETED';
export const COMMENT_FETCH_SETTINGS_STARTED = 'COMMENT_FETCH_SETTINGS_STARTED';
export const COMMENT_FETCH_SETTINGS_FAILED = 'COMMENT_FETCH_SETTINGS_FAILED';
export const COMMENT_FETCH_SETTINGS_COMPLETED = 'COMMENT_FETCH_SETTINGS_COMPLETED';
export const COMMENT_FETCH_BLOCKED_WORDS_STARTED = 'COMMENT_FETCH_BLOCKED_WORDS_STARTED';
export const COMMENT_FETCH_BLOCKED_WORDS_FAILED = 'COMMENT_FETCH_BLOCKED_WORDS_FAILED';
export const COMMENT_FETCH_BLOCKED_WORDS_COMPLETED = 'COMMENT_FETCH_BLOCKED_WORDS_COMPLETED';
export const COMMENT_RECEIVED = 'COMMENT_RECEIVED';
export const COMMENT_SUPER_CHAT_LIST_STARTED = 'COMMENT_SUPER_CHAT_LIST_STARTED';
export const COMMENT_SUPER_CHAT_LIST_COMPLETED = 'COMMENT_SUPER_CHAT_LIST_COMPLETED';
export const COMMENT_SUPER_CHAT_LIST_FAILED = 'COMMENT_SUPER_CHAT_LIST_FAILED';

// Blocked channels
export const TOGGLE_BLOCK_CHANNEL = 'TOGGLE_BLOCK_CHANNEL';

// Coin swap
export const ADD_COIN_SWAP = 'ADD_COIN_SWAP';
export const REMOVE_COIN_SWAP = 'REMOVE_COIN_SWAP';
export const COIN_SWAP_STATUS_RECEIVED = 'COIN_SWAP_STATUS_RECEIVED';

// Tags
export const TOGGLE_TAG_FOLLOW = 'TOGGLE_TAG_FOLLOW';
export const TAG_ADD = 'TAG_ADD';
export const TAG_DELETE = 'TAG_DELETE';

// Notifications
export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';

// Cross-device Sync
export const GET_SYNC_STARTED = 'GET_SYNC_STARTED';
export const GET_SYNC_COMPLETED = 'GET_SYNC_COMPLETED';
export const GET_SYNC_FAILED = 'GET_SYNC_FAILED';
export const SET_SYNC_STARTED = 'SET_SYNC_STARTED';
export const SET_SYNC_FAILED = 'SET_SYNC_FAILED';
export const SET_SYNC_COMPLETED = 'SET_SYNC_COMPLETED';
export const SET_PREFS_READY = 'SET_PREFS_READY';
export const SET_DEFAULT_ACCOUNT = 'SET_DEFAULT_ACCOUNT';
export const SYNC_APPLY_STARTED = 'SYNC_APPLY_STARTED';
export const SYNC_APPLY_COMPLETED = 'SYNC_APPLY_COMPLETED';
export const SYNC_APPLY_FAILED = 'SYNC_APPLY_FAILED';
export const SYNC_APPLY_BAD_PASSWORD = 'SYNC_APPLY_BAD_PASSWORD';
export const SYNC_RESET = 'SYNC_RESET';
export const SYNC_FATAL_ERROR = 'SYNC_FATAL_ERROR';
export const USER_STATE_POPULATE = 'USER_STATE_POPULATE';
export const SHARED_STATE_SYNC_ID_CHANGED = 'SHARED_STATE_SYNC_ID_CHANGED';

export const REACTIONS_LIST_STARTED = 'REACTIONS_LIST_STARTED';
export const REACTIONS_LIST_FAILED = 'REACTIONS_LIST_FAILED';
export const REACTIONS_LIST_COMPLETED = 'REACTIONS_LIST_COMPLETED';
export const REACTIONS_NEW_STARTED = 'REACTIONS_NEW_STARTED';
export const REACTIONS_NEW_FAILED = 'REACTIONS_NEW_FAILED';
export const REACTIONS_LIKE_COMPLETED = 'REACTIONS_LIKE_COMPLETED';
export const REACTIONS_DISLIKE_COMPLETED = 'REACTIONS_DISLIKE_COMPLETED';

// Report Content
export const REPORT_CONTENT_STARTED = 'REPORT_CONTENT_STARTED';
export const REPORT_CONTENT_COMPLETED = 'REPORT_CONTENT_COMPLETED';
export const REPORT_CONTENT_FAILED = 'REPORT_CONTENT_FAILED';

// Livestream
export const FETCH_NO_SOURCE_CLAIMS_STARTED = 'FETCH_NO_SOURCE_CLAIMS_STARTED';
export const FETCH_NO_SOURCE_CLAIMS_COMPLETED = 'FETCH_NO_SOURCE_CLAIMS_COMPLETED';
export const FETCH_NO_SOURCE_CLAIMS_FAILED = 'FETCH_NO_SOURCE_CLAIMS_FAILED';
export const VIEWERS_RECEIVED = 'VIEWERS_RECEIVED';
export const FETCH_ACTIVE_LIVESTREAMS_STARTED = 'FETCH_ACTIVE_LIVESTREAMS_STARTED';
export const FETCH_ACTIVE_LIVESTREAMS_FAILED = 'FETCH_ACTIVE_LIVESTREAMS_FAILED';
export const FETCH_ACTIVE_LIVESTREAMS_SKIPPED = 'FETCH_ACTIVE_LIVESTREAMS_SKIPPED';
export const FETCH_ACTIVE_LIVESTREAMS_COMPLETED = 'FETCH_ACTIVE_LIVESTREAMS_COMPLETED';

export const ADD_CHANNEL_TO_ACTIVE_LIVESTREAMS = 'ADD_CHANNEL_TO_ACTIVE_LIVESTREAMS';
export const REMOVE_CHANNEL_FROM_ACTIVE_LIVESTREAMS = 'REMOVE_CHANNEL_FROM_ACTIVE_LIVESTREAMS';

// Blacklist
export const FETCH_BLACK_LISTED_CONTENT_STARTED = 'FETCH_BLACK_LISTED_CONTENT_STARTED';
export const FETCH_BLACK_LISTED_CONTENT_COMPLETED = 'FETCH_BLACK_LISTED_CONTENT_COMPLETED';
export const FETCH_BLACK_LISTED_CONTENT_FAILED = 'FETCH_BLACK_LISTED_CONTENT_FAILED';
export const BLACK_LISTED_CONTENT_SUBSCRIBE = 'BLACK_LISTED_CONTENT_SUBSCRIBE';

// Filtered list
export const FETCH_FILTERED_CONTENT_STARTED = 'FETCH_FILTERED_CONTENT_STARTED';
export const FETCH_FILTERED_CONTENT_COMPLETED = 'FETCH_FILTERED_CONTENT_COMPLETED';
export const FETCH_FILTERED_CONTENT_FAILED = 'FETCH_FILTERED_CONTENT_FAILED';
export const FILTERED_CONTENT_SUBSCRIBE = 'FILTERED_CONTENT_SUBSCRIBE';

// Stats
export const FETCH_VIEW_COUNT_STARTED = 'FETCH_VIEW_COUNT_STARTED';
export const FETCH_VIEW_COUNT_FAILED = 'FETCH_VIEW_COUNT_FAILED';
export const FETCH_VIEW_COUNT_COMPLETED = 'FETCH_VIEW_COUNT_COMPLETED';
export const FETCH_SUB_COUNT_STARTED = 'FETCH_SUB_COUNT_STARTED';
export const FETCH_SUB_COUNT_FAILED = 'FETCH_SUB_COUNT_FAILED';
export const FETCH_SUB_COUNT_COMPLETED = 'FETCH_SUB_COUNT_COMPLETED';

// User
export const GENERATE_AUTH_TOKEN_FAILURE = 'GENERATE_AUTH_TOKEN_FAILURE';
export const GENERATE_AUTH_TOKEN_STARTED = 'GENERATE_AUTH_TOKEN_STARTED';
export const GENERATE_AUTH_TOKEN_SUCCESS = 'GENERATE_AUTH_TOKEN_SUCCESS';
