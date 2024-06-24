import { idToUuid } from 'notion-utils'
import { checkStrIsNotionId, getLastPartOfUrl, isBrowser } from '../utils'

/**
 * 페이지 내에서 연결 점프를 처리합니다.
 * 1. 본 웹사이트의 도메인 이름인 경우 현재 창에서 열리며 새 창은 열리지 않습니다.
 * 2.url은 알림 ID이며 사이트의 기사 링크로 변환됩니다.
 */
export const convertInnerUrl = allPages => {
  if (isBrowser) {
    const allAnchorTags = document
      ?.getElementById('notion-article')
      ?.getElementsByTagName('a')

    if (!allAnchorTags) {
      return
    }
    const currentURL = window.location.origin + window.location.pathname
    // URL을 슬러그로 교체
    for (const anchorTag of allAnchorTags) {
      // URL 확인
      if (anchorTag?.href) {
        // URL이 Notion_id인 경우 블로그 기사의 내부 링크와 일치시켜 보세요.
        const slug = getLastPartOfUrl(anchorTag.href)
        if (checkStrIsNotionId(slug)) {
          const slugPage = allPages?.find(page => {
            return idToUuid(slug).indexOf(page.short_id) === 0
          })
          if (slugPage) {
            anchorTag.href = slugPage?.href
          }
        }
      }
    }

    // 링크가 현재 페이지에서 열립니다.
    for (const anchorTag of allAnchorTags) {
      if (anchorTag?.target === '_blank') {
        const hrefWithoutQueryHash = anchorTag.href.split('?')[0].split('#')[0]
        const hrefWithRelativeHash =
          currentURL.split('#')[0] || '' + anchorTag.href.split('#')[1] || ''
        if (
          currentURL === hrefWithoutQueryHash ||
          currentURL === hrefWithRelativeHash
        ) {
          anchorTag.target = '_self'
        }
      }
    }
  }
}
