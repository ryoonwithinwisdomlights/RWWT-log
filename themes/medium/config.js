const CONFIG = {
  // Style
  RIGHT_PANEL_DARK: process.env.NEXT_PUBLIC_MEDIUM_RIGHT_DARK || false, // Right panel dark mode

  POST_LIST_COVER: true, // Article list displays picture cover
  POST_LIST_PREVIEW: true, // List display article preview
  POST_LIST_CATEGORY: true, // List display article categories
  POST_LIST_TAG: true, // List display article tags

  POST_DETAIL_CATEGORY: true, // Article display category
  POST_DETAIL_TAG: true, // Article display tags

  // menu
  MENU_CATEGORY: true, // Show categories
  MENU_TAG: true, // show label
  MENU_ARCHIVE: true, // show archive
  MENU_SEARCH: true, // show search

  // Widget
  WIDGET_REVOLVER_MAPS: process.env.NEXT_PUBLIC_WIDGET_REVOLVER_MAPS || 'false', // Map plugin
  WIDGET_TO_TOP: true // Jump back to top
}
export default CONFIG
