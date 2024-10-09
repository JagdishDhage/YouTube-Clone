import axios from 'axios';
import { parseVideoDuration } from './parseVideoDuration';
import { convertRawToString } from './convertRawtoString';
import { timeSince } from './timeSince';

const API_KEY = 'AIzaSyA4dDH6hDo2PPpo1V-cTbnC40GlTmMbUnY';

const parseReccomondedVIdeo = async (items) => {
  try {
    const videoIds = [];
    const channelIds = [];

    // Collect video and channel IDs
    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    });

    // Fetch channel details
    const { data: { items: channelsData } } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parsedChannelsData = channelsData.map((channel) => ({
      id: channel.id,
      image: channel.snippet.thumbnails.default.url,
    }));

    // Fetch video details
    const { data: { items: videosData } } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parseData = [];

    // Parse the data
    items.forEach((item) => {
      const channel = parsedChannelsData.find(
        (data) => data.id === item.snippet.channelId
      );

      const video = videosData.find(
        (data) => data.id === item.id.videoId
      );

      if (channel && video) {
        parseData.push({
          videoId: item.id.videoId,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoDuration: parseVideoDuration(video.contentDetails.duration),
          videoViews: convertRawToString(video.statistics.viewCount),
          videoAge: timeSince(new Date(item.snippet.publishedAt)),
          channelInfo: {
            id: item.snippet.channelId,
            image: channel.image,
            name: item.snippet.channelTitle,
          },
        });
      }
    });

    return parseData;
  } catch (err) {
    console.log(err);
    return []; // Handle error by returning an empty array or suitable error object
  }
};

export default parseReccomondedVIdeo;
