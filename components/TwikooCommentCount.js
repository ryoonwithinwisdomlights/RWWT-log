import BLOG from '@/blog.config'
// import twikoo from 'twikoo'

/**
 * Get the number of comments on the blog and display them in the list
 * @returns {JSX.Element}
 * @constructor
 */

const TwikooCommentCount = ({ post, className }) => {
  if (!JSON.parse(BLOG.COMMENT_TWIKOO_COUNT_ENABLE)) {
    return null
  }
  return (
    <a
      href={`${post.slug}?target=comment`}
      className={`mx-1 hidden comment-count-wrapper-${post.id} ${
        className || ''
      }`}
    >
      <i className="far fa-comment mr-1"></i>
      <span className={`comment-count-text-${post.id}`}>
        {/* <i className='fa-solid fa-spinner animate-spin' /> */}
      </span>
    </a>
  )
}

export default TwikooCommentCount
