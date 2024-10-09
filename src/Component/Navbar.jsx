import React from 'react'
import { RxDragHandleHorizontal } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { RiVideoOnLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchTerm } from '../feature/youtube/youtube';
import { getSearchPageVideos } from '../app/reduser/getSearchPageVideos';
function Navbar() {
  const location =useLocation();
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const searchTerm = useSelector((state) => {
   return state.youTubeApp.searchTerm
  });

  
  const handleSearch = () => {
    console.log(location.pathname);
    if (location.pathname !== "/search") {
      navigate("/search");
    }

    
    else {
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };
  return (<>
             <div className='flex justify-between place-items-center px-14 h-14  text-white bg-[#212121] opacity-95 sticky'>
                <div className='flex gap-8 place-items-center text-2xl '>
                    <div>
                      <RxDragHandleHorizontal />
                    </div>
                     <div className='flex gap-2 place-items-center '>
                     <FaYoutube className='text-3xl text-red-500'/>
                     <span className='text-2xl '>YouTube</span>
                     </div>
                </div>     
                     <div className='flex place-items-center gap-5 justify-center'>
                        <form
                         onSubmit={(e)=>{
                          e.preventDefault();
                          handleSearch();
                        }}>
                            <div className='flex place-items-center gap-2 h-10 px-4 pr-0 bg-zinc-900 rounded-3xl'>
                                <div className='flex place-items-center pr-5  gap-5'>
                                    <input type='text'
                                     className='w-96 bg-zinc-900 focus:outline-none
                                      border-none' 
                                      placeholder='Search'
                                      value={searchTerm}
                                      onChange={e => dispatch(changeSearchTerm(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <button className='flex items-center justify-center rounded-r-3xl bg-zinc-800 h-10 w-16 '>
                                       <CiSearch className='text-xl'  />
                                    </button>
                                </div>
                            </div>
                        </form>
                        
                        <div className='rounded-full p-3 bg-zinc-900'>
                            <FaMicrophone className=' text-xl '/>
                        </div>
                        </div>    
                        <div className='flex items-center text-xl gap-8'>
                          <RiVideoOnLine/>  
                          <div className='relative'>
                          <IoMdNotifications/>
                          <span className='absolute bottom-2 left-3 text-xs bg-red-600 rounded-full p-1'>
                            9+
                            </span>
                           </div>
                           <div>
                              <img className='w-9 h-9 rounded-full' src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='profile-img'/>
                           </div>
                        </div>
                     
               
             </div>
    </>
  )
}

export default Navbar
