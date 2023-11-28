/* eslint-disable react/no-unknown-property */
/**
 * The style here only takes effect on the current theme
 * tailwindCSS is not supported here @apply grammar
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      // 底色
      .dark body {
        background-color: black;
      }
    `}</style>
  )
}

export { Style }
