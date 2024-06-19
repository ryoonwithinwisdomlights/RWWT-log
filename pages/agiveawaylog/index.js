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
export default function AGiveAwayLog(props) {
  const { locale } = useGlobal()
  const { siteInfo } = props

  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())

  const meta = {
    title: `${locale.NAV.AGIVEAWAYLOG} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'AGiveAwayLog',
    type: 'website'
  }
  props = { ...props, meta }

  return <Layout {...props} />
}

export async function getStaticProps() {
  console.log('AGiveAwayLogAGiveAwayLogAGiveAwayLogAGiveAwayLog')
  const props = await getGlobalData({
    from: 'AGiveAwayLog-index-props',
    type: 'AGiveAwayLog'
  })
  console.log('AGiveAwayLogAGiveAwayLogAGiveAwayLogAGiveAwayLogq22')
  props.posts = props.allPages?.filter(page => {
    if (page.type === 'AGiveAwayLog') {
      console.log(page)
    }
    return page.type === 'AGiveAwayLog' && page.status === 'Published'
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

  props.aGiveAwayLogPosts = props.posts
  console.log('aGiveAwayLogPosts', props.aGiveAwayLogPosts)
  delete props.allPages

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}
