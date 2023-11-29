import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
import { MenuItemDrop } from './MenuItemDrop'

export const MenuListTop = props => {
  const { customNav, customMenu } = props
  const { locale } = useGlobal()

  let links = [
    {
      id: 1,
      icon: 'fa-solid fa-house',
      name: locale.NAV.INDEX,
      to: '/',
      show: siteConfig('HEXO_MENU_INDEX', null, CONFIG)
    },
    {
      id: 2,
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      to: '/search',
      show: siteConfig('HEXO_MENU_SEARCH', null, CONFIG)
    },
    {
      id: 3,
      icon: 'fa-solid fa-folder-closed',
      name: locale.NAV.ARCHIVE,
      to: '/archive',
      show: siteConfig('HEXO_MENU_ARCHIVE', null, CONFIG)
    },
    {
      id: 4,
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      to: '/category',
      show: siteConfig('MENU_CATEGORY', null, CONFIG)
    },
    {
      id: 5,
      icon: 'fa-solid fa-book',
      name: locale.NAV.READ,
      to: '/read',
      show: siteConfig('HEXO_MENU_READ', null, CONFIG)
    },
    {
      id: 6,
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      to: '/tag',
      show: siteConfig('MENU_TAG', null, CONFIG)
    },
    {
      id: 7,
      icon: 'fa-solid fa-hand-sparkles',
      name: locale.NAV.PORTFOLIO,
      to: '/portfolio',
      show: siteConfig('HEXO_MENU_PORTFOLIO', null, CONFIG)
    },
    {
      id: 8,
      icon: 'fa-solid fa-hat-wizard',
      name: locale.NAV.INSPIRATION,
      to: '/inspiration',
      show: siteConfig('HEXO_MENU_INSPIRATION', null, CONFIG)
    }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  for (let i = 0; i < links.length; i++) {
    if (links[i].id !== i) {
      links[i].id = i
    }
  }

  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
    <>
      <nav
        id="nav-mobile"
        className="leading-8 justify-center font-light w-full flex"
      >
        {links?.map(
          link =>
            link && link.show && <MenuItemDrop key={link?.id} link={link} />
        )}
      </nav>
    </>
  )
}
