/* eslint-disable no-unused-vars */
import { siteConfig } from '@/lib/config'

/**
 * Social contact button set
 * @returns {JSX.Element}
 * @constructor
 */
const SocialButton = () => {
  const CONTACT_GITHUB = siteConfig('CONTACT_GITHUB')
  const CONTACT_TWITTER = siteConfig('CONTACT_TWITTER')
  const CONTACT_LINKEDIN = siteConfig('CONTACT_LINKEDIN')
  const CONTACT_INSTAGRAM = siteConfig('CONTACT_INSTAGRAM')
  const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')

  return (
    <div className="space-x-3 text-xl text-neutral-600 dark:text-neutral-400 flex-wrap flex justify-center ">
      {CONTACT_GITHUB && (
        <a
          target="_blank"
          rel="noreferrer"
          title={'github'}
          href={CONTACT_GITHUB}
        >
          <i className="fab fa-github transform hover:scale-125 duration-150 hover:text-yellow-400" />
        </a>
      )}
      {CONTACT_TWITTER && (
        <a
          target="_blank"
          rel="noreferrer"
          title={'twitter'}
          href={CONTACT_TWITTER}
        >
          <i className="fab fa-twitter transform hover:scale-125 duration-150 hover:text-yellow-400" />
        </a>
      )}
      {CONTACT_LINKEDIN && (
        <a
          target="_blank"
          rel="noreferrer"
          href={CONTACT_LINKEDIN}
          title={'linkedIn'}
        >
          <i className="transform hover:scale-125 duration-150 fab fa-linkedin dark:hover:text-yellow-400 hover:text-yellow-600" />
        </a>
      )}
      {CONTACT_INSTAGRAM && (
        <a
          target="_blank"
          rel="noreferrer"
          title={'instagram'}
          href={CONTACT_INSTAGRAM}
        >
          <i className="fab fa-instagram transform hover:scale-125 duration-150 hover:text-yellow-600" />
        </a>
      )}
      {CONTACT_EMAIL && (
        <a
          target="_blank"
          rel="noreferrer"
          title={'email'}
          href={`mailto:${CONTACT_EMAIL}`}
        >
          <i className="fas fa-envelope transform hover:scale-125 duration-150 hover:text-yellow-400" />
        </a>
      )}
      {/* {JSON.parse(BLOG.ENABLE_RSS) && (
        <a target="_blank" rel="noreferrer" title={'RSS'} href={'/feed'}>
          <i className="fas fa-rss transform hover:scale-125 duration-150 hover:text-yellow-600" />
        </a>
      )} */}
    </div>
  )
}
export default SocialButton
