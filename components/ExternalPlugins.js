import BLOG from 'blog.config'
import dynamic from 'next/dynamic'

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

// const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })
const Busuanzi = dynamic(() => import('@/components/Busuanzi'), { ssr: false })
const GoogleAdsense = dynamic(() => import('@/components/GoogleAdsense'), {
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

const ExternalPlugin = props => {
  return (
    <>
      {JSON.parse(BLOG.DEBUG) && <DebugPanel />}
      {BLOG.ANALYTICS_GOOGLE_ID && <Gtag />}
      {BLOG.ANALYTICS_VERCEL && <Analytics />}
      {JSON.parse(BLOG.ANALYTICS_BUSUANZI_ENABLE) && <Busuanzi />}
      {BLOG.ADSENSE_GOOGLE_ID && <GoogleAdsense />}
      {JSON.parse(BLOG.CUSTOM_RIGHT_CLICK_CONTEXT_MENU) && (
        <CustomContextMenu {...props} />
      )}
      {!JSON.parse(BLOG.CAN_COPY) && <DisableCopy />}
      <VConsole />
    </>
  )
}

export default ExternalPlugin
