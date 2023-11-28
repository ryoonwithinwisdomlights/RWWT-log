import BLOG from '@/blog.config'
import { loadExternalResource } from '@/lib/utils'
// import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

/**
 * Giscus评论 @see https://giscus.app/zh-CN
 * Contribute by @txs https://github.com/txs/NotionNext/commit/1bf7179d0af21fb433e4c7773504f244998678cb
 * @returns {JSX.Element}
 * @constructor
 */

const Artalk = ({ siteInfo }) => {
  useEffect(() => {
    loadExternalResource(BLOG.COMMENT_ARTALK_CSS, 'css')
    window?.Artalk?.init({
      server: BLOG.COMMENT_ARTALK_SERVER, // Backend address
      el: '#artalk', // container element
      locale: BLOG.LANG,
      //   pageKey: '/post/1', // Permalink (leave blank to get automatically)
      //   pageTitle: 'About the introduction of Artalk', // Page title (leave blank to get automatically)
      site: siteInfo?.title // your site name
    })
  }, [])
  return <div id="artalk"></div>
}

export default Artalk
