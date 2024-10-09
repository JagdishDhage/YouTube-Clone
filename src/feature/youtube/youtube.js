import { createSlice } from '@reduxjs/toolkit';
import { getSearchPageVideos } from '../../app/reduser/getSearchPageVideos';
import { getHomeVideos } from '../../app/reduser/getHomeVideos';
import { getReccomondedVideos } from '../../app/reduser/getReccomondedVideos';
import { getVideosDetails } from '../../app/reduser/getVideoDetails';
const initialState = {
    videos: [],
    currentPlaying: null,
    searchTerm: "",
    searchResult: [],
    nextPageToken: null,
    recommendedVideos: []
};

export const youTubeSlice = createSlice({
    name: 'youTubeApp',
    initialState,
    reducers: {
        clearVideos:(state)=>{
            state.videos = [];
            state.nextPageToken=null;
        },
        changeSearchTerm:(state,action)=>{
            state.searchTerm=action.payload
            
            
        },
        clearSearchTerm:(state)=>{
            state.searchTerm=""
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getHomeVideos.fulfilled, (state, action) => {
            if (action.payload && action.payload.parsedData) {
                state.videos = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            }
        });
        builder.addCase(getReccomondedVideos.fulfilled, (state, action) => {
            if (action.payload && action.payload.parsedData) {
                state.recommendedVideos = action.payload.parsedData;
                
            }
        });
        builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
            if (action.payload && action.payload.parsedData) {
                state.videos = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            }
        });
        builder.addCase(getVideosDetails.fulfilled, (state, action) => {
            
                state.currentPlaying = action.payload;
                console.log("hello",action.payload);
             
                
                
                
            
        });
    },
});
export const {clearVideos,changeSearchTerm,clearSearchTerm}=youTubeSlice.actions
export default youTubeSlice.reducer;
