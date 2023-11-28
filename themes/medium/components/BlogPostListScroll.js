import BLOG from '@/blog.config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

/**
 * Blog list scrolling paging
 * @param posts All articles
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListScroll = ({ posts = [], currentSearch }) => {
  const router = useRouter()

  function getSearchKey() {
    if (router.query && router.query.s) {
      return router.query.s
    }
    return null
  }

  const postsPerPage = BLOG.POSTS_PER_PAGE
  const [page, updatePage] = useState(1)
  let filteredPosts = Object.assign(posts)
  const searchKey = getSearchKey()
  if (searchKey) {
    filteredPosts = posts.filter(post => {
      const tagContent = post?.tags ? post?.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(searchKey.toLowerCase())
    })
  }
  const postsToShow = getPostByPage(page, filteredPosts, postsPerPage)

  let hasMore = false
  if (filteredPosts) {
    const totalCount = filteredPosts.length
    hasMore = page * postsPerPage < totalCount
  }

  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  // Monitor scrolling and automatic paging loading
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY + window.outerHeight
      const clientHeight = targetRef
        ? targetRef.current
          ? targetRef.current.clientHeight
          : 0
        : 0
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    }, 500)
  )

  // Listen for scrolling
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  const targetRef = useRef(null)
  const { locale } = useGlobal()

  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  } else {
    return (
      <div id="posts-wrapper" ref={targetRef} className="w-full">
        {/* Article list */}
        <div className="space-y-1 lg:space-y-4">
          {postsToShow?.map(post => (
            <BlogPostCard key={post.id} post={post} showSummary={true} />
          ))}
        </div>

        <div>
          <div
            onClick={() => {
              handleGetMore()
            }}
            className="w-full my-4 py-4 text-center cursor-pointer dark:text-gray-200"
          >
            {' '}
            {hasMore ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE} 😰`}{' '}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Get articles from page 1 to the specified page number
 * @param page which page
 * @param totalPosts All articles
 * @param postsPerPage Number of articles per page
 * @returns {*}
 */
const getPostByPage = function (page, totalPosts, postsPerPage) {
  return totalPosts.slice(0, postsPerPage * page)
}

export default BlogPostListScroll
