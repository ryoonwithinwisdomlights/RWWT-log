/* eslint-disable no-unused-vars */
import Link from 'next/link'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
/**
 * Home navigation big button component
 * @param {*} props
 * @returns
 */
const NavButtonGroup = props => {
  const { categoryOptions } = props
  if (!categoryOptions || categoryOptions.length === 0) {
    return <></>
  }

  return (
    <nav
      id="home-nav-button"
      className="w-full z-10 md:h-48 md:mt-6 xl:mt-32 px-5 py-2
      flex flex-row md:max-w-6xl space-y-2
      md:space-y-0 md:flex justify-center items-center

      "
    >
      <Carousel
        className="w-5/6"
        showArrows={true}
        centerMode={true}
        centerSlidePercentage={20}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
      >
        {categoryOptions?.map(category => {
          return (
            <Link
              key={`${category.name}`}
              title={`${category.name}`}
              href={`/category/${category.name}`}
              passHref
              className="text-center shadow-text sm:w-4/5 md:mx-6  md:h-14
             lg:h-20 h-14 justify-center items-center flex border-2 cursor-pointer
            rounded-lg bg-white  bg-opacity-50 hover:bg-opacity-70
             hover:text-lime-100 duration-200 hover:scale-105 transform"
            >
              {category.name}
            </Link>
          )
        })}
      </Carousel>
    </nav>
  )
}
export default NavButtonGroup
