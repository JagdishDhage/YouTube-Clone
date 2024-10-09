import React, {  useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import Navbar from "./Navbar";
import SideBar from "./Side-Bar";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

import { clearVideos } from "../feature/youtube/youtube";
import { getSearchPageVideos } from "../app/reduser/getSearchPageVideos";
function Search() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youTubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youTubeApp.searchTerm);
  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm == "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);
  return (
    <div className="max-h-screen overflow-auto">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>

      <div className="flex" style={{ height: "92.5vh" }}>
        <SideBar />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getSearchPageVideos(true))}
            hasMore={videos.length < 500}
            loader=<Spinner />
            height={650}
          >
            <div>
              <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
                {videos.map((item) => {
                  return <Card data={item} key={item.videoId} />
                })}
                ;
              </div>
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Search;
