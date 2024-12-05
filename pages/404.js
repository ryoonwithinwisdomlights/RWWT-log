import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { getLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'

/**
 * 404
 * @param {*} props
 * @returns
 */
const NoFound = props => {
  // Load different Layout files based on page path
  const Layout = getLayoutByTheme({
    theme: siteConfig('THEME'),
    router: useRouter()
  })

  return <Layout {...props} />
}

export async function getStaticProps() {
  const props = (await getGlobalData({ from: '404' })) || {}
  return { props }
}

export default NoFound
