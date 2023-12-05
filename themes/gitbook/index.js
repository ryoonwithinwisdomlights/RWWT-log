/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use client'

import ReadPic from '@/public/images/read/So-I-Read-And-Write.png'
import Bada from '@/public/images/thelog/bada.jpeg'
import BeKind from '@/public/images/thelog/bekind.jpeg'
import Learnt from '@/public/images/thelog/learnt.jpeg'
import SelfRespect from '@/public/images/thelog/self-respect.jpeg'
import TheLake from '@/public/images/thelog/thelake.jpeg'
import Girok from '@/public/images/inspiration/girok.jpg'
import BLOG from '@/blog.config'
import Comment from '@/components/Comment'
import CommonHead from '@/components/CommonHead'
import { AdSlot } from '@/components/GoogleAdsense'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import Announcement from './components/Announcement'
import ArticleAround from './components/ArticleAround'
import ArticleInfo from './components/ArticleInfo'
import { ArticleLock } from './components/ArticleLock'
import BlogArchiveItem from './components/BlogArchiveItem'
import BlogPostListPage from './components/BlogPostListPage'
import Catalog from './components/Catalog'
import CategoryItem from './components/CategoryItem'
import FloatTocButton from './components/FloatTocButton'
import Footer from './components/Footer'
import InfoCard from './components/InfoCard'
import JumpToTopButton from './components/JumpToTopButton'
import NavPostList from './components/NavPostList'
import PageNavDrawer from './components/PageNavDrawer'
import RevolverMaps from './components/RevolverMaps'
import SearchInput from './components/SearchInput'
import TagItemMini from './components/TagItemMini'
import TocDrawer from './components/TocDrawer'
import TopNavBar from './components/TopNavBar'
import CONFIG from './config'
import { Style } from './style'
import Image from 'next/image'
import ReadAndWriteItem from './components/ReadAndWriteItem'
import PortfolioItem from './components/PortfolioItem'
import InspirationItem from './components/InspirationItem'
import TheLogitem from './components/TheLogitem'
import GuestBookItem from './components/GuestBookItem'
import TechLogItem from './components/TechLogItem'
const WWAds = dynamic(() => import('@/components/WWAds'), { ssr: false })

// Theme global variables
const ThemeGlobalGitbook = createContext()
export const useGitBookGlobal = () => useContext(ThemeGlobalGitbook)

