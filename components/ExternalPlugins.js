import BLOG from 'blog.config'
import { CUSTOM_EXTERNAL_CSS, CUSTOM_EXTERNAL_JS } from '@/blog.config'
import dynamic from 'next/dynamic'
import { siteConfig } from '@/lib/config'
import { convertInnerUrl } from '@/lib/notion/convertInnerUrl'
import { isBrowser, loadExternalResource } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { initGoogleAdsense } from './GoogleAdsense'
// const DebugPanel = dynamic(() => import('@/components/DebugPanel'), {
//   ssr: false
// })

// const Analytics = dynamic(
//   () =>
//     import('@vercel/analytics/react').then(async m => {
//       return m.Analytics
//     }),
//   { ssr: false }
// )
// const IMG_SHADOW = siteConfig('IMG_SHADOW')
// const ANIMATE_CSS_URL = siteConfig('ANIMATE_CSS_URL')
// // const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
// const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })
// const Busuanzi = dynamic(() => import('@/components/Busuanzi'), { ssr: false })
// const GoogleAdsense = dynamic(() => import('@/components/GoogleAdsense'), {
//   ssr: false
// })
// const VConsole = dynamic(() => import('@/components/VConsole'), { ssr: false })
// const CustomContextMenu = dynamic(
//   () => import('@/components/CustomContextMenu'),
//   { ssr: false }
// )
// const DisableCopy = dynamic(() => import('@/components/DisableCopy'), {
//   ssr: false
// })

const ExternalPlugin = props => {
  const DISABLE_PLUGIN = siteConfig('DISABLE_PLUGIN')
  const DEBUG = siteConfig('DEBUG')
  const ANALYTICS_VERCEL = siteConfig('ANALYTICS_VERCEL')
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig('ANALYTICS_BUSUANZI_ENABLE')
  const ADSENSE_GOOGLE_ID = siteConfig('ADSENSE_GOOGLE_ID')

  const CUSTOM_RIGHT_CLICK_CONTEXT_MENU = siteConfig(
    'CUSTOM_RIGHT_CLICK_CONTEXT_MENU'
  )
  const CAN_COPY = siteConfig('CAN_COPY')
  const ANALYTICS_GOOGLE_ID = siteConfig('ANALYTICS_GOOGLE_ID')
  const GLOBAL_JS = siteConfig('GLOBAL_JS')
  const IMG_SHADOW = siteConfig('IMG_SHADOW')
  const ANIMATE_CSS_URL = siteConfig('ANIMATE_CSS_URL')

  // 사용자 정의 스타일 CSS 및 JS 소개
  if (isBrowser) {
    // 初始化AOS动画
    // 静态导入本地自定义样式
    loadExternalResource('/css/custom.css', 'css')
    loadExternalResource('/js/custom.js', 'js')

    // 自动添加图片阴影
    if (IMG_SHADOW) {
      loadExternalResource('/css/img-shadow.css', 'css')
    }

    if (ANIMATE_CSS_URL) {
      loadExternalResource(ANIMATE_CSS_URL, 'css')
    }

    // 导入外部自定义脚本
    if (CUSTOM_EXTERNAL_JS && CUSTOM_EXTERNAL_JS.length > 0) {
      for (const url of CUSTOM_EXTERNAL_JS) {
        loadExternalResource(url, 'js')
      }
    }

    // 导入外部自定义样式
    if (CUSTOM_EXTERNAL_CSS && CUSTOM_EXTERNAL_CSS.length > 0) {
      for (const url of CUSTOM_EXTERNAL_CSS) {
        loadExternalResource(url, 'css')
      }
    }
  }
  const router = useRouter()
  useEffect(() => {
    // Google 광고를 비동기식으로 렌더링
    if (ADSENSE_GOOGLE_ID) {
      setTimeout(() => {
        initGoogleAdsense(ADSENSE_GOOGLE_ID)
      }, 1000)
    }

    // 지도 URL
    convertInnerUrl(props?.allNavPages)
  }, [router])

  useEffect(() => {
    // 주입 스크립트 실행
    // eslint-disable-next-line no-eval
    eval(GLOBAL_JS)
  }, [])

  if (DISABLE_PLUGIN) {
    return null
  }
  return (
    <>
      {DEBUG && <DebugPanel />}
      {ANALYTICS_GOOGLE_ID && <Gtag />}
      {ANALYTICS_VERCEL && <Analytics />}
      {ANALYTICS_BUSUANZI_ENABLE && <Busuanzi />}
      {!CAN_COPY && <DisableCopy />}
      {CUSTOM_RIGHT_CLICK_CONTEXT_MENU && <CustomContextMenu {...props} />}
      {!JSON.parse(BLOG.CAN_COPY) && <DisableCopy />}
      <VConsole />
      <LoadingProgress />
      {/* 谷歌统计 */}
      {ANALYTICS_GOOGLE_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_GOOGLE_ID}`}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ANALYTICS_GOOGLE_ID}', {
                  page_path: window.location.pathname,
                });
              `
            }}
          />
        </>
      )}
    </>
  )
}
const DebugPanel = dynamic(() => import('@/components/DebugPanel'), {
  ssr: false
})
const Analytics = dynamic(
  () =>
    import('@vercel/analytics/react').then(async m => {
      return m.Analytics
    }),
  { ssr: false }
)
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })
const Busuanzi = dynamic(() => import('@/components/Busuanzi'), { ssr: false })
const LoadingProgress = dynamic(() => import('@/components/LoadingProgress'), {
  ssr: false
})
const VConsole = dynamic(() => import('@/components/VConsole'), { ssr: false })
const CustomContextMenu = dynamic(
  () => import('@/components/CustomContextMenu'),
  { ssr: false }
)
const DisableCopy = dynamic(() => import('@/components/DisableCopy'), {
  ssr: false
})

export default ExternalPlugin
