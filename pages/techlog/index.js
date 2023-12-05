/* eslint-disable no-unused-vars */
import { getGlobalData } from '@/lib/notion/getNotionData'
import React from 'react'
import { useGlobal } from '@/lib/global'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { formatDateFmt } from '@/lib/formatDate'

/**
 * Classification homepage
 * @param {*} props
 * @returns
 */
export default function TechLog(props) {
  const { locale } = useGlobal()
  const { siteInfo } = props

  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())

  const meta = {
    title: `${locale.NAV.PORTFOLIO} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'TechLog',
    type: 'website'
  }
  props = { ...props, meta }

  return <Layout {...props} />
}

export async function getStaticProps() {
  const props = await getGlobalData({
    from: 'TechLog-index-props',
    type: 'TechLog'
  })

  props.posts = props.allPages?.filter(page => {
    // if (page.type === 'Portfolio') {
    //   //   console.log(page)
    // }
    return page.type === 'TechLog' && page.status === 'Published'
  })

  // const postsSortByDate = Object.create(props.posts)
  // postsSortByDate.sort((a, b) => {
  //   return b?.publishDate - a?.publishDate
  // })

  // console.log('postsSortByDate', postsSortByDate)
  // const portfolioPosts = {}

  // postsSortByDate.forEach(post => {
  //   if (portfolioPosts[post.id]) {
  //     portfolioPosts[post.id].push(post)
  //   } else {
  //     portfolioPosts[post.id] = [post]
  //   }
  // })

  props.techLogPosts = props.posts
  // console.log('portfolioPosts', portfolioPosts)
  delete props.allPages

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}
