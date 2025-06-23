import React from 'react'
import Spinner from './Spinner'

interface Props {
  svgStyle?: string
}

const FullSpinner = ({ svgStyle = 'text-1stop-highlight' }: Props) => {
  return (
    <div className='flex w-full items-center justify-center py-10'>
      <Spinner svgStyle={svgStyle} />
    </div>
  )
}

export default FullSpinner
