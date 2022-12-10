import React from 'react'

const Content = ({part, ex}) => {
  return (
    <div>
      <p>
        {part.part1} {ex.exercises1}
      </p>
      <p>
        {part.part2} {ex.exercises2}
      </p>
      <p>
        {part.part3} {ex.exercises3}
      </p>
    </div>
  )
}

export default Content