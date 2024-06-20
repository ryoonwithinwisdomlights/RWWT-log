import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * Sidebar drawer panel that can be pulled out from the side
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
      sideBarDrawer?.classList.replace('-ml-60', 'ml-0')
      sideBarDrawerBackground?.classList.replace('hidden', 'block')
    } else {
      sideBarDrawer?.classList.replace('ml-0', '-ml-60')
      sideBarDrawerBackground?.classList.replace('block', 'hidden')
    }
  }

  return (
    <div id="sidebar-wrapper" className={' block lg:hidden top-0 ' + className}>
      <div
        id="sidebar-drawer"
        className={`${
          isOpen ? 'ml-0 w-60 visible' : '-ml-60 max-w-side invisible'
        } bg-white dark:bg-neutral-900 shadow-black shadow-lg flex flex-col duration-300 fixed h-full left-0 overflow-y-scroll scroll-hidden top-0 z-30`}
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
