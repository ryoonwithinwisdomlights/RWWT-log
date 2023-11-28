import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'
import zhHK from './lang/zh-HK'
import zhTW from './lang/zh-TW'
import frFR from './lang/fr-FR'
import trTR from './lang/tr-TR'
import jaJP from './lang/ja-JP'
import cookie from 'react-cookies'
import { getQueryVariable, isBrowser, mergeDeep } from './utils'

/**
 * Configure all supported languages here
 * country / region
 */
const lang = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'zh-HK': zhHK,
  'zh-TW': zhTW,
  'fr-FR': frFR,
  'tr-TR': trTR,
  'ja-JP': jaJP
}

export default lang

/**
 * 현재 언어 사전 가져오기
 * "국가-지역" 언어가 모두 일치하면 해당 국가의 언어가 표시됩니다.
 * @returns 다양한 언어에 대응하는 사전
 */
export function generateLocaleDict(langString) {
  const supportedLocales = Object.keys(lang)
  let userLocale

  // 언어 문자열을 언어 및 지역 코드로 분할합니다(예: "zh-CN"을 "zh" 및 "CN"으로 분할).
  const [language, region] = langString.split(/[-_]/)

  // 언어와 지역이 모두 일치하는 상황을 우선적으로 고려합니다.
  const specificLocale = `${language}-${region}`
  if (supportedLocales.includes(specificLocale)) {
    userLocale = lang[specificLocale]
  }

  // 그런 다음 언어만 일치하는 경우를 일치시켜 보세요.
  if (!userLocale) {
    const languageOnlyLocales = supportedLocales.filter(locale =>
      locale.startsWith(language)
    )
    if (languageOnlyLocales.length > 0) {
      userLocale = lang[languageOnlyLocales[0]]
    }
  }

  // 일치하는 항목이 없으면 가장 가까운 언어 팩을 반환합니다.
  if (!userLocale) {
    const fallbackLocale = supportedLocales.find(locale =>
      locale.startsWith('en')
    )
    userLocale = lang[fallbackLocale]
  }

  return mergeDeep({}, lang['en-US'], userLocale)
}

/**
 * 사이트 번역 초기화
 * 사용자의 현재 브라우저 언어에 따라 전환
 */
export function initLocale(lang, locale, changeLang, changeLocale) {
  if (isBrowser) {
    const queryLang =
      getQueryVariable('lang') ||
      loadLangFromCookies() ||
      window.navigator.language
    let currentLang = lang
    if (queryLang !== lang) {
      currentLang = queryLang
    }
    changeLang(currentLang)
    saveLangToCookies(currentLang)

    const targetLocale = generateLocaleDict(currentLang)
    if (JSON.stringify(locale) !== JSON.stringify(currentLang)) {
      changeLocale(targetLocale)
    }
  }
}
/**
 * 언어를 읽다
 * @returns {*}
 */
export const loadLangFromCookies = () => {
  return cookie.load('lang')
}

/**
 * 언어 저장
 * @param newTheme
 */
export const saveLangToCookies = lang => {
  cookie.save('lang', lang, { path: '/' })
}
