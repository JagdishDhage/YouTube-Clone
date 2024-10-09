import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from 'react-router-dom';
const SideBar = () => {
    const main=[
        {
            icon:<Link to={'/'}><GoHomeFill className='text-xl' /></Link>,
            name:"Home"
        },
        {
            icon:<SiYoutubeshorts className='text-xl' />,
            name:"Shorts"
        },
        {
            icon:<MdSubscriptions className='text-xl' />,
            name:"Subscriptions"
        }
    ]
    const other=[
        {
            icon:<MdOutlineVideoLibrary className='text-xl' />,
            name:"Library"
        },
        {
            icon:<MdOutlineHistory className='text-xl' />,
            name:"History"
        },
        {
            icon:<MdOutlineWatchLater className='text-xl' />,
            name:"WatchLater"
        },
        {
            icon:<AiOutlineLike className='text-xl' />,
            name:"Like Videos"
        }
    ]
  return (
  
      <div className=' p-2 pr-5  w-2/12 pb-8 overflow-auto h-screen bg-[#212121]'>
        <ul className='flex flex-col border-b-2 border-gray-500'>
            {
                main.map(({icon,name})=>{
                    return(
                        <li className=' pl-6 py-3 rounded-xl hover:bg-zinc-600 bg-black-600' key={name}>
                            <a className='flex items-center gap-5 '>{icon}
                            <span className='text-sm tracking-wider'>{name}</span>
                            </a>
                        </li>
                    )
                })
            }
        </ul>
        <ul className='flex flex-col  border-gray-500'>
            {
                other.map(({icon,name})=>{
                    return(
                        <li className=' pl-6 py-3 rounded-xl hover:bg-zinc-600 bg-black-600' key={name}>
                            <a className='flex items-center gap-5 '>{icon}
                            <span className='text-sm tracking-wider'>{name}</span>
                            </a>
                        </li>
                    )
                })
            }
        </ul>
      </div>
    
  )
}

export default SideBar
