/* eslint-disable multiline-ternary */
import CONFIG from './config'
import ReadPic from '@/public/images/read/So-I-Read-And-Write.png'
import Girok from '@/public/images/inspiration/girok.jpg'
import CommonHead from '@/components/CommonHead'
import { useEffect, useRef } from 'react'
import Footer from './components/Footer'
import SideRight from './components/SideRight'
import TopNav from './components/TopNav'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import Hero from './components/Hero'
import { useRouter } from 'next/router'
import Card from './components/Card'
import RightFloatArea from './components/RightFloatArea'
import SearchNav from './components/SearchNav'
import BlogPostArchive from './components/BlogPostArchive'
import { ArticleLock } from './components/ArticleLock'
import PostHeader from './components/PostHeader'
import JumpToCommentButton from './components/JumpToCommentButton'
import TocDrawer from './components/TocDrawer'
import TocDrawerButton from './components/TocDrawerButton'
import Comment from '@/components/Comment'
import NotionPage from '@/components/NotionPage'
import ArticleAdjacent from './components/ArticleAdjacent'
import ArticleCopyright from './components/ArticleCopyright'
import ArticleRecommend from './components/ArticleRecommend'
import ShareBar from '@/components/ShareBar'
import TagItemMini from './components/TagItemMini'
import Link from 'next/link'
import SlotBar from './components/SlotBar'
import { Transition } from '@headlessui/react'
import { Style } from './style'
import replaceSearchResult from '@/components/Mark'
import { siteConfig } from '@/lib/config'
import Image from 'next/image'
import InspirationItem from './components/InspirationItem'
import PortfolioItem from './components/PortfolioItem'
import ReadAndWriteItem from './components/ReadAndWriteItem'

/**
 * 基础布局 采用左右两侧布局，移动端使用顶部导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, headerSlot, floatSlot, slotTop, meta, className } = props
  const { onLoading } = useGlobal()

  return (
    <div id="theme-hexo">
      {/* 网页SEO */}
      <CommonHead meta={meta} />
      <Style />

      {/* 顶部导航 */}
      <TopNav {...props} />

      {/* 顶部嵌入 */}
      <Transition
        show={!onLoading}
        appear={true}
        enter="transition ease-in-out duration-700 transform order-first"
        enterFrom="opacity-0 -translate-y-16"
        enterTo="opacity-100"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 translate-y-16"
        unmount={false}
      >
        {headerSlot}
      </Transition>

      {/* 主区块 */}
      <main
        id="wrapper"
        className={`${
          siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) ? '' : ''
        } bg-hexo-background-gray dark:bg-black w-full py-8 md:px-8 lg:px-24 min-h-screen relative`}
      >
        <div
          id="container-inner"
          className={
            (JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE'))
              ? 'flex-row-reverse'
              : '') +
            ' w-full mx-auto lg:flex lg:space-x-4 justify-center relative z-10'
          }
        >
          <div
            className={`${
              className || ''
            } w-full max-w-4xl h-full overflow-hidden`}
          >
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
              {/* 主区上部嵌入 */}
              {slotTop}

              {children}
            </Transition>
          </div>

          {/* 右侧栏 */}
          <SideRight {...props} />
        </div>
      </main>

      {/* 悬浮菜单 */}
      <RightFloatArea floatSlot={floatSlot} />

      {/* 页脚 */}
      <Footer title={siteConfig('TITLE')} />
    </div>
  )
}

