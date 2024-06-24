import { loadExternalResource } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function LoadingProgress() {
  const router = useRouter()
  const [NProgress, setNProgress] = useState(null)
  // 로딩상황 표시
  useEffect(() => {
    loadExternalResource(
      'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.js',
      'js'
    ).then(() => {
      if (window.NProgress) {
        setNProgress(window.NProgress)

        window.NProgress.settings.minimun = 0.1
        loadExternalResource(
          'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.css',
          'css'
        )
      }
    })

    const handleStart = url => {
      NProgress?.start()
    }

    const handleStop = () => {
      NProgress?.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeError', handleStop)
    router.events.on('routeChangeComplete', handleStop)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
}
