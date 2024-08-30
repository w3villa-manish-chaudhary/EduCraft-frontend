'use client'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../Redux/features/counterSlice'

const page = () => {
  const count = useSelector((state) => state.counterSlice.value)
  const dispatch = useDispatch()

  return (
    <div className='mt-5 z-2'>
      <div className='mt-5 z-3'>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default page;
