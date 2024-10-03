import React, { useEffect, useState } from "react";

// Import typescript interface
import { Video } from "./VideoInterface";

// Import data server calling
import * as videoService from "./VideoService";

// Import video items
import VideoItem from "./VideoItem";

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const loadVideos = async () => {
    const res = await videoService.getVideos();
    console.log(res);
    setVideos(res.data);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <VideoItem video={video} key={video._id} loadVideo={loadVideos} />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
