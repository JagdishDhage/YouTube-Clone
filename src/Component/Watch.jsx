import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { useNavigate } from "react-router-dom";
import { getReccomondedVideos } from "../app/reduser/getReccomondedVideos";
import { useParams } from "react-router-dom";
import { getVideosDetails } from "../app/reduser/getVideoDetails";
import Navbar from "./Navbar";
import { AiOutlineLike } from "react-icons/ai";
function Watch() {
  const { id } = useParams();
  console.log(id);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPlaying = useAppSelector(
    (state) => state.youTubeApp.currentPlaying
  );
  console.log(currentPlaying);

  const recommendedVideos = useAppSelector(
    (state) => state.youTubeApp.recommendedVideos
  );
  useEffect(() => {
    if (id) {
      dispatch(getVideosDetails(id));
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);
  useEffect(() => {
    if (currentPlaying && id) {
      dispatch(getReccomondedVideos(id));
    }
  }, [currentPlaying, dispatch, id]);
  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen overflow">
          <div style={{ height: "7.5vh" }}>
            <Navbar />
          </div>
          <div className="flex items-center gap-3 justify-around mt-5">
            <div className="max-w-4xl">
              <div>
                <iframe
                  src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                  frameBorder="0"
                  height="502"
                  width="896"
                  allow="fullscreen"
                  title="YouTubePlayer"
                ></iframe>
              </div>
              <div>
                <h1>{currentPlaying.videoTitle}</h1>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center  gap-5 my-5">
                  <div className="flex items-center justify-center gap-3">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={currentPlaying.channelInfo.image}
                    />
                    <div className="max-w-48">
                      <p className="text-xs">{currentPlaying.channelInfo.name}</p>
                      <p className="flex line-clamp-2 gap-1">122{currentPlaying.channelInfo.subscriber} <p>subscribers</p></p>
                    </div>
                  </div>
                  <button className="px-4 h-9 text-sm leading-9 text-black bg-white rounded-full">
                    {" "}
                    subscribe
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 h-9 text-sm leading-9  hover:bg-zinc-600 text-white bg-[#252525] rounded-full">
                   Like
                  </button>
                  <button className="px-4 h-9 text-sm leading-9  hover:bg-zinc-600 text-white bg-[#252525] rounded-full">
                    Dislike
                  </button>
                  <button className="px-4 h-9 text-sm leading-9  hover:bg-zinc-600 text-white bg-[#252525] rounded-full">
                    Shear
                  </button>
                  <button className="px-4 h-9 text-sm leading-9  hover:bg-zinc-600 text-white bg-[#252525] rounded-full">
                    Download
                  </button>
                  <button className="px-4 h-9 text-sm leading-9  hover:bg-zinc-600 text-white bg-[#252525] rounded-full">
                    Other
                  </button>
                </div>
              </div>
              <div>
                <p>{currentPlaying.videoDescription}</p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Watch;
