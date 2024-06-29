/* eslint-disable no-unused-vars */
import OmniSlider from '@/components/OmniSlider'
import { TempleGray } from '@/components/Temple'
import React, { useEffect, useState } from 'react'
import TheLogitem from './TheLogitem'
import OmniDocItem from './OmniDocItem'

const OmnisDoctrinaIntro = ({ props }) => {
  const { OmnisDoctrinaLog, subTypeOptions } = props
  // console.log('OmnisDoctrinaLog--', OmnisDoctrinaLog)
  // console.log('subTypeOptions--', subTypeOptions)

  const [docsSubType, setDocsSubType] = useState('All')
  const [filteredOmniDocPosts, setFilteredOmniDocPosts] = useState({})

  const handleDocSubType = text => {
    console.log('text::', text)

    setDocsSubType(text)
    // OmnisDoctrinaLog
  }
  useEffect(() => {
    console.log('sssss', OmnisDoctrinaLog[docsSubType])
    // const newOmniDoclogs = Object.keys(OmnisDoctrinaLog)?.map(omni => {
    //   console.log('omni[docsSubType]', omni)
    //   return omni[docsSubType]
    // })
    // console.log('newOmniDoclogs', newOmniDoclogs)
    if (docsSubType === 'All') {
      setFilteredOmniDocPosts(OmnisDoctrinaLog)
    } else {
      setFilteredOmniDocPosts(OmnisDoctrinaLog[docsSubType])
    }
  }, [docsSubType])

  useEffect(() => {
    setFilteredOmniDocPosts(OmnisDoctrinaLog)
  }, [])

  return (
    <div className="md:px-16 flex flex-col  items-center">
      <div className=" w-[80%] flex flex-col justify-start items-center gap-4">
        <div className=" flex flex-row  gap-4 md:text-lg justify-start items-start w-full">
          <div
            onClick={() => {
              handleDocSubType('All')
            }}
            className=" bg-neutral-100  h-10  hover:scale-110 duration-150  rounded-lg px-4  flex flex-row text-center  items-center justify-center whitespace-nowrap "
          >
            전체 ({Object.keys(OmnisDoctrinaLog).length})
          </div>
          {Object.keys(OmnisDoctrinaLog)?.map((omnis, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  handleDocSubType(omnis)
                }}
                className=" bg-neutral-100  h-10  hover:scale-110 duration-150 rounded-lg px-4  flex flex-row text-center  items-center justify-center whitespace-nowrap "
              >
                {omnis}
              </div>
            )
          })}
        </div>
        <OmniSlider />
      </div>
      <div>
        <div className="flex flex-row mt-12">
          <div className="w-1/2 !md:mr-20 h-full ">
            <div className=" md:pl-20 flex flex-row float-left gap-4 mb-4 ">
              <TempleGray />
            </div>
          </div>
          <div className="w-full flex flex-col gap-10 bg-opacity-30 p-10 rounded-lg dark:bg-black dark:bg-opacity-70 bg-white">
            {
              // if(filteredOmniDocPosts){

              // }else{

              // }
              Object.keys(filteredOmniDocPosts)?.map(omni => {
                console.log('omni::', omni)
                return (
                  <OmniDocItem
                    key={omni}
                    sub_type={omni}
                    docsSubType={docsSubType}
                    omniDocPosts={filteredOmniDocPosts}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default OmnisDoctrinaIntro
