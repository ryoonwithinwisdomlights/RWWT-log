import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 *Get the number of comments on the blog and display them in the list
 * @returns {JSX.Element}
 * @constructor
 */

const TwikooCommentCounter = props => {
  let commentsData = []
  const { theme } = useGlobal()

  const fetchTwikooData = async posts => {
    posts.forEach(post => {
      post.slug = post.slug.startsWith('/') ? post.slug : `/${post.slug}`
    })
    try {
      await loadExternalResource(BLOG.COMMENT_TWIKOO_CDN_URL, 'js')
      const twikoo = window.twikoo
      twikoo
        .getCommentsCount({
          envId: BLOG.COMMENT_TWIKOO_ENV_ID, // environment ID
          // region: 'ap-guangzhou', // Environment region, the default is ap-shanghai, if your environment region is not Shanghai, you need to pass this parameter
          urls: posts?.map(post => post.slug), // A list of article paths that does not include protocols, domain names, and parameters. Parameters must be passed.
          includeReply: true // Whether the number of comments includes replies, default：false
        })
        .then(function (res) {
          commentsData = res
          updateCommentCount()
        })
        .catch(function (err) {
          // An error occurred
          console.error(err)
        })
    } catch (error) {
      console.error('twikoo 加载失败', error)
    }
  }

  const updateCommentCount = () => {
    if (commentsData.length === 0) {
      return
    }
    props.posts.forEach(post => {
      const matchingRes = commentsData.find(r => r.url === post.slug)
      if (matchingRes) {
        // Modify the number of comments div
        const textElements = document.querySelectorAll(
          `.comment-count-text-${post.id}`
        )
        textElements.forEach(element => {
          element.innerHTML = matchingRes.count
        })
        // Unhide
        const wrapperElements = document.querySelectorAll(
          `.comment-count-wrapper-${post.id}`
        )
        wrapperElements.forEach(element => {
          element.classList.remove('hidden')
        })
      }
    })
  }
  const router = useRouter()

  useEffect(() => {
    // console.log('Route triggers comment count')
    if (props?.posts && props?.posts?.length > 0) {
      fetchTwikooData(props.posts)
    }
  }, [router.events])

  // Monitor the number of comments when a topic changes
  useEffect(() => {
    // console.log('Topic triggers comment count', commentsData)
    updateCommentCount()
  }, [theme])
  return null
}

export default TwikooCommentCounter
