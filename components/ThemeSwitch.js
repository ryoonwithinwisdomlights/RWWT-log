import { useGlobal } from '@/lib/global'
import React, { useState } from 'react'
import { Draggable } from './Draggable'
import { THEMES } from '@/themes/theme'
import { useRouter } from 'next/router'
import DarkModeButton from './DarkModeButton'
/**
 *
 * @returns theme switching
 */
const ThemeSwitch = () => {
  const { theme } = useGlobal()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Modify the current path url theme parameter
  // For example http://localhost?theme=hexo redirect to http://localhost?theme=newTheme
  const onSelectChange = e => {
    setIsLoading(true)
    const newTheme = e.target.value
    const query = router.query
    query.theme = newTheme
    router.push({ pathname: router.pathname, query }).then(() => {
      setIsLoading(false)
    })
  }

  return (
    <>
      <Draggable>
        <div
          id="draggableBox"
          style={{ left: '10px', top: '80vh' }}
          className="fixed z-50 dark:text-white bg50 dark:bg-black rounded-2xl drop-shadow-lg"
        >
          <div className="p-3 w-full flex items-center text-sm group duration-200 transition-all">
            <DarkModeButton className="mr-2" />
            <div className="w-0 group-hover:w-20 transition-all duration-200 overflow-hidden">
              <select
                value={theme}
                onChange={onSelectChange}
                name="themes"
                className="appearance-none outline-none dark:text-white bg-neutral-50 dark:bg-black uppercase cursor-pointer"
              >
                {THEMES?.map(t => {
                  return (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  )
                })}
              </select>
            </div>
            <i className="fa-solid fa-palette pl-2"></i>
          </div>
        </div>
        {/* Toggle full screen mask when theme loads */}
        <div
          className={`${
            isLoading ? 'opacity-50 ' : 'opacity-0'
          } w-screen h-screen bg-black text-white shadow-text flex justify-center items-center
                              transition-all fixed top-0 left-0 pointer-events-none duration-1000 z-50 shadow-inner`}
        >
          <i className="text-3xl mr-5 fas fa-spinner animate-spin" />
        </div>
      </Draggable>
    </>
  )
}

export default ThemeSwitch
