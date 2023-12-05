/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import ReadPic from '@/public/images/read/So-I-Read-And-Write.png'
import Girok from '@/public/images/inspiration/girok.jpg'

import Bada from '@/public/images/thelog/bada.jpeg'
import BeKind from '@/public/images/thelog/bekind.jpeg'
import Learnt from '@/public/images/thelog/learnt.jpeg'
import SelfRespect from '@/public/images/thelog/self-respect.jpeg'
import TheLake from '@/public/images/thelog/thelake.jpeg'

import CONFIG from './config'

import BLOG from '@/blog.config'
import Comment from '@/components/Comment'
import CommonHead from '@/components/CommonHead'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import Tabs from '@/components/Tabs'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import Announcement from './components/Announcement'
import ArticleAround from './components/ArticleAround'
import ArticleInfo from './components/ArticleInfo'
import { ArticleLock } from './components/ArticleLock'
import BlogArchiveItem from './components/BlogArchiveItem'
import BlogPostBar from './components/BlogPostBar'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import BottomMenuBar from './components/BottomMenuBar'
import Catalog from './components/Catalog'
import CategoryGroup from './components/CategoryGroup'
import CategoryItem from './components/CategoryItem'
import Footer from './components/Footer'
import InfoCard from './components/InfoCard'
import JumpToTopButton from './components/JumpToTopButton'
import PortfolioItem from './components/PortfolioItem'
import ReadAndWriteItem from './components/ReadAndWriteItem'
import RevolverMaps from './components/RevolverMaps'
import SearchInput from './components/SearchInput'
import TagGroups from './components/TagGroups'
import TagItemMini from './components/TagItemMini'
import TocDrawer from './components/TocDrawer'
import TopNavBar from './components/TopNavBar'
import { Style } from './style'
import InspirationItem from './components/InspirationItem'
import TheLogitem from './components/TheLogitem'

// Topic global status
const ThemeGlobalMedium = createContext()
export const useMediumGlobal = () => useContext(ThemeGlobalMedium)

/**
 * basic layout
 * Adopt a layout on the left and right sides, and use the top navigation bar on the mobile terminal
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const {
    children,
    showInfoCard = true,
    slotRight,
    slotTop,
    siteInfo,
    notice,
    meta
  } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const [tocVisible, changeTocVisible] = useState(false)
  const { onLoading } = useGlobal()

  return (
    <ThemeGlobalMedium.Provider value={{ tocVisible, changeTocVisible }}>
      {/* SEO related */}
      <CommonHead meta={meta} />
      {/* CSSrelated */}
      <Style />

      <div
        id="theme-medium"
        className="bg-white dark:bg-hexo-black-gray w-full h-full min-h-screen justify-center dark:text-gray-300 dark:bg-black"
      >
        <main
          id="wrapper"
          className={
            (BLOG.LAYOUT_SIDEBAR_REVERSE ? 'flex-row-reverse' : '') +
            'relative flex justify-between w-full h-full mx-auto'
          }
        >
          {/*
Desktop left menu */}
          {/* <LeftMenuBar/> */}

          {/* Main area */}
          <div id="container-wrapper" className="w-full relative z-10">
            {/* top navigation bar */}
            <TopNavBar {...props} />

            <div
              id="container-inner"
              className="px-7 max-w-5xl justify-center mx-auto min-h-screen"
            >
              <Transition
                show={!onLoading}
                appear={true}
                enter="transition ease-in-out duration-700 transform order-first"
                enterFrom="opacity-0 translate-y-16"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="opacity-100"
                leaveTo="opacity-0 -translate-y-16"
                unmount={false}
              >
                {slotTop}
                {children}
              </Transition>

              <JumpToTopButton />
            </div>

            {/*
bottom */}
            <Footer title={siteInfo?.title} />
          </div>

          {/*
Right side of desktop */}
          <div
            className={`hidden xl:block border-l dark:border-transparent w-96 relative z-10 ${
              CONFIG.RIGHT_PANEL_DARK ? 'bg-hexo-black-gray dark' : ''
            }`}
          >
            <div className="py-14 px-6 sticky top-0">
              <Tabs>
                {slotRight}
                <div key={locale.NAV.ABOUT}>
                  {router.pathname !== '/search' && (
                    <SearchInput className="mt-6  mb-12" />
                  )}
                  {showInfoCard && <InfoCard {...props} />}
                  {CONFIG.WIDGET_REVOLVER_MAPS === 'true' && <RevolverMaps />}
                </div>
              </Tabs>
              <Announcement post={notice} />
              {/* <Live2D /> */}
            </div>
          </div>
        </main>

        {/* Mobile bottom navigation bar */}
        <BottomMenuBar {...props} className="block md:hidden" />
      </div>
    </ThemeGlobalMedium.Provider>
  )
}