/**
 * 首页
 * 是一个博客列表，嵌入一个Hero大图
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  const headerSlot = siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) && (
    <Hero {...props} />
  )
  return <LayoutPostList {...props} headerSlot={headerSlot} className="pt-8" />
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  return (
    <LayoutBase {...props} className="pt-8">
      <SlotBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </LayoutBase>
  )
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  })

  return (
    <LayoutBase {...props} currentSearch={currentSearch} className="pt-8">
      {!currentSearch ? (
        <SearchNav {...props} />
      ) : (
        <div id="posts-wrapper">
          {' '}
          {siteConfig('POST_LIST_STYLE') === 'page' ? (
            <BlogPostListPage {...props} />
          ) : (
            <BlogPostListScroll {...props} />
          )}{' '}
        </div>
      )}
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
  console.log('InspirationPosts', InspirationPosts)
  return (
    <LayoutBase {...props} className="pt-8">
      <Card className="w-full">
        <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full bg-white md:p-12 p-3  dark:bg-hexo-black-gray">
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
          <div className="w-1/2 text-base mb-2">
            어떻게, 어쩜, 언제부터 이건 그러하였고 너는 또 그리하였을까?
            감탄하게되는 크고 작은 앎에 대하여.
          </div>
        </div>
      </Card>
    </LayoutBase>
  )
}

// Portfolio 메뉴 레이아웃
const LayoutPortfolio = props => {
  const { portfolioPosts } = props
  // console.log('portfolioPosts', portfolioPosts)
  return (
    <LayoutBase {...props} className="pt-8">
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
    <LayoutBase {...props} className="pt-8">
      <Card className="w-full">
        <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full bg-white md:p-12 p-3  dark:bg-hexo-black-gray">
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
      </Card>
    </LayoutBase>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <LayoutBase {...props} className="pt-8">
      <Card className="w-full">
        <div className="mb-10 pb-20 bg-white md:p-12 p-3 min-h-full dark:bg-hexo-black-gray">
          {Object.keys(archivePosts).map(archiveTitle => (
            <BlogPostArchive
              key={archiveTitle}
              posts={archivePosts[archiveTitle]}
              archiveTitle={archiveTitle}
            />
          ))}
        </div>
      </Card>
    </LayoutBase>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const drawerRight = useRef(null)

  const targetRef = isBrowser
    ? document.getElementById('article-wrapper')
    : null

  const floatSlot = (
    <>
      {post?.toc?.length > 1 && (
        <div className="block lg:hidden">
          <TocDrawerButton
            onClick={() => {
              drawerRight?.current?.handleSwitchVisible()
            }}
          />
        </div>
      )}
      <JumpToCommentButton />
    </>
  )

  return (
    <LayoutBase
      {...props}
      headerSlot={<PostHeader {...props} />}
      showCategory={false}
      showTag={false}
      floatSlot={floatSlot}
    >
      <div className="w-full lg:hover:shadow lg:border rounded-t-xl lg:rounded-xl lg:px-2 lg:py-4 bg-white dark:bg-hexo-black-gray dark:border-black article">
        {lock && <ArticleLock validPassword={validPassword} />}

        {!lock && (
          <div
            id="article-wrapper"
            className="overflow-x-auto flex-grow mx-auto md:w-full md:px-5 "
          >
            <article
              itemScope
              itemType="https://schema.org/Movie"
              className="subpixel-antialiased overflow-y-hidden"
            >
              {/* Notion文章主体 */}
              <section className="px-5 justify-center mx-auto max-w-2xl lg:max-w-full">
                {post && <NotionPage post={post} />}
              </section>

              {/* 分享 */}
              <ShareBar post={post} />
              {post?.type === 'Post' && (
                <>
                  <ArticleCopyright {...props} />
                  <ArticleRecommend {...props} />
                  <ArticleAdjacent {...props} />
                </>
              )}
            </article>

            <div className="pt-4 border-dashed"></div>

            {/* 评论互动 */}
            <div className="duration-200 overflow-x-auto bg-white dark:bg-hexo-black-gray px-3">
              <Comment frontMatter={post} />
            </div>
          </div>
        )}
      </div>

      <div className="block lg:hidden">
        <TocDrawer post={post} cRef={drawerRight} targetRef={targetRef} />
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
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      if (isBrowser) {
        const article = document.getElementById('notion-article')
        if (!article) {
          router.push('/').then(() => {
            // console.log('找不到页面', router.asPath)
          })
        }
      }
    }, 3000)
  })
  return (
    <LayoutBase {...props}>
      <div className="text-black w-full h-screen text-center justify-center content-center items-center flex flex-col">
        <div className="dark:text-gray-200">
          <h2 className="inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top">
            404
          </h2>
          <div className="inline-block text-left h-32 leading-10 items-center">
            <h2 className="m-0 p-0">页面未找到</h2>
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <LayoutBase {...props} className="mt-8">
      <Card className="w-full min-h-screen">
        <div className="dark:text-gray-200 mb-5 mx-3">
          <i className="mr-4 fas fa-th" /> {locale.COMMON.CATEGORY}:
        </div>
        <div id="category-list" className="duration-200 flex flex-wrap mx-8">
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
                    ' duration-300 dark:hover:text-white px-5 cursor-pointer py-2 hover:text-indigo-400'
                  }
                >
                  <i className="mr-4 fas fa-folder" /> {category.name}(
                  {category.count})
                </div>
              </Link>
            )
          })}
        </div>
      </Card>
    </LayoutBase>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <LayoutBase {...props} className="mt-8">
      <Card className="w-full">
        <div className="dark:text-gray-200 mb-5 ml-4">
          <i className="mr-4 fas fa-tag" /> {locale.COMMON.TAGS}:
        </div>
        <div id="tags-list" className="duration-200 flex flex-wrap ml-8">
          {tagOptions.map(tag => (
            <div key={tag.name} className="p-2">
              <TagItemMini key={tag.name} tag={tag} />
            </div>
          ))}
        </div>
      </Card>
    </LayoutBase>
  )
}

export {
  CONFIG as THEME_CONFIG,
  LayoutIndex,
  LayoutSearch,
  LayoutArchive,
  LayoutReadAndWrite,
  LayoutPortfolio,
  LayoutInspiration,
  LayoutSlug,
  Layout404,
  LayoutCategoryIndex,
  LayoutPostList,
  LayoutTagIndex
}
