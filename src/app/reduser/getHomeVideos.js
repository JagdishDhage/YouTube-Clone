import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from '../../utilities/parseData';

const API_KEY = 'AIzaSyA4dDH6hDo2PPpo1V-cTbnC40GlTmMbUnY';

export const getHomeVideos = createAsyncThunk(
    'youtube/app/searchPageVideos',
    async (isNext, { getState}) => {
       try{
        const {
            youTubeApp: { nextPageToken: nextPageTokenFromState, videos },
        } = getState();
        

            const response = await axios.get(
                `https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="drop x out"&key=${API_KEY}&part=snippet&type=video&${
            isNext ? `pageToken=${nextPageTokenFromState}` : ""
          }`
            );

            

            const items = response.data.items;
          
        
            const parsedData = await parseData(items);

            return {parsedData:[...videos,...parsedData],nextPageToken : nextPageTokenFromState}
       }catch(e){
        console.log(e);
        
       }
    }
);