/**
 *
front page
 * The homepage is a blog list
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} />
}

/**
 * Blog list
 * @returns
 */
const LayoutPostList = props => {
  const slotTop = <BlogPostBar {...props} />
  return (
    <LayoutBase {...props} slotTop={slotTop}>
      {BLOG.POST_LIST_STYLE === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </LayoutBase>
  )
}

/**
 * Article details
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, prev, next, lock, validPassword } = props
  const { locale } = useGlobal()
  const slotRight = post?.toc && post?.toc?.length >= 3 && (
    <div key={locale.COMMON.TABLE_OF_CONTENTS}>
      <Catalog toc={post?.toc} />
    </div>
  )

  return (
    <LayoutBase showInfoCard={true} slotRight={slotRight} {...props}>
      {/* Article lock */}
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && (
        <div id="article-wrapper">
          {/* Article information */}
          <ArticleInfo {...props} />

          {/* Notion article body */}
          <section className="px-1 max-w-4xl">
            {post && <NotionPage post={post} />}
          </section>

          {/* Article bottom area  */}
          <section>
            {/* share */}
            <ShareBar post={post} />
            {/* Article classification and tag information */}
            <div className="flex justify-between">
              {CONFIG.POST_DETAIL_CATEGORY && post?.category && (
                <CategoryItem category={post?.category} />
              )}
              <div>
                {CONFIG.POST_DETAIL_TAG &&
                  post?.tagItems?.map(tag => (
                    <TagItemMini key={tag.name} tag={tag} />
                  ))}
              </div>
            </div>
            {/* Previous articleNext article
             */}
            {post?.type !== 'CONFIG' &&
              post?.type !== 'Menu' &&
              post?.type !== 'SubMenu' &&
              post?.type !== 'Notice' &&
              post?.type !== 'Page' && (
                <ArticleAround prev={prev} next={next} />
              )}

            {/*
Comment area */}
            <Comment frontMatter={post} />
          </section>

          {/* Mobile directory */}
          <TocDrawer {...props} />
        </div>
      )}
    </LayoutBase>
  )
}

/**
 * search
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { locale } = useGlobal()
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  }, [])

  return (
    <LayoutBase {...props}>
      {/* Search navigation bar */}
      <div className="py-12">
        <div className="pb-4 w-full">{locale.NAV.SEARCH}</div>
        <SearchInput currentSearch={currentSearch} {...props} />
        {!currentSearch && (
          <>
            <TagGroups {...props} />
            <CategoryGroup {...props} />
          </>
        )}
      </div>

      {/* Article list */}
      {currentSearch && (
        <div>
          {BLOG.POST_LIST_STYLE === 'page' ? (
            <BlogPostListPage {...props} />
          ) : (
            <BlogPostListScroll {...props} />
          )}
        </div>
      )}
    </LayoutBase>
  )
}