/**
 * 기본 레이아웃
 * 왼쪽, 오른쪽 레이아웃을 채택하고, 모바일 단말기 상단 내비게이션 바를 활용하세요.
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, post, allNavPages, slotLeft, slotRight, slotTop, meta } =
    props
  const { onLoading } = useGlobal()
  const router = useRouter()
  const [tocVisible, changeTocVisible] = useState(false)
  const [pageNavVisible, changePageNavVisible] = useState(false)
  const [filteredNavPages, setFilteredNavPages] = useState(allNavPages)

  const showTocButton = post?.toc?.length > 1

  useEffect(() => {
    setFilteredNavPages(allNavPages)
  }, [post])

  return (
    <ThemeGlobalGitbook.Provider
      value={{
        tocVisible,
        changeTocVisible,
        filteredNavPages,
        setFilteredNavPages,
        allNavPages,
        pageNavVisible,
        changePageNavVisible
      }}
    >
      <CommonHead meta={meta} />
      <Style />

      <div
        id="theme-gitbook"
        className="bg-white dark:bg-hexo-black-gray w-full h-full min-h-screen justify-center dark:text-gray-300 dark:bg-black"
      >
        {/* 상단 네비게이션 바 */}
        <TopNavBar {...props} />

        <main
          id="wrapper"
          className={
            (BLOG.LAYOUT_SIDEBAR_REVERSE ? 'flex-row-reverse' : '') +
            'relative flex justify-between w-full h-full mx-auto'
          }
        >
          {/* 왼쪽 네브바 */}
          <div
            className={
              'font-sans hidden md:block border-r dark:border-transparent relative z-10 '
            }
          >
            <div className="w-72  px-6 sticky top-0 overflow-y-scroll my-16 h-screen ">
              {slotLeft}
              <SearchInput className="my-3 rounded-md" />
              <div className="mb-20">
                {/* 모든 기사 목록 */}
                <NavPostList filteredNavPages={filteredNavPages} />
              </div>
            </div>

            <div className="w-72 fixed left-0 bottom-0 z-20 bg-white dark:bg-black">
              <Footer {...props} />
            </div>
          </div>

          <div
            id="center-wrapper"
            className="flex flex-col justify-between w-full relative z-10 pt-14 min-h-screen"
          >
            <div
              id="container-inner"
              className="w-full px-7 max-w-3xl justify-center mx-auto"
            >
              {slotTop}
              <WWAds className="w-full" orientation="horizontal" />

              <Transition
                show={!onLoading}
                appear={true}
                enter="transition ease-in-out duration-700 transform order-first"
                enterFrom="opacity-0 translate-y-16"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-16"
                unmount={false}
              >
                {children}
              </Transition>

              {/* Google ads */}
              <AdSlot type="in-article" />
              <WWAds className="w-full" orientation="horizontal" />

              {/* Back button */}
              <JumpToTopButton />
            </div>

            {/* bottom */}
            <div className="md:hidden">
              <Footer {...props} />
            </div>
          </div>

          {/*  오른쪽 슬라이딩 서랍 */}
          <div
            style={{ width: '32rem' }}
            className={'hidden xl:block dark:border-transparent relative z-10 '}
          >
            <div className="py-14 px-6 sticky top-0">
              <ArticleInfo post={props?.post ? props?.post : props.notice} />

              <div className="py-4">
                <Catalog {...props} />
                {slotRight}
                {/* {router.route === '/' && ( */}
                <>
                  <InfoCard {...props} />
                  {CONFIG.WIDGET_REVOLVER_MAPS === 'true' && <RevolverMaps />}
                  {/* <Live2D /> */}
                </>
                {/* )} */}
                {/* gitbook 테마 홈페이지에는 공지사항만 표시됩니다. */}
                <Announcement {...props} />
              </div>

              <AdSlot type="in-article" />
            </div>
          </div>
        </main>

        {/* Mobile floating directory button */}
        {showTocButton && !tocVisible && (
          <div className="md:hidden fixed right-0 bottom-52 z-30 bg-white border-l border-t border-b dark:border-gray-800 rounded">
            <FloatTocButton {...props} />
          </div>
        )}

        {/* 모바일 탐색 창 */}
        <PageNavDrawer {...props} filteredNavPages={filteredNavPages} />

        {/* 모바일 하단 탐색 메뉴 */}
        {/* <BottomMenuBar {...props} className='block md:hidden' /> */}
      </div>
    </ThemeGlobalGitbook.Provider>
  )
}

