import BlogPostCard from './BlogPostCard'
import BLOG from '@/blog.config'
import NavPostListEmpty from './NavPostListEmpty'
import PaginationSimple from './PaginationSimple'
import { Button } from 'react-bootstrap'
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
  const historGoBack = () => {
    window.history.back()
  }
  return (
    <div className="w-full justify-center gap-2">
      <div id="posts-wrapper">
        {/* Article list */}
        {posts?.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <Button
        onClick={historGoBack}
        className=" mt-10  border-none  bg-none cursor-pointer items-center justify-center p-2 hover:text-neutral-700  text-neutral-500 "
      >
        뒤로가기
      </Button>
      <PaginationSimple page={page} totalPage={totalPage} />
    </div>
  )
}

export default BlogPostListPage
