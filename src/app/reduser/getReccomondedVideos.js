import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import parseReccomondedVIdeo from '../../utilities/parseReccomondedVIdeo'
const API_KEY = 'AIzaSyA4dDH6hDo2PPpo1V-cTbnC40GlTmMbUnY';

export const getReccomondedVideos = createAsyncThunk(
    'youtube/app/getReccomondedVideos',
    async (videoId, { getState}) => {
       try{
        const {
            youTubeApp: {currentPlaying: {
            channelInfo: { channelId }
          } 
        },
        } = getState();
        

        const response = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=videoId=${videoId}`
          );
      
            const items = response.data.items;

            const parsedData = await parseReccomondedVIdeo(items,videoId);

            return {parsedData}
       }catch(e){
        console.log(e);
        
       }
    }
);
