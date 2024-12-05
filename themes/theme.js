import cookie from 'react-cookies'
import BLOG from '@/blog.config'
import { getQueryParam, getQueryVariable, isBrowser } from '../lib/utils'
import dynamic from 'next/dynamic'
import getConfig from 'next/config'
import * as ThemeComponents from '@theme-components'

// All themes are scanned in next.config.js
export const { THEMES = [] } = getConfig().publicRuntimeConfig

export const getThemeConfig = async themeQuery => {
  if (themeQuery && themeQuery !== BLOG.THEME) {
    const THEME_CONFIG = await import(`@/themes/${themeQuery}`).then(
      m => m.THEME_CONFIG
    )
    return THEME_CONFIG
  } else {
    return ThemeComponents?.THEME_CONFIG
  }
}

/**
 * Load theme files
 * in the case of
 * @param {*} router
 * @returns
 */
// export const getLayoutByTheme = router => {
//   const themeQuery = getQueryParam(router.asPath, 'theme') || BLOG.THEME
//   const layout = getLayoutNameByPath(router.pathname)
//   if (themeQuery !== BLOG.THEME) {
//     return dynamic(
//       () => import(`@/themes/${themeQuery}`).then(m => m[layout]),
//       { ssr: true }
//     )
//   } else {
//     return ThemeComponents[layout]
//   }
// }
export const getGlobalLayoutByTheme = themeQuery => {
  if (themeQuery !== BLOG.THEME) {
    return dynamic(
      () =>
        import(`@/themes/${themeQuery}`).then(m => m[getLayoutNameByPath(-1)]),
      { ssr: true }
    )
  } else {
    return ThemeComponents[getLayoutNameByPath('-1')]
  }
}

export const getLayoutByTheme = ({ router, theme }) => {
  const themeQuery = getQueryParam(router.asPath, 'theme') || theme
  if (themeQuery !== BLOG.THEME) {
    return dynamic(
      () =>
        import(`@/themes/${themeQuery}`).then(m => {
          setTimeout(() => {
            checkThemeDOM()
          }, 500)

          const components =
            m[getLayoutNameByPath(router.pathname, router.asPath)]
          if (components) {
            return components
          } else {
            return m.LayoutSlug
          }
        }),
      { ssr: true }
    )
  } else {
    setTimeout(() => {
      checkThemeDOM()
    }, 100)
    const components =
      ThemeComponents[getLayoutNameByPath(router.pathname, router.asPath)]
    if (components) {
      return components
    } else {
      return ThemeComponents.LayoutSlug
    }
  }
}

/**
 * Get the corresponding layout according to the path
 * @param {*} path
 * @returns
 */
export const getLayoutNameByPath = path => {
  switch (path) {
    case '/':
      return 'LayoutIndex'
    case '/archive':
      return 'LayoutArchive'
    case '/guest-book':
      return 'LayoutGuestBook'
    case '/writing':
      return 'LayoutReadAndWrite'
    case '/thelog':
      return 'LayoutTheLog'
    case '/techlog':
      return 'LayoutTechLog'
    case '/sideproject':
      return 'LayoutSideproject'
    case '/agiveawaylog':
      return 'LayoutAGiveAwayLog'
    case '/inspiration':
      return 'LayoutInspiration'
    case '/page/[page]':
    case '/category/[category]':
    case '/category/[category]/page/[page]':
    case '/tag/[tag]':
    case '/tag/[tag]/page/[page]':
      return 'LayoutPostList'
    case '/search':
    case '/search/[keyword]':
    case '/search/[keyword]/page/[page]':
      return 'LayoutSearch'
    case '/404':
      return 'Layout404'
    case '/tag':
      return 'LayoutTagIndex'
    case '/category':
      return 'LayoutCategoryIndex'
    default:
      return 'LayoutSlug'
  }
}

const checkThemeDOM = () => {
  if (isBrowser) {
    const elements = document.querySelectorAll('[id^="theme-"]')
    if (elements?.length > 1) {
      elements[elements.length - 1].scrollIntoView()
      // 删除前面的元素，只保留最后一个元素
      for (let i = 0; i < elements.length - 1; i++) {
        if (
          elements[i] &&
          elements[i].parentNode &&
          elements[i].parentNode.contains(elements[i])
        ) {
          elements[i].parentNode.removeChild(elements[i])
        }
      }
    }
  }
}

/**
 * Initialize topic, priorityquery > cookies > systemPrefer
 * @param isDarkMode
 * @param updateDarkMode Change themeChangeState function
 * @description Read the user theme stored in the cookie
 */
export const initDarkMode = updateDarkMode => {
  // Check if the user's device browser is in dark mode
  let newDarkMode = isPreferDark()

  // Check whether the user forces dark mode in the cookie
  const cookieDarkMode = loadDarkModeFromCookies()
  if (cookieDarkMode) {
    newDarkMode = JSON.parse(cookieDarkMode)
  }

  // Whether the dark mode is in the url query condition
  const queryMode = getQueryVariable('mode')
  if (queryMode) {
    newDarkMode = queryMode === 'dark'
  }

  updateDarkMode(newDarkMode)
  saveDarkModeToCookies(newDarkMode)
  document
    .getElementsByTagName('html')[0]
    .setAttribute('class', newDarkMode ? 'dark' : 'light')
}

/**
 * Whether to give priority to dark mode is determined based on the system dark mode and the current time.
 * @returns {*}
 */
export function isPreferDark() {
  if (BLOG.APPEARANCE === 'dark') {
    return true
  }
  if (BLOG.APPEARANCE === 'auto') {
    // When the system is in dark mode or the time is night, force it to night mode
    const date = new Date()
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    return (
      prefersDarkMode ||
      (BLOG.APPEARANCE_DARK_TIME &&
        (date.getHours() >= BLOG.APPEARANCE_DARK_TIME[0] ||
          date.getHours() < BLOG.APPEARANCE_DARK_TIME[1]))
    )
  }
  return false
}

/**
 * Read dark mode
 * @returns {*}
 */
export const loadDarkModeFromCookies = () => {
  return cookie.load('darkMode')
}

/**
 * Save dark mode
 * @param newTheme
 */
export const saveDarkModeToCookies = newTheme => {
  cookie.save('darkMode', newTheme, { path: '/' })
}

/**
 * Read default theme
 * @returns {*}
 */
export const loadThemeFromCookies = () => {
  return cookie.load('theme')
}

/**
 * Save default theme
 * @param newTheme
 */
export const saveThemeToCookies = newTheme => {
  cookie.save('theme', newTheme, { path: '/' })
}
