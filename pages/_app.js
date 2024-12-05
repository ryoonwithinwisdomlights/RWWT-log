'use client'
// import '@/styles/animate.css' // @see https://animate.style/
import '@/styles/globals.css'
import '@/styles/nprogress.css'
import '@/styles/utility-patterns.css'

// core styles shared by all of react-notion-x (required)
import '@/styles/notion.css' //  Override some styles
import 'react-notion-x/src/styles.css'

import { GlobalContextProvider } from '@/lib/global'

import BLOG from '@/blog.config'
import { isBrowser, loadExternalResource } from '@/lib/utils'
import dynamic from 'next/dynamic'

// Various extensions, animations, etc.
const ExternalPlugins = dynamic(() => import('@/components/ExternalPlugins'))

export default function MyApp({ Component, pageProps }) {
  // Introduction of custom style css and js
  if (isBrowser) {
    // Static import of local custom styles
    loadExternalResource('/css/custom.css', 'css')
    loadExternalResource('/js/custom.js', 'js')

    // Automatically add shadows to pictures
    if (BLOG.IMG_SHADOW) {
      loadExternalResource('/css/img-shadow.css', 'css')
    }

    // Import external custom scripts
    if (BLOG.CUSTOM_EXTERNAL_JS && BLOG.CUSTOM_EXTERNAL_JS.length > 0) {
      for (const url of BLOG.CUSTOM_EXTERNAL_JS) {
        loadExternalResource(url, 'js')
      }
    }

    // Import external custom styles
    if (BLOG.CUSTOM_EXTERNAL_CSS && BLOG.CUSTOM_EXTERNAL_CSS.length > 0) {
      for (const url of BLOG.CUSTOM_EXTERNAL_CSS) {
        loadExternalResource(url, 'css')
      }
    }
  }

  return (
    <GlobalContextProvider {...pageProps}>
      <Component {...pageProps} />
      <ExternalPlugins {...pageProps} />
    </GlobalContextProvider>
  )
}
