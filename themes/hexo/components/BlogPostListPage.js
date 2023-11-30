import BlogPostCard from './BlogPostCard'
import PaginationNumber from './PaginationNumber'
import { siteConfig } from '@/lib/config'
import BlogPostListEmpty from './BlogPostListEmpty'

/**
 * Article list pagination table
 * @param page current page
 * @param posts All articles
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const totalPage = Math.ceil(
    postCount / parseInt(siteConfig('POSTS_PER_PAGE'))
  )
  const showPagination = postCount >= parseInt(siteConfig('POSTS_PER_PAGE'))
  if (!posts || posts.length === 0 || page > totalPage) {
    return <BlogPostListEmpty />
  } else {
    return (
      <div id="container" className="w-full">
        {/* Article list */}
        <div className="space-y-6 px-2">
          {posts?.map(post => (
            <BlogPostCard
              index={posts.indexOf(post)}
              key={post.id}
              post={post}
              siteInfo={siteInfo}
            />
          ))}
        </div>
        {showPagination && (
          <PaginationNumber page={page} totalPage={totalPage} />
        )}
      </div>
    )
  }
}

export default BlogPostListPage
