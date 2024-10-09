import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawToString } from "../../utilities/convertRawtoString";
import { timeSince } from "../../utilities/timeSince";

const API_KEY = 'AIzaSyA4dDH6hDo2PPpo1V-cTbnC40GlTmMbUnY';

export const getVideosDetails = createAsyncThunk(
  'youtube/app/getVideosDetails',
  async (id) => {
    try {
      const { data: { items } } = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics&id=${id}`
      );

      const parsedData = await parseData(items[0]);

      console.log(parsedData);
      return parsedData;
    } catch (e) {
      console.log(e);
    }
  }
);

const parseData = async (item) => {
  const { snippet, statistics, id } = item;
  
  // Fetch channel details
  const channelResponse = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${snippet.channelId}&key=${API_KEY}`
  );

  const channelInfo = channelResponse.data.items[0];

  return {
    videoId: id,
    videoTitle: snippet.title,
    videoDescription: snippet.description,
    videoViews: convertRawToString(statistics.viewCount),
    videoAge: timeSince(new Date(snippet.publishedAt)),
    likeVideos: convertRawToString(statistics.likeCount),
    channelInfo: {
      id: snippet.channelId,
      image: channelInfo.snippet.thumbnails.default.url,
      name: snippet.channelTitle,
      subscriber: convertRawToString(channelInfo.statistics.subscriberCount)
    },
  };
};
