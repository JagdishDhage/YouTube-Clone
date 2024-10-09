import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from '../../utilities/parseData';

const API_KEY = 'AIzaSyA4dDH6hDo2PPpo1V-cTbnC40GlTmMbUnY';

export const getSearchPageVideos = createAsyncThunk(
    'youtube/app/homePageVideos',
    async (isNext, { getState}) => {
       try{
        const {
            youTubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
        } = getState();
        

            const response = await axios.get(
                `https://youtube.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
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
