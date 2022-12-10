import React from 'react'
import Part from './Part'

const ContentP = ({part, ex}) => {
  const {part1, part2, part3} = part;
  const {exercises1, exercises2, exercises3} = ex;

  return (
    <div>
      <Part part={part1} ex={exercises1} />
      <Part part={part2} ex={exercises2} />
      <Part part={part3} ex={exercises3} />
    </div>
  )
}

export default ContentP