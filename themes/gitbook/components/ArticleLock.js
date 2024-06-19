import { useGlobal } from '@/lib/global'
import { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'

/**
 * Encrypted article verification component
 * @param {password, validPassword} props
 * @param password correct password
 * @param validPassword(bool) Callback function, verify that the correct callback input parameter is true
 * @returns
 */
export const ArticleLock = props => {
  const { validPassword } = props
  const { locale } = useGlobal()

  const submitPassword = () => {
    const p = document.getElementById('password')
    if (!validPassword(p?.value)) {
      const tips = document.getElementById('tips')
      if (tips) {
        tips.innerHTML = ''
        tips.innerHTML = `<div class='text-red-500 animate__shakeX animate__animated'>${locale.COMMON.PASSWORD_ERROR}</div>`
      }
    }
  }

  const historGoBack = () => {
    window.history.back()
  }

  const passwordInputRef = useRef(null)
  useEffect(() => {
    // Select the password input box and focus it
    passwordInputRef.current.focus()
  }, [])

  return (
    <div
      id="container"
      className="w-full flex flex-col justify-center items-center h-96 "
    >
      <div className="text-center  flex flex-row ">
        <div>
          {' '}
          <div className="font-bold text-lg p-0 m-0">
            비밀번호를 입력하세요.
          </div>
          {/* <p className="text-sm">{locale.COMMON.ARTICLE_LOCK_TIPS}</p> */}
          <p className="text-sm">{locale.COMMON.ARTICLE_LOCK_TIPS}</p>
        </div>
        <div className="flex mx-4">
          <input
            id="password"
            type="password"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                submitPassword()
              }
            }}
            ref={passwordInputRef} // Bind ref to passwordInputRef variable
            className="outline-none w-full text-sm pl-5 rounded-l transition focus:shadow-lg dark:text-gray-300 font-light leading-10 text-black bg-gray-100 dark:bg-gray-500"
          ></input>
          <div
            onClick={submitPassword}
            className="px-3 whitespace-nowrap cursor-pointer items-center justify-center py-2 bg-yellow-400 hover:bg-yellow-300 text-white rounded-r duration-300"
          >
            <i className={'duration-200 cursor-pointer fas fa-key'}>
              {/* &nbsp;{locale.COMMON.SUBMIT} */}
              &nbsp; 입력완료
            </i>
          </div>
        </div>
        <Button
          onClick={historGoBack}
          className=" px-3 whitespace-nowrap cursor-pointer items-center justify-center py-2  hover:bg-yellow-300  hover:text-white text-black rounded-r duration-300"
        >
          뒤로가기
        </Button>
        <div id="tips"></div>
      </div>
    </div>
  )
}
