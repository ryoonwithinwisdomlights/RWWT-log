import { isIterable } from '../utils'

/**
 * Get tags of all articles
 * @param allPosts
 * @param sliceCount The default number of interceptions is 12, if it is 0, all will be returned
 * @param subTypeOptions drop-down options for tags
 * @returns {Promise<{}|*[]>}
 */

/**
 * Get the categories of all articles
 * @param allPosts
 * @returns {Promise<{}|*[]>}
 */
export function getAllSubtypes({ allPages, subTypeOptions, sliceCount = 0 }) {
  // console.log('getAllSubtypes::::::::::::::::::::', subTypeOptions)
  const allPosts = allPages?.filter(
    page =>
      page.type !== 'CONFIG' &&
      page.type !== 'Menu' &&
      page.type !== 'SubMenu' &&
      page.type !== 'Notice' &&
      page.type !== 'Page'
    // page.status === 'Published'
  )
  if (!allPosts || !subTypeOptions) {
    return []
  }
  // count
  let subTypes = allPosts?.filter(p => p.sub_type !== '').map(p => p.sub_type)
  console.log('subTypes??', subTypes)
  subTypes = [...subTypes.flat()]
  const subTypeObj = {}
  subTypes.forEach(subType => {
    if (subType in subTypeObj) {
      subTypeObj[subType]++
    } else {
      subTypeObj[subType] = 1
    }
  })
  const list = []
  if (isIterable(subTypeOptions)) {
    for (const c of subTypeOptions) {
      const count = subTypeObj[c.value]
      if (count) {
        list.push({ id: c.id, name: c.value, color: c.color, count })
      }
    }
  }

  // Sort by quantity
  // list.sort((a, b) => b.count - a.count)
  if (sliceCount && sliceCount > 0) {
    return list.slice(0, sliceCount)
  } else {
    return list
  }
}