/**
 * 첫 장
 * 기사 세부정보 페이지로 리디렉션
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  const router = useRouter()
  useEffect(() => {
    router.push(CONFIG.INDEX_PAGE).then(() => {
      // console.log('지정된 홈페이지로 이동', CONFIG.INDEX_PAGE)
      setTimeout(() => {
        if (isBrowser) {
          const article = document.getElementById('notion-article')
          if (!article) {
            console.log(
              'Please check if your Notion database contains this slug page： ',
              CONFIG.INDEX_PAGE
            )
            const containerInner = document.querySelector(
              '#theme-gitbook #container-inner'
            )
            const newHTML = `<h1 class="text-3xl pt-12  dark:text-gray-300">Configuration error</h1><blockquote class="notion-quote notion-block-ce76391f3f2842d386468ff1eb705b92"><div>请在您的notion中添加一个slug为${CONFIG.INDEX_PAGE}的文章</div></blockquote>`
            containerInner?.insertAdjacentHTML('afterbegin', newHTML)
          }
        }
      }, 7 * 1000)
    })
  }, [])

  return <LayoutBase {...props} />
}

/**
 * 기사 목록 없음
 * 모두 페이지 탐색에 따라 다릅니다.
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  return (
    <LayoutBase {...props}>
      <div className="mt-10">
        <BlogPostListPage {...props} />
      </div>
    </LayoutBase>
  )
}

/**
 * 기사 세부정보
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, prev, next, lock, validPassword } = props

  return (
    <LayoutBase {...props}>
      {/* 기사 잠금 */}
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && (
        <div id="container">
          {/* title */}
          <h1 className="text-3xl pt-12  dark:text-gray-300">{post?.title}</h1>

          {/* Notion기사 본문 */}
          {post && (
            <section id="article-wrapper" className="px-1">
              <NotionPage post={post} />

              {/* share */}
              <ShareBar post={post} />
              {/* Article classification and tag information */}
              <div className="flex justify-between">
                {CONFIG.POST_DETAIL_CATEGORY && post?.category && (
                  <CategoryItem category={post.category} />
                )}
                <div>
                  {CONFIG.POST_DETAIL_TAG &&
                    post?.tagItems?.map(tag => (
                      <TagItemMini key={tag.name} tag={tag} />
                    ))}
                </div>
              </div>

              {post?.type !== 'CONFIG' &&
                post?.type !== 'Menu' &&
                post?.type !== 'SubMenu' &&
                post?.type !== 'Notice' &&
                post?.type !== 'Page' &&
                post?.status === 'Published' && (
                  <ArticleAround prev={prev} next={next} />
                )}
              <AdSlot />
              <WWAds className="w-full" orientation="horizontal" />

              <Comment frontMatter={post} />
            </section>
          )}

          <TocDrawer {...props} />
        </div>
      )}
    </LayoutBase>
  )
}

/**
 * 검색 없음
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  return <LayoutBase {...props}></LayoutBase>
}

/**
 * GuestBook (방명록) 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutGuestBook = props => {
  const { GuestBookPosts } = props
  // console.log('theLogPosts', theLogPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="text-3xl dark:text-gray-300 mb-4 ">GuestBook</div>
        <div className="flex flex-row">
          <div className="w-full flex flex-col gap-10 bg-opacity-30 p-10 rounded-lg dark:bg-black dark:bg-opacity-70 bg-white">
            {Object.keys(GuestBookPosts)?.map(archiveTitle => {
              return (
                <GuestBookItem
                  key={archiveTitle}
                  archiveTitle={archiveTitle}
                  archivePosts={GuestBookPosts}
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
 * TheLog(일상기록) 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
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
          <div className="w-full flex flex-col gap-10 bg-opacity-30 p-10 rounded-lg dark:bg-black dark:bg-opacity-70 bg-white">
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
      </div>
    </LayoutBase>
  )
}

// LayoutTechLog 테크 로그 레이아웃
const LayoutTechLog = props => {
  const { techLogPosts } = props
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
                Today I Learn 🛠️
              </div>
            </div>
          </div>
          <div className="space-y-6 px-2">
            {techLogPosts?.map((item, index) => {
              // console.log('item', item)
              // console.log(portfolioPosts[item.to])
              return (
                <TechLogItem
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

/**
 * Read & Write 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutReadAndWrite = props => {
  const { readAndWritePosts } = props
  // console.log('readAndWritePosts', readAndWritePosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="w-1/2 text-base mb-2">
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
          <div className="flex flex-col gap-10">
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
      </div>
    </LayoutBase>
  )
}

/**
 * 아카이브 페이지는 거의 사용되지 않습니다.
 * All depends on page navigation
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
 */
const LayoutTagIndex = props => {
  console.log('props Tag:', props)
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
  LayoutGuestBook,
  LayoutTheLog,
  LayoutReadAndWrite,
  LayoutTechLog,
  LayoutPortfolio,
  LayoutInspiration,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
