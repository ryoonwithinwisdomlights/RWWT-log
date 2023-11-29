import { getGlobalData } from '@/lib/notion/getNotionData'
import React from 'react'
import { useGlobal } from '@/lib/global'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { formatDateFmt } from '@/lib/formatDate'

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
    title: `${locale.NAV.PORTFOLIO} | ${siteInfo?.title || ''}`,
    description: siteInfo?.description,
    slug: 'portfolio/' + props.portfolio,
    image: siteInfo?.pageCover,
    type: 'website'
  }

  props = { ...props, meta }

  return <Layout {...props} />
}

export async function getStaticProps({ params: { portfolio } }) {
  const from = 'portfolio-props'
  let props = await getGlobalData({ from, type: 'Portfolio' })

  console.log('props============', props.portfolio)
  // filter status
  props.posts = props.allPages?.filter(
    page => page.type === 'Portfolio' && page.status === 'Published'
  )

  props.postCount = props.posts.length
  // Handle pagination
  if (BLOG.POST_LIST_STYLE === 'scroll') {
    // Scroll list returns all data to the front end
  } else if (BLOG.POST_LIST_STYLE === 'page') {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE)
  }

  delete props.allPages

  const postsSortByDate = Object.create(props.posts)

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate
  })

  const portfolioPosts = {}

  postsSortByDate.forEach(post => {
    const date = formatDateFmt(post.publishDate, 'yyyy-MM')
    if (portfolioPosts[date]) {
      portfolioPosts[date].push(post)
    } else {
      portfolioPosts[date] = [post]
    }
  })

  props = { ...props, portfolio }

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export async function getStaticPaths() {
  const from = 'portfolio-paths'
  const { portfolio } = await getGlobalData({ from })
  return {
    paths: Object.keys(portfolio).map(portfolio => ({
      params: { portfolio: portfolio[portfolio]?.name }
    })),
    fallback: true
  }
}
