import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className='text-center'>
            <h1 className="p-2 text-3xl font-bold">Loading...</h1>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    </div>
  )
}

export default Loading
