import React from 'react'
import BLOG from '@/blog.config'

/**
 * Wanwei advertising plug-in
 * @param {string} orientation -Ad direction, can be 'vertical' or 'horizontal'
 * @param {boolean} sticky - Whether sticky positioning
 * @returns {JSX.Element | null} - Returns the rendered JSX element or null
 */
export default function WWAds({
  orientation = 'vertical',
  sticky = false,
  className
}) {
  if (!JSON.parse(BLOG.AD_WWADS_ID)) {
    return null
  }

  return (
    <div
      className={`wwads-cn ${
        orientation === 'vertical' ? 'wwads-vertical' : 'wwads-horizontal'
      } ${sticky ? 'wwads-sticky' : ''} z-10 ${className || ''}`}
      data-id={BLOG.AD_WWADS_ID}
    ></div>
  )
}