// Portfolio 메뉴 레이아웃
const LayoutPortfolio = props => {
  const { portfolioPosts } = props
  // console.log('portfolioPosts', portfolioPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="flex flex-col">
          <div className="w-full mb-10">
            <div className="">
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
              {/* <Image src={ReadPic} alt="So-I-Read-And-Write" /> */}
              <div className="text-3xl dark:text-gray-300 ">
                What Ryoon have been made 🛠️
              </div>
              <div className=" dark:text-gray-300 mt-1 text-base ">
                10세이하 일 때엔 a4로 모델하우스를, 20대 중반엔 재미난 기획안을,
                28살 이후로는 크고 작은 개발을.
              </div>
            </div>
          </div>
          <div className="space-y-6 px-2">
            {portfolioPosts?.map((item, index) => {
              // console.log('item', item)
              // console.log(portfolioPosts[item.to])
              return (
                <PortfolioItem
                  key={index}
                  pIndex={index}
                  pId={item.id}
                  pTitle={item.title}
                  pPosts={item}
                />
              )
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

const LayoutTheLog = props => {
  const { theLogPosts } = props
  // console.log('theLogPosts', theLogPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="text-3xl dark:text-gray-300 mb-4 ">
          Our Life, Our Lives.
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 mr-20 h-full">
            <div className="w-full flex flex-row float-left  gap-4 mb-4 ">
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
              <Image
                src={Bada}
                alt="Bada"
                className="rounded-lg duration-500  hover:scale-110 "
              />
              <Image
                src={TheLake}
                alt="TheLake"
                className="rounded-lg duration-500  hover:scale-scale-110 "
              />
              <Image
                src={SelfRespect}
                alt="TheLake"
                className="rounded-lg duration-500  hover:scale-110 "
              />
            </div>
            <div className="w-full flex flex-row float-left gap-4 mb-4 ">
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
              <Image
                src={BeKind}
                alt="TheLake"
                className="rounded-lg duration-500  hover:scale-110  "
              />
              <Image
                src={Learnt}
                alt="TheLake"
                className="rounded-lg duration-500  hover:scale-110  "
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-10 bg-opacity-50 p-10 rounded-lg dark:bg-black dark:bg-opacity-70 bg-white">
            {Object.keys(theLogPosts)?.map(archiveTitle => {
              return (
                <TheLogitem
                  key={archiveTitle}
                  archiveTitle={archiveTitle}
                  archivePosts={theLogPosts}
                />
              )
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

/**
 * Inspiration 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutInspiration = props => {
  const { InspirationPosts } = props
  // console.log('InspirationPosts', InspirationPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="flex flex-row">
          <div className="w-1/2 mr-20">
            <div className="border-green-400 border-[1px] rounded-md  mb-2 p-2">
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
              <Image src={Girok} alt="So-I-Read-And-Write" />
              <div className="text-3xl dark:text-gray-300 mt-4 pb-2">
                어제, 오늘, 내일의 영감기록
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            {' '}
            {Object.keys(InspirationPosts)?.map(archiveTitle => {
              // console.log(archiveTitle)
              return (
                <InspirationItem
                  key={archiveTitle}
                  archiveTitle={archiveTitle}
                  archivePosts={InspirationPosts}
                />
              )
            })}
          </div>
        </div>
        <div className="w-1/2 text-base mb-2">
          어떻게, 어쩜, 언제부터 이건 그러하였고 너는 또 그리하였을까?
          감탄하게되는 크고 작은 앎에 대하여.
        </div>
      </div>
    </LayoutBase>
  )
}
/**
 * Read & Write 메뉴 레이아웃
 * @param {*} props
 * @returns
 */
const LayoutReadAndWrite = props => {
  const { readAndWritePosts } = props
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3  min-h-full">
        <div className="w-1/2 text-base  mb-2">
          읽고 쓰는 것은 자신의 세계를, 생각을 확장해 나가는 기록이다.
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 mr-20">
            <div className="">
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
              <Image src={ReadPic} alt="So-I-Read-And-Write" />
              <div className="text-3xl dark:text-gray-300 mt-4">
                So, I Read and Write.
              </div>
            </div>
          </div>
          {Object.keys(readAndWritePosts)?.map(archiveTitle => {
            // console.log(archiveTitle)
            return (
              <ReadAndWriteItem
                key={archiveTitle}
                archiveTitle={archiveTitle}
                archivePosts={readAndWritePosts}
              />
            )
          })}
        </div>
      </div>
    </LayoutBase>
  )
}

/**
 * Archive
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3  min-h-full">
        {Object.keys(archivePosts)?.map(archiveTitle => (
          <BlogArchiveItem
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archivePosts}
          />
        ))}
      </div>
    </LayoutBase>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  return (
    <LayoutBase {...props}>
      <div className="w-full h-96 py-80 flex justify-center items-center">
        404 Not found.
      </div>
    </LayoutBase>
  )
}

/**
 * Category List
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <LayoutBase {...props}>
      <div className="bg-white dark:bg-gray-700 py-10">
        <div className="dark:text-gray-200 mb-5">
          <i className="mr-4 fas fa-th" />
          {locale.COMMON.CATEGORY}:
        </div>
        <div id="category-list" className="duration-200 flex flex-wrap">
          {categoryOptions?.map(category => {
            return (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior
              >
                <div
                  className={
                    'hover:text-black dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600 px-5 cursor-pointer py-2 hover:bg-gray-100'
                  }
                >
                  <i className="mr-4 fas fa-folder" />
                  {category.name}({category.count})
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </LayoutBase>
  )
}

/**
 * tag list
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <LayoutBase {...props}>
      <div className="bg-white dark:bg-gray-700 py-10">
        <div className="dark:text-gray-200 mb-5">
          <i className="mr-4 fas fa-tag" />
          {locale.COMMON.TAGS}:
        </div>
        <div id="tags-list" className="duration-200 flex flex-wrap">
          {tagOptions?.map(tag => {
            return (
              <div key={tag.name} className="p-2">
                <TagItemMini key={tag.name} tag={tag} />
              </div>
            )
          })}
        </div>
      </div>
    </LayoutBase>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutPortfolio,
  LayoutReadAndWrite,
  LayoutInspiration,
  LayoutTheLog,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
