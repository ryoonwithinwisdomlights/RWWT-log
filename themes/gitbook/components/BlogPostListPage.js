import BlogPostCard from './BlogPostCard'
import BLOG from '@/blog.config'
import NavPostListEmpty from './NavPostListEmpty'
import PaginationSimple from './PaginationSimple'

/**
 * Article list pagination table
 * @param page current page
 * @param posts All articles
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount }) => {
  const totalPage = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)

  if (!posts || posts.length === 0) {
    return <NavPostListEmpty />
  }

  return (
    <div className="w-full justify-center">
      <div id="posts-wrapper">
        {/* Article list */}
        {posts?.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <PaginationSimple page={page} totalPage={totalPage} />
    </div>
  )
}

export default BlogPostListPage
