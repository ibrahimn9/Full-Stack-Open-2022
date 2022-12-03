import React from 'react'

const Content = (props) => {
  return (
    <div>
      <p>
        {props.part.part1} {props.ex.exercises1}
      </p>
      <p>
        {props.part.part2} {props.ex.exercises2}
      </p>
      <p>
        {props.part.part3} {props.ex.exercises3}
      </p>
    </div>
  )
}

export default Content