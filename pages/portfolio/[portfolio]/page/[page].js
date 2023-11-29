import { getGlobalData } from '@/lib/notion/getNotionData'
import React from 'react'
import { useGlobal } from '@/lib/global'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'

/**
 * Portfolio page
 * @param {*} props
 * @returns
 */

export default function Portfolio(props) {
  const { siteInfo } = props
  const { locale } = useGlobal()
  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())

  const meta = {
    title: ` ${locale.NAV.PORTFOLIO} | ${siteInfo?.title || ''}`,
    description: siteInfo?.description,
    slug: 'portfolio/',
    image: siteInfo?.pageCover,
    type: 'website'
  }

  props = { ...props, meta }

  return <Layout {...props} />
}

export async function getStaticProps({ params: { portfolio } }) {
  const from = 'portfolio-page-props'
  let props = await getGlobalData({ from, type: 'Portfolio' })

  // Filter status type
  props.posts = props.allPages?.filter(
    page => page.type === 'Portfolio' && page.status === 'Published'
  )
  // Process article page count
  props.postCount = props.posts.length
  // Handle pagination
  // props.posts = props.posts.slice(
  //   BLOG.POSTS_PER_PAGE * (page - 1),
  //   BLOG.POSTS_PER_PAGE * page
  // )

  delete props.allPages
  // props.page = page

  props = { ...props, portfolio }

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export async function getStaticPaths() {
  const from = 'portfolio-paths'
  const { portfolio, allPages } = await getGlobalData({ from })
  const paths = []

  portfolio?.forEach(portfolio => {
    // Filter status type
    const portfolioPosts = allPages?.filter(
      page => page.type === 'Portfolio' && page.status === 'Published'
    )
    // Process article page count
    const postCount = portfolioPosts.length
    const totalPages = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        paths.push({ params: { portfolio: portfolio.name, page: '' + i } })
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}
