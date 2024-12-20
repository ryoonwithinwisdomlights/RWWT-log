import NotionPage from '@/components/NotionPage'
import Link from 'next/link'
import TagItemMini from './TagItemMini'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/formatDate'

/**
 * Portfolio list text content
 * @param {*} param0
 * @returns
 */
export const SideprojectCardInfo = ({
  post,
  showPreview,
  showPageCover,
  showSummary
}) => {
  return (
    <div
      className={`flex flex-col justify-between lg:p-6 p-4   ${
        showPageCover && !showPreview ? 'md:w-7/12 w-full  ' : 'w-full'
      }`}
    >
      <div className="w-full">
        <Link
          href={`${siteConfig('SUB_PATH', '')}/${post.slug}`}
          passHref
          className={`line-clamp-2 replace cursor-pointer text-2xl ${
            showPreview ? 'text-center' : ''
          } leading-tight font-normal text-neutral-600  hover:text-red-400`}
        >
          <span className="menu-link ">{post.title}</span>
        </Link>

        {/* Classification */}
        {post?.category && (
          <div
            className={`flex mt-2 items-center ${
              showPreview ? 'justify-center' : 'justify-start'
            } flex-wrap dark:text-neutral-500 text-neutral-400 `}
          >
            <Link
              href={`/category/${post.category}`}
              passHref
              className="cursor-pointer font-light text-sm menu-link hover:text-red-400 dark:hover:text-red-400 transform"
            >
              <i className="mr-1 far fa-folder" />
              {post.category}
            </Link>
            <span className="text-xs">
              &nbsp;&nbsp;&nbsp;{' '}
              {post.password !== '' && (
                <i className="fa-solid fa-lock">&nbsp;비공개</i>
              )}
            </span>
          </div>
        )}

        {/* Summary */}
        {(!showPreview || showSummary) && !post.results && (
          <p className="line-clamp-2 replace my-3 text-neutral-500  dark:text-neutral-500 text-sm font-light leading-7">
            {post.summary}
          </p>
        )}

        {/* search results */}
        {post.results && (
          <p className="line-clamp-2 mt-4 text-neutral-700 dark:text-neutral-300 text-sm font-light leading-7">
            {post.results.map((r, index) => (
              <span key={index}>{r}</span>
            ))}
          </p>
        )}
        {/* Preview */}
        {showPreview && (
          <div className="overflow-ellipsis truncate">
            <NotionPage post={post} />
          </div>
        )}
      </div>

      <div className="w-full ">
        {/* date label */}
        <div className="text-neutral-400 justify-between flex">
          {/* date */}
          <Link
            href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
            passHref
            className="font-light menu-link cursor-pointer text-sm leading-4 mr-3"
          >
            <i className="far fa-calendar-alt mr-1" />
            {post?.publishDay || post.lastEditedDay}
          </Link>

          <div className="md:flex-nowrap overflow-hidden flex-wrap md:justify-start inline-block">
            <div>
              {' '}
              {post.tagItems?.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
