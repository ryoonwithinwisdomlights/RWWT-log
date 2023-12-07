const CONFIG = {
  HEXO_HOME_BANNER_ENABLE: true,
  // 3.14.1In future versions, the welcome message will be configured in blog.config.js and separated by commas ','.
  HEXO_HOME_BANNER_GREETINGS: [
    'Hi, I am a programmer',
    'Hi, I am a wage earner',
    'Hi, I am a hard worker',
    'Welcome to my blog '
  ], // Home page big picture slogan text

  HEXO_HOME_NAV_BUTTONS: true, // Whether to display large category icon buttons on the homepage
  // It is known that the bug has not been fixed, and images cannot be loaded after turning on true on the mobile terminal; it is temporarily recommended to set it to false.
  HEXO_HOME_NAV_BACKGROUND_IMG_FIXED: false, // Whether the background image of the homepage is fixed when scrolling. If true, the image will not move when scrolling; if false, it will scroll with the mouse;
  // Whether to display the start reading button
  HEXO_SHOW_START_READING: true,

  // Menu configuration
  HEXO_MENU_INDEX: true, // Show homepage
  HEXO_MENU_CATEGORY: true, // Show categories
  HEXO_MENU_TAG: true, // show label
  HEXO_MENU_ARCHIVE: true, // 显示归档
  HEXO_MENU_SEARCH: true, // show archive
  HEXO_MENU_READ: true, // show search
  HEXO_MENU_PORTFOLIO: true, // show search
  HEXO_MENU_INSPIRATION: true, // show search
  HEXO_POST_LIST_COVER: true, // List of article covers
  HEXO_POST_LIST_COVER_HOVER_ENLARGE: false, // List mouseover to enlarge

  HEXO_POST_LIST_COVER_DEFAULT: true, // When the cover is empty, the site background is used as the default cover.
  HEXO_POST_LIST_SUMMARY: true, // Article Summary
  HEXO_POST_LIST_PREVIEW: false, // Read article preview
  HEXO_POST_LIST_IMG_CROSSOVER: true, // Blog list pictures are staggered left and right

  HEXO_ARTICLE_ADJACENT: true, // Show previous article next article recommendations
  HEXO_ARTICLE_COPYRIGHT: true, // Show article copyright statement
  HEXO_ARTICLE_RECOMMEND: true, // Article related recommendations

  HEXO_WIDGET_LATEST_POSTS: true, // Show latest article card
  HEXO_WIDGET_ANALYTICS: false, // Show statistics card
  HEXO_WIDGET_TO_TOP: true,
  HEXO_WIDGET_TO_COMMENT: true, // Skip to the comments section
  HEXO_WIDGET_DARK_MODE: true, // Night mode
  HEXO_WIDGET_TOC: true // Mobile floating directory
}
export default CONFIG
