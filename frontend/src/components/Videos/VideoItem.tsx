import React from "react";
import { Video } from "./VideoInterface";
import { XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import ReactPlayer from "react-player";
import "./Styles/VideoItem.css";
import { useNavigate } from "react-router-dom";
import * as videoService from "./VideoService";

interface Props {
  video: Video;
  loadVideo: () => Promise<void>;
}

const VideoItem = ({ video, loadVideo }: Props) => {
  const history = useNavigate();

  const handleDelete = async (id: string) => {
    await videoService.deleteVideo(id);
    loadVideo();
  };

  return (
    <div className="m-2.5 p-4">
      <div
        key={video._id}
        className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[300px] h-full"
      >
        <div className="p-4 flex flex-col justify-between h-full">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              {video.title}
            </h1>
            <div className="flex justify-evenly">
              <PencilSquareIcon
                onClick={() => history(`/update-video/${video._id}`)}
                className="video-player w-6 h-6 text-gray-500"
              />
              <XCircleIcon
                className="w-6 h-6 text-red-600"
                onClick={() => video._id && handleDelete(video._id)}
              />
            </div>
          </div>
          <p className="mt-2 text-base text-gray-600">{video.description}</p>
          {/* <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-300 self-start"
          >
            Watch
          </a> */}
          <div>
            <ReactPlayer
              controls
              pip
              width="100%"
              url={video.url}
              key={video._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
