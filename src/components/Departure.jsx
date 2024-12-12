import React from 'react'
import "./departure.css";
const Departure = ({name, time, direction}) => {
  return (
    <div className='departure'>
      <p>{name}</p>
      <p>{time}</p>
      <p>{direction}</p>
    </div>
  )
}

export default Departure