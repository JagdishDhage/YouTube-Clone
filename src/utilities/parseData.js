import axios from 'axios';
import React from 'react';
import { parseVideoDuration } from './parseVideoDuration';
import { convertRawToString } from './convertRawtoString';
import { timeSince } from './timeSince';

const API_KEY = 'AIzaSyA4dDH6hDo2PPpo1V-cTbnC40GlTmMbUnY';

export const parseData = async (items) => {
    try {
        const videoIds = [];
        const channelIds = [];

        items.forEach(element => {
            channelIds.push(element.snippet.channelId);
            videoIds.push(element.id.videoId);
        });

        // Fetch channel data
        const { data: { items: channelData } } = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`
        );

        const parsedChannelsData = channelData.map(channel => ({
            id: channel.id,
            image: channel.snippet.thumbnails.default.url,
        }));

       
        const { data: { items: videoData } } = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
        );

        const parsedData = [];

        items.forEach((item) => {
            const channelInfo = parsedChannelsData.find(data => data.id === item.snippet.channelId);
            const videoInfo = videoData.find(video => video.id === item.id.videoId);

            if (channelInfo && videoInfo) {
                parsedData.push({
                    videoId: item.id.videoId,
                    videoTitle: item.snippet.title,
                    videoDescription: item.snippet.description,
                    videoThumbnail: item.snippet.thumbnails.medium.url,
                    videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                    videoDuration: parseVideoDuration(videoInfo.contentDetails.duration),
                    videoViews: convertRawToString(videoInfo.statistics.viewCount),
                    videoAge: timeSince(new Date(item.snippet.publishedAt)),
                    channelInfo: {
                        id: item.snippet.channelId,
                        image: channelInfo.image,
                        name: item.snippet.channelTitle,
                    },
                });
            }
        });

        return parsedData;
    } catch (e) {
        console.error("Failed to parse data:", e);
        return [];
    }
}
