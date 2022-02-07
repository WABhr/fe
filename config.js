// On Web, this will find .env.defaults and optional .env in web/
// On Desktop App, this will find .env.defaults and optional .env in root dir
require('dotenv-defaults').config({ silent: false });

const config = {
  WEBPACK_WEB_PORT: process.env.WEBPACK_WEB_PORT,
  WEBPACK_ELECTRON_PORT: process.env.WEBPACK_ELECTRON_PORT,
  WEB_SERVER_PORT: process.env.WEB_SERVER_PORT,
  LBRY_WEB_API: process.env.LBRY_WEB_API, // api.na-backend.odysee.com',
  LBRY_WEB_PUBLISH_API: process.env.LBRY_WEB_PUBLISH_API,
  LBRY_WEB_PUBLISH_API_V2: process.env.LBRY_WEB_PUBLISH_API_V2,
  LBRY_API_URL: process.env.LBRY_API_URL, // api.lbry.com',
  LBRY_WEB_STREAMING_API: process.env.LBRY_WEB_STREAMING_API, // cdn.lbryplayer.xyz',
  LBRY_WEB_BUFFER_API: process.env.LBRY_WEB_BUFFER_API,
  SEARCH_SERVER_API: process.env.SEARCH_SERVER_API,
  SEARCH_SERVER_API_ALT: process.env.SEARCH_SERVER_API_ALT,
  COMMENT_SERVER_API: process.env.COMMENT_SERVER_API,
  SOCKETY_SERVER_API: process.env.SOCKETY_SERVER_API,
  WELCOME_VERSION: process.env.WELCOME_VERSION,
  DOMAIN: process.env.DOMAIN,
  SHARE_DOMAIN_URL: process.env.SHARE_DOMAIN_URL,
  URL: process.env.URL,
  RECSYS_ENDPOINT: process.env.RECSYS_ENDPOINT,
  THUMBNAIL_CDN_URL: process.env.THUMBNAIL_CDN_URL,
  THUMBNAIL_CARDS_CDN_URL: process.env.THUMBNAIL_CARDS_CDN_URL,
  THUMBNAIL_HEIGHT: process.env.THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH: process.env.THUMBNAIL_WIDTH,
  THUMBNAIL_QUALITY: process.env.THUMBNAIL_QUALITY,
  THUMBNAIL_CDN_SIZE_LIMIT_BYTES: process.env.THUMBNAIL_CDN_SIZE_LIMIT_BYTES,
  SITE_TITLE: process.env.SITE_TITLE,
  SITE_NAME: process.env.SITE_NAME,
  SITE_DESCRIPTION: process.env.SITE_DESCRIPTION,
  SITE_HELP_EMAIL: process.env.SITE_HELP_EMAIL,
  // SOCIAL MEDIA
  TWITTER_ACCOUNT: process.env.TWITTER_ACCOUNT,
  // LOGO
  LOGO_TITLE: process.env.LOGO_TITLE,
  LOGO: process.env.LOGO,
  LOGO_WHITE_TEXT: process.env.LOGO_WHITE_TEXT,
  LOGO_DARK_TEXT: process.env.LOGO_DARK_TEXT,
  AVATAR_DEFAULT: process.env.AVATAR_DEFAULT,
  MISSING_THUMB_DEFAULT: process.env.MISSING_THUMB_DEFAULT,
  // OG
  OG_TITLE_SUFFIX: process.env.OG_TITLE_SUFFIX,
  OG_HOMEPAGE_TITLE: process.env.OG_HOMEPAGE_TITLE,
  OG_IMAGE_URL: process.env.OG_IMAGE_URL,
  // MASCOT
  YRBL_HAPPY_IMG_URL: process.env.YRBL_HAPPY_IMG_URL,
  YRBL_SAD_IMG_URL: process.env.YRBL_SAD_IMG_URL,
  LOGIN_IMG_URL: process.env.LOGIN_IMG_URL,
  SITE_CANONICAL_URL: process.env.SITE_CANONICAL_URL,
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE,
  AUTO_FOLLOW_CHANNELS: process.env.AUTO_FOLLOW_CHANNELS,
  UNSYNCED_SETTINGS: process.env.UNSYNCED_SETTINGS,

  // ENABLE FEATURES
  ENABLE_COMMENT_REACTIONS: process.env.ENABLE_COMMENT_REACTIONS === 'true',
  ENABLE_FILE_REACTIONS: process.env.ENABLE_FILE_REACTIONS === 'true',
  ENABLE_CREATOR_REACTIONS: process.env.ENABLE_CREATOR_REACTIONS === 'true',
  ENABLE_NO_SOURCE_CLAIMS: process.env.ENABLE_NO_SOURCE_CLAIMS === 'true',
  ENABLE_PREROLL_ADS: process.env.ENABLE_PREROLL_ADS === 'true',
  CHANNEL_STAKED_LEVEL_VIDEO_COMMENTS: process.env.CHANNEL_STAKED_LEVEL_VIDEO_COMMENTS,
  CHANNEL_STAKED_LEVEL_LIVESTREAM: process.env.CHANNEL_STAKED_LEVEL_LIVESTREAM,
  WEB_PUBLISH_SIZE_LIMIT_GB: process.env.WEB_PUBLISH_SIZE_LIMIT_GB,
  LOADING_BAR_COLOR: process.env.LOADING_BAR_COLOR,
  SIMPLE_SITE: process.env.SIMPLE_SITE === 'true',
  SHOW_ADS: process.env.SHOW_ADS === 'true',
  PINNED_URI_1: process.env.PINNED_URI_1,
  PINNED_LABEL_1: process.env.PINNED_LABEL_1,
  PINNED_URI_2: process.env.PINNED_URI_2,
  PINNED_LABEL_2: process.env.PINNED_LABEL_2,
  KNOWN_APP_DOMAINS: process.env.KNOWN_APP_DOMAINS ? process.env.KNOWN_APP_DOMAINS.split(',') : [],
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  ENABLE_UI_NOTIFICATIONS: process.env.ENABLE_UI_NOTIFICATIONS === 'true',
  ENABLE_MATURE: process.env.ENABLE_MATURE === 'true',
  CUSTOM_HOMEPAGE: process.env.CUSTOM_HOMEPAGE === 'true',
  SHOW_TAGS_INTRO: process.env.SHOW_TAGS_INTRO === 'true',
  LIGHTHOUSE_DEFAULT_TYPES: process.env.LIGHTHOUSE_DEFAULT_TYPES,
  BRANDED_SITE: process.env.BRANDED_SITE,

  // FIREBASE SDK
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
  FIREBASE_VAPID_KEY: process.env.FIREBASE_VAPID_KEY,

  AD_KEYWORD_BLOCKLIST: process.env.AD_KEYWORD_BLOCKLIST,
  AD_KEYWORD_BLOCKLIST_CHECK_DESCRIPTION: process.env.AD_KEYWORD_BLOCKLIST_CHECK_DESCRIPTION
};

config.SDK_API_PATH = `${config.LBRY_WEB_API}/api/v1`;
config.PROXY_URL = `${config.SDK_API_PATH}/proxy`;

config.URL_DEV = `http://localhost:${config.WEBPACK_WEB_PORT}`;
config.URL_LOCAL = `http://localhost:${config.WEB_SERVER_PORT}`;
config.FAVICON = `/public/favicon-spaceman.png`;

module.exports = config;
