import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({ data }) => {

  return (<>

  <Link to={`/watch/${data.videoId}`}>

    <div className='w-64 h-64 flex flex-col gap-2'>
      <div className='relative'>
        <img className='h-44 w-full object-cover rounded-lg' src={data.videoThumbnail} alt='Video Thumbnail'/>
        <span className='absolute bottom-2 right-2 text-xs bg-gray-900 bg-opacity-75 px-2 py-0.5 rounded text-white z-10'>{data.videoDuration}</span>
      </div>
      
      <div className='flex gap-2 mt-2'>
        <div className='min-w-fit'>
          <a href='#'>
            <img className='h-9 w-9 rounded-full object-cover' src={data.channelInfo.image} alt='Channel Image'/>
          </a>  
        </div>
        <div className='flex flex-col justify-between'>
          <h3 className='text-sm font-medium text-white'>
            <a className='line-clamp-2 hover:text-gray-300' href='#'>{data.videoTitle}</a>
          </h3>
          <div className='text-xs text-gray-400 mt-1'>
            <a className='hover:text-white' href='#'>{data.channelInfo.name}</a>
            <div className='flex items-center text-xs text-gray-400'>
              <span>{data.videoViews} views</span>
              <span className="mx-1">•</span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
    </>
  )
}

export default Card
