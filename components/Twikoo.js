import BLOG from '@/blog.config'
// import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

/**
 * Giscus Reviews @see https://giscus.app/zh-CN
 * Contribute by @txs https://github.com/txs/NotionNext/commit/1bf7179d0af21fb433e4c7773504f244998678cb
 * @returns {JSX.Element}
 * @constructor
 */

const Twikoo = ({ isDarkMode }) => {
  useEffect(() => {
    window?.twikoo?.init({
      envId: BLOG.COMMENT_TWIKOO_ENV_ID, // Tencent cloud environment filling envId；Vercel Fill in the environment address（https://xxx.vercel.app）
      el: '#twikoo', // container element
      lang: BLOG.LANG // Used to manually set the language of the comment area, supported language list https://github.com/imaegoo/twikoo/blob/main/src/client/utils/i18n/index.js
      // region: 'ap-guangzhou',
      // path: location.pathname,
    })
  }, [isDarkMode])
  return <div id="twikoo"></div>
}

export default Twikoo
