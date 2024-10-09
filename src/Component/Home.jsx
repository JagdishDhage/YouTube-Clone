import React, { useState ,useEffect} from 'react'
import {useAppDispatch,useAppSelector} from '../hooks/useApp'
import { getHomeVideos } from '../app/reduser/getHomeVideos';
import Navbar from './Navbar'
import SideBar from './Side-Bar'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card';
function Home() {
  const dispatch=useAppDispatch();
  const videos=useAppSelector((state)=>state.youTubeApp.videos);
  
  useEffect(()=>{
    dispatch(getHomeVideos(false));
   
  },[dispatch])
  return (
    <div className='max-h-screen overflow-hidden'>
    <div style={{height:"7.5vh"}}>
    <Navbar/>
    
    </div>
    
    <div className='flex' style={{height:"92.5vh"}}>  
       <SideBar/>
       {
      videos.length? (
        <InfiniteScroll
        dataLength={videos.length}
        next={()=>dispatch(getHomeVideos(true))}
        hasMore={videos.length<500}
        loader=<Spinner/>
        height={650}
        >
          <div>
              
                <div className='grid gap-y-14 gap-x-9 grid-cols-4 p-8'>
                {videos.map((item)=>{
                  return <Card data={item} key={item.videoId}/>
                })};
                </div>
              
          </div>
        </InfiniteScroll>):(
          <Spinner/>
        )
    }
       </div>
    </div>
  )
}

export default Home
