import BLOG from '@/blog.config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

const ValineComponent = ({ path }) => {
  const loadValine = async () => {
    try {
      await loadExternalResource(BLOG.COMMENT_VALINE_CDN, 'js')
      const Valine = window.Valine
      // eslint-disable-next-line no-unused-vars
      const valine = new Valine({
        el: '#valine', // container element
        lang: BLOG.LANG, // Used to manually set the language of the comment area, supported language list https://github.com/imaegoo/twikoo/blob/main/src/client/utils/i18n/index.js
        appId: BLOG.COMMENT_VALINE_APP_ID,
        appKey: BLOG.COMMENT_VALINE_APP_KEY,
        avatar: '',
        path,
        recordIP: true,
        placeholder: BLOG.COMMENT_VALINE_PLACEHOLDER,
        serverURLs: BLOG.COMMENT_VALINE_SERVER_URLS,
        visitor: true
      })
    } catch (error) {
      console.error('twikoo 加载失败', error)
    }
  }

  useEffect(() => {
    loadValine()
  }, [])

  return <div id="valine"></div>

  //   const updateValine = url => {
  //     // 移除旧的评论区，否则会重复渲染。
  //     const wrapper = document.getElementById('v-wrapper')
  //     const comments = document.getElementById('v-comments')
  //     wrapper.removeChild(comments)
  //     const newComments = document.createElement('div')
  //     newComments.id = 'v-comments'
  //     newComments.name = new Date()
  //     wrapper.appendChild(newComments)
  //     initValine(url)
  //   }

  //   useEffect(() => {
  //     initValine()
  //     router.events.on('routeChangeComplete', updateValine)
  //     return () => {
  //       router.events.off('routeChangeComplete', updateValine)
  //     }
  //   }, [])

  //   return <div id='v-wrapper'>
  //       <div id='v-comments'></div>
  //   </div>
}

export default ValineComponent
