'use client'

import BLOG from '@/blog.config'
import { useGlobal } from './global'
import { deepClone, isUrl } from './utils'

/**
 * 구성 순서 읽기
 * 1. 먼저 NotionConfig 테이블을 읽어보세요.
 * 2. 두 번째로 환경 변수를 읽습니다.
 * 3. 그런 다음 blog.config.js / 또는 각 테마의 CONFIG 파일을 읽으십시오.
 * @param {*} key ；
 * @param {*} defaultVal ; 매개변수에 대한 기본 반환 값이 없습니다.
 * @param {*} extendConfig ; 공지사항에서 찾을 수 없는 경우 구성 객체 {key:val}을 참조하세요. 여기에서 먼저 찾아보세요.
 * @returns
 */
export const siteConfig = (key, defaultVal = null, extendConfig = {}) => {
  if (!key) {
    return null
  }

  // 특수 구성 처리: 다음 구성은 서버 측에만 적용됩니다.
  // 전역의 NOTION_CONFIG는 프런트엔드 구성 요소에서만 사용되므로 확장 구성에서 읽어야 합니다.
  switch (key) {
    case 'NEXT_REVALIDATE_SECOND':
    case 'POST_RECOMMEND_COUNT':
    case 'IMAGE_COMPRESS_WIDTH':
    case 'PSEUDO_STATIC':
    case 'POSTS_SORT_BY':
    case 'POSTS_PER_PAGE':
    case 'POST_PREVIEW_LINES':
    case 'POST_URL_PREFIX':
    case 'POST_LIST_STYLE':
    case 'POST_LIST_PREVIEW':
    case 'POST_URL_PREFIX_MAPPING_CATEGORY':
    case 'IS_TAG_COLOR_DISTINGUISHED':
    case 'TAG_SORT_BY_COUNT':
      return convertVal(extendConfig[key] || defaultVal || BLOG[key])
    default:
  }

  let global = {}
  try {
    // const isClient = typeof window !== 'undefined'
    // eslint-disable-next-line react-hooks/rules-of-hooks
    global = useGlobal()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // global = useGlobal()
  } catch (error) {
    // 本地调试用
    // console.warn('SiteConfig警告', key, error)
  }

  // 먼저 NOTION의 테이블 구성을 먼저 읽도록 구성합니다.
  let val = null
  let siteInfo = null

  if (global) {
    val = global.NOTION_CONFIG?.[key]
    siteInfo = global.siteInfo
  }

  if (!val) {
    // 여기서는 일부 키에 대한 호환성 처리를 수행합니다.
    switch (key) {
      case 'HOME_BANNER_IMAGE':
        val = siteInfo?.pageCover // 표지 이미지는 Notion 표지에서 가져왔습니다.
        break
      case 'AVATAR':
        val = siteInfo?.icon // 표지 이미지는 Notion의 아바타에서 가져왔습니다.
        break
      case 'TITLE':
        val = siteInfo?.title // 제목은 Notion의 제목을 따왔습니다.
        break
      case 'DESCRIPTION':
        val = siteInfo?.description //
        break
    }
  }

  // 둘째, 전달된 확장 구성이 있는 경우 읽기를 시도합니다.
  if (!val && extendConfig) {
    val = extendConfig[key]
  }

  // NOTION이 구성을 찾지 못하면 blog.config.js 파일을 읽습니다.
  if (!val) {
    val = BLOG[key]
  }

  if (!val) {
    return defaultVal
  }

  return convertVal(val)
}

/**
 * 환경 변수 및 NotionConfig에서 읽은 구성은 문자열 유형입니다.
 * 여기서 구성된 문자 값이 확인되면 숫자 없음, 불리언, [] 배열, {} 객체인 경우 해당 유형으로 변환됩니다.
 * JSON 및 평가 함수 사용
 * JSON 및 평가 함수 사용
 * @param {*} val
 * @returns
 */
export const convertVal = val => {
  // 들어오는 매개변수 자체가 obj, array, boolean이면 처리할 필요가 없습니다.
  if (typeof val !== 'string' || !val) {
    return val
  }

  // 숫자를 구문 분석하고,parseInt는 문자열을 숫자로 변환합니다.
  if (/^\d+$/.test(val)) {
    return parseInt(val)
  }

  // URL인지 확인하세요
  if (isUrl(val)) {
    return val
  }
  // URL인지 확인하세요
  if (val === 'true' || val === 'false') {
    return JSON.parse(val)
  }

  if (val.indexOf('[') < 0 && val.indexOf('{') < 0) {
    return val
  }

  // [], {}, true/false와 같은 문자열을 객체로 변환합니다.
  try {
    // JSON을 구문 분석
    const parsedJson = JSON.parse(val)
    if (parsedJson !== null) {
      return parsedJson
    }
  } catch (error) {
    return val
  }
  return val
}

/**
 * 모든 구성 읽기
 * 1. 먼저 NotionConfig 테이블을 읽어보세요.
 * 2. 두 번째로 환경 변수를 읽습니다.
 * 3. blog.config.js 파일을 다시 읽어보세요.
 * modeun guseong ilg-gi
 * @param {*} key
 * @returns
 */
export const siteConfigMap = () => {
  const val = deepClone(BLOG)
  for (const key in val) {
    val[key] = siteConfig(key)
    // console.log('site', key, val[key], siteConfig(key))
  }
  return val
}
