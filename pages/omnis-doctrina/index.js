/* eslint-disable no-unused-vars */
import { getGlobalData } from '@/lib/notion/getNotionData'
import { useEffect } from 'react'
import { useGlobal } from '@/lib/global'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { isBrowser } from '@/lib/utils'
import { formatDateFmt } from '@/lib/formatDate'

const OmnisDoctrinaIndex = props => {
  const { siteInfo } = props
  const { locale } = useGlobal()

  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())

  useEffect(() => {
    if (isBrowser) {
      const anchor = window.location.hash
      if (anchor) {
        setTimeout(() => {
          const anchorElement = document.getElementById(anchor.substring(1))
          if (anchorElement) {
            anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
          }
        }, 300)
      }
    }
  }, [])

  const meta = {
    title: `${locale.NAV.WRITING} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'omnis-doctrina',
    type: 'website'
  }

  props = { ...props, meta }

  return <Layout {...props} />
}

export async function getStaticProps() {
  const props = await getGlobalData({ from: 'omnidoc-index', type: 'OmniDoc' })
  console.log('getStaticProps omni::::', props.subTypeOptions)
  props.posts = props.allPages?.filter(page => {
    if (page.type === 'OmniDoc') {
      console.log('OmniDoc::', page)
    }
    return page.type === 'OmniDoc' && page.status === 'Published'
  })

  //   console.log('props.posts', props.posts)
  const postsSortByDate = Object.create(props.posts)

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate
  })

  const OmnisDoctrinaLog = {}

  postsSortByDate.forEach(post => {
    // const date = formatDateFmt(post.publishDate, 'yyyy-MM')

    if (OmnisDoctrinaLog[post.sub_type]) {
      OmnisDoctrinaLog[post.sub_type].push(post)
    } else {
      OmnisDoctrinaLog[post.sub_type] = [post]
    }
  })

  // postsSortByDate.forEach(post => {
  //   const date = formatDateFmt(post.publishDate, 'yyyy-MM')

  //   if (OmnisDoctrinaLog[date]) {
  //     OmnisDoctrinaLog[date].push(post)
  //   } else {
  //     OmnisDoctrinaLog[date] = [post]
  //   }
  // })

  console.log('OmnisDoctrinaLog??머얌 ', OmnisDoctrinaLog)
  props.OmnisDoctrinaLog = OmnisDoctrinaLog

  delete props.allPages

  // console.log(' props.OmnisDoctrinaLog', props.OmnisDoctrinaLog)
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default OmnisDoctrinaIndex
