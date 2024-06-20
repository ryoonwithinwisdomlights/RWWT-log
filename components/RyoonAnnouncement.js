// import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))
// 공지사항전용
const RyoonAnnouncement = ({ notice, className }) => {
  //   const { locale } = useGlobal()
  if (notice?.blockMap) {
    return (
      <div className={className}>
        <section
          id="announcement-wrapper"
          className="dark:text-neutral-300 rounded-xl px-2 bg-red-400 "
        >
          <div>
            <i className="mr-2 fas fa-bullhorn" />
            공지사항
          </div>
          {notice && (
            <div id="announcement-content">
              <NotionPage post={notice} />
            </div>
          )}
        </section>
      </div>
    )
  } else {
    return <></>
  }
}
export default RyoonAnnouncement
