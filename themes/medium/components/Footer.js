import React from 'react'
import BLOG from '@/blog.config'
import DarkModeButton from '@/components/DarkModeButton'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const copyrightDate = (function () {
    if (Number.isInteger(BLOG.SINCE) && BLOG.SINCE < currentYear) {
      return BLOG.SINCE + '-' + currentYear
    }
    return currentYear
  })()

  return (
    <footer className="z-10 dark:bg-hexo-black-gray flex-shrink-0 justify-center text-center m-auto w-full leading-6 text-sm p-6 relative">
      <DarkModeButton />
      <i className="fas fa-copyright" /> {`${copyrightDate}`}{' '}
      <span>
        {/* <i className="mx-1 animate-pulse fas fa-heart" />{' '} */}
        <a
          href={BLOG.LINK}
          className="underline font-bold text-gray-500 dark:text-gray-300 "
        >
          {BLOG.AUTHOR}
        </a>
        .<br />
        {/* <h1>{title}</h1> */}
        <span className="text-xs font-serif">
          Powered by{' '}
          <a
            href="https://github.com/tangly1024/NotionNext"
            className="underline text-gray-500 dark:text-gray-300"
          >
            NotionNext {BLOG.VERSION}
          </a>
          .
        </span>
        <span className="text-xs font-serif">
          Customized by
          <a
            href="https://github.com/ryoon-with-wisdomtrees/RyoonLog"
            className="underline text-gray-500 dark:text-gray-300"
          >
            RyoonLog {BLOG.VERSION}
          </a>
          .
        </span>
      </span>
    </footer>
  )
}

export default Footer
