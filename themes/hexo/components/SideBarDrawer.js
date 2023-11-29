import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 *
Sidebar drawer panel that can be pulled out from the side
 * @returns {JSX.Element}
 * @constructor
 */
const SideBarDrawer = ({ children, isOpen, onOpen, onClose, className }) => {
  const router = useRouter()
  useEffect(() => {
    const sideBarDrawerRouteListener = () => {
      switchSideDrawerVisible(false)
    }
    router.events.on('routeChangeComplete', sideBarDrawerRouteListener)
    return () => {
      router.events.off('routeChangeComplete', sideBarDrawerRouteListener)
    }
  }, [router.events])

  // Click button to change side drawer status
  const switchSideDrawerVisible = showStatus => {
    if (showStatus) {
      onOpen && onOpen()
    } else {
      onClose && onClose()
    }
    const sideBarDrawer = window.document.getElementById('sidebar-drawer')
    const sideBarDrawerBackground = window.document.getElementById(
      'sidebar-drawer-background'
    )

    if (showStatus) {
      sideBarDrawer?.classList.replace('-mr-72', 'mr-0')
      sideBarDrawerBackground?.classList.replace('hidden', 'block')
    } else {
      sideBarDrawer?.classList.replace('mr-0', '-mr-72')
      sideBarDrawerBackground?.classList.replace('block', 'hidden')
    }
  }

  return (
    <div id="sidebar-wrapper" className={' block lg:hidden top-0 ' + className}>
      <div
        id="sidebar-drawer"
        className={`${
          isOpen ? 'mr-0 w-72 visible' : '-mr-72 max-w-side invisible'
        } bg-gray-50 right-0 top-0 dark:bg-hexo-black-gray shadow-black shadow-lg flex flex-col duration-300 fixed h-full overflow-y-scroll scroll-hidden z-30`}
      >
        {children}
      </div>

      {/* background mask */}
      <div
        id="sidebar-drawer-background"
        onClick={() => {
          switchSideDrawerVisible(false)
        }}
        className={`${
          isOpen ? 'block' : 'hidden'
        } animate__animated animate__fadeIn fixed top-0 duration-300 left-0 z-20 w-full h-full bg-black/70`}
      />
    </div>
  )
}
export default SideBarDrawer
