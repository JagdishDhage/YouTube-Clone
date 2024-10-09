import { configureStore } from '@reduxjs/toolkit'
import youtubeReduser from '../feature/youtube/youtube'
export const store = configureStore({
  reducer: {
    youTubeApp:youtubeReduser,
  },
})