/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none;
`

const SliderContent = styled.div`
  display: flex;
  gap: 1rem;
  padding-left: 50px;
  padding-right: 50px;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${props => props.translate}px);
`

const Slide = styled.div`
  font-family: sans-serif;
  height: 28px;
  margin: 0 2px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  overflow: visible;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  vertical-align: baseline;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  border: 0.0625rem solid rgb(206, 212, 218);
  border-radius: 2rem;
  height: 1.75rem;
  width: auto;
`

const Button = styled.button`
  font-family: sans-serif;
  font-size: 2rem;
  display: block;
  box-sizing: border-box;
  position: absolute;

  flex-direction: row;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgb(248, 200, 6);
  color: #fff;
  border: 0.0625rem solid rgb(206, 212, 218);
  border-radius: 2rem;
  height: 1.75rem;
  width: auto;

  line-height: calc(1.75rem);
  padding-left: 0.85rem;
  padding-right: 0.85rem;
  cursor: pointer;
  white-space: nowrap;

  &:focus,
  &:hover {
    outline: 0;
    background: rgb(255, 211, 37);
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const PrevButton = styled(Button)`
  left: 0px;
`

const NextButton = styled(Button)`
  right: 0;
`

const CustomedSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slides = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`)

  const slideWidth = 108 // 100px + 2px (left margin) + 2px (right margin)
  const maxIndex = slides.length / 7

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0))
  }

  const handleNext = () => {
    console.log('currentIndex:::::', currentIndex)
    console.log('maxIndex:::::', maxIndex)
    if (currentIndex !== maxIndex) {
      setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex))
    }
  }

  return (
    <Container>
      <PrevButton onClick={handlePrev}>{'<'}</PrevButton>
      <SliderContent translate={-currentIndex * slideWidth}>
        {/* {slides.map((slide, index) => (
          <Slide key={index}>{slide}</Slide>
        ))} */}
        <Slide> 전체 </Slide>
        <Slide> Typesrcipt</Slide>
        <Slide> 웹 접근성</Slide>
        <Slide> 디자인시스템</Slide>
        <Slide> Design Patterns</Slide>
        <Slide> Rendering Patterns</Slide> <Slide> Performance Patterns</Slide>
        <Slide> 네트워크</Slide>
        <Slide>상태관리</Slide>
        <Slide>Javascript</Slide>
      </SliderContent>
      <NextButton onClick={handleNext}>{'>'}</NextButton>
    </Container>
  )
}

export default CustomedSlider
