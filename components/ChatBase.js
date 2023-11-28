import BLOG from '@/blog.config'

/**
 * This is an embeddable component that can display your chat-base dialog in full screen anywhere
 * There are currently no page references
 * Because you can directly embed the web page into your notice https://www.chatbase.co/chatbot-iframe/${BLOG.CHATBASE_ID}
 */
export default function ChatBase() {
  if (!BLOG.CHATBASE_ID) {
    return <></>
  }

  return (
    <iframe
      src={`https://www.chatbase.co/chatbot-iframe/${BLOG.CHATBASE_ID}`}
      width="100%"
      style={{ height: '100%', minHeight: '700px' }}
      frameborder="0"
    ></iframe>
  )
}
