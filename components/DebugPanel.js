/* eslint-disable multiline-ternary */
import BLOG from '@/blog.config'
import { useEffect, useState } from 'react'
import { useGlobal } from '@/lib/global'

/**
 *
 * @returns Debug panel
 */
const DebugPanel = () => {
  const [show, setShow] = useState(false)
  const { locale } = useGlobal()
  const [siteConfig, updateSiteConfig] = useState({})

  useEffect(() => {
    updateSiteConfig(Object.assign({}, BLOG))
    // updateThemeConfig(Object.assign({}, ThemeMap[BLOG.THEME].THEME_CONFIG))
  }, [])

  function toggleShow() {
    setShow(!show)
  }
  function filterResult(text) {
    switch (text) {
      case 'true':
        return <span className="text-green-500">true</span>
      case 'false':
        return <span className="text-red-500">false</span>
      case '':
        return '-'
    }
    return text
  }

  return (
    <>
      {/* debug button */}
      <div>
        <div
          style={{ writingMode: 'vertical-lr' }}
          className={`bg-black text-xs text-white shadow-2xl p-1.5 rounded-l-xl cursor-pointer ${
            show ? 'right-96' : 'right-0'
          } fixed bottom-72 duration-200 z-50`}
          onClick={toggleShow}
        >
          {show ? (
            <i className="fas fa-times">&nbsp;{locale.COMMON.DEBUG_CLOSE}</i>
          ) : (
            <i className="fas fa-tools">&nbsp;{locale.COMMON.DEBUG_OPEN}</i>
          )}
        </div>
      </div>

      {/* Debugging side pull drawers */}
      <div
        className={` ${
          show ? 'shadow-card w-96 right-0 ' : '-right-96 invisible w-0'
        } overflow-y-scroll h-full p-5 bg-white fixed bottom-0 z-50 duration-200`}
      >
        <div className="flex justify-between space-x-1 my-5">
          <div className="p-2">
            <i className="fas fa-times" onClick={toggleShow} />
          </div>
        </div>

        <div>
          {/* <div>
                        <div className="font-bold w-18 border-b my-2">
                            Theme configuration{`config_${debugTheme}.js`}:
                        </div>
                        <div className="text-xs">
                            {Object.keys(themeConfig).map(k => (
                                <div key={k} className="justify-between flex py-1">
                                    <span className="bg-indigo-500 p-0.5 rounded text-white mr-2">
                                        {k}
                                    </span>
                                    <span className="whitespace-nowrap">
                                        {filterResult(themeConfig[k] + '')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div> */}
          <div className="font-bold w-18 border-b my-2">
            사이트 구성 [blog.config.js]
          </div>
          <div className="text-xs">
            {siteConfig &&
              Object.keys(siteConfig).map(k => (
                <div key={k} className="justify-between flex py-1">
                  <span className="bg-blue-500 p-0.5 rounded text-white mr-2">
                    {k}
                  </span>
                  <span className="whitespace-nowrap">
                    {filterResult(siteConfig[k] + '')}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default DebugPanel
