import BLOG from '@/blog.config'
import { siteConfig } from '../config'
/**
 * Compress Pictures
 * 1.Notion image bed can compress and crop images by specifying url-query parameters, for example?xx=xx&width=400
 * 2. UnPlash pictures can control the compression quality through api q=50 width=400 control the picture size
 * @param {*} image
 */
const compressImage = (image, width = 800, quality = 50, fmt = 'webp') => {
  if (!image || image.indexOf('http') !== 0) {
    return image
  }

  if (!width || width === 0) {
    width = siteConfig('IMAGE_COMPRESS_WIDTH')
  }

  // 将URL解析为一个对象
  const urlObj = new URL(image)
  // 获取URL参数
  const params = new URLSearchParams(urlObj.search)

  if (
    image.indexOf(BLOG.NOTION_HOST) === 0 &&
    image.indexOf('amazonaws.com') > 0
  ) {
    params.set('width', width)
    params.set('cache', 'v2')
    // 生成新的URL
    urlObj.search = params.toString()
    return urlObj.toString()
  } else if (image.indexOf('https://images.unsplash.com/') === 0) {
    // Parse URL into an object
    const urlObj = new URL(image)
    // Get URL parameters
    // Replace the value of the q parameter with
    params.set('q', quality)
    // size
    params.set('width', width)
    // Format
    params.set('fmt', fmt)
    params.set('fm', fmt)
    // Generate new URL
    urlObj.search = params.toString()
    return urlObj.toString()
  } else if (image.indexOf('https://your_picture_bed') === 0) {
    // You can also add your custom image transmission cover image compression parameters here.
    // .e.g
    return 'do_somethin_here'
  }

  return image
}

/**
 * Image mapping
 * 1. If it is /xx.xx relative path format, it will be converted into a complete notification domain name image
 * 2. If it is a bookmark type block picture cover, there is no need to process it.
 * @param {*} img
 * @param {*} value
 * @returns
 */
const mapImgUrl = (img, block, type = 'block', needCompress = true) => {
  if (!img) {
    return null
  }
  let ret = null
  // Relative directories are regarded as the notation's own pictures.
  if (img.startsWith('/')) {
    ret = BLOG.NOTION_HOST + img
  } else {
    ret = img
  }

  // Notion 图床转换为永久地址
  const hasConverted =
    ret.indexOf('https://www.notion.so/image') === 0 ||
    ret.includes('notion.site/images/page-cover/')
  // 需要转化的URL ; 识别aws图床地址，或者bookmark类型的外链图片
  const needConvert =
    !hasConverted &&
    (block.type === 'bookmark' ||
      ret.includes('secure.notion-static.com') ||
      ret.includes('prod-files-secure'))

  // 使用Notion图传
  if (needConvert) {
    ret =
      BLOG.NOTION_HOST +
      '/image/' +
      encodeURIComponent(ret) +
      '?table=' +
      type +
      '&id=' +
      block.id
  }

  if (!isEmoji(ret) && ret.indexOf('notion.so/images/page-cover') < 0) {
    if (BLOG.RANDOM_IMAGE_URL) {
      // 무작위 사진 인터페이스가 구성된 경우에만 사진이 교체됩니다.
      const texts = BLOG.RANDOM_IMAGE_REPLACE_TEXT
      let isReplace = false
      if (texts) {
        const textArr = texts.split(',')
        // 대체 텍스트가 포함되어 있는지 확인
        textArr.forEach(text => {
          if (ret.indexOf(text) > -1) {
            isReplace = true
          }
        })
      } else {
        isReplace = true
      }

      if (isReplace) {
        ret = BLOG.RANDOM_IMAGE_URL
      }
    }
    // 각 기사의 이미지 URL이 고유하도록 이미지 URL 최적화
    if (
      ret &&
      ret.length > 4 &&
      !ret.includes('https://www.notion.so/images/')
    ) {
      // 그림 인터페이스는 요청된 그림이 버퍼링되는 것을 방지하기 위해 고유한 식별 매개변수를 연결하여 동일한 무작위 결과를 초래합니다.
      const separator = ret.includes('?') ? '&' : '?'
      ret = `${ret.trim()}${separator}t=${block.id}`
    }
  }

  // Article cover
  if (needCompress) {
    const width = block?.format?.block_width
    ret = compressImage(ret, width)
  }

  return ret
}

function isEmoji(str) {
  const emojiRegex =
    /[\u{1F300}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}]/u
  return emojiRegex.test(str)
}

export { mapImgUrl, compressImage }
