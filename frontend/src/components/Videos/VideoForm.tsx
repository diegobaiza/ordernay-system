import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Video } from "./VideoInterface";
import * as videoService from "./VideoService";
import { toast } from "react-toastify";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const VideoForm = () => {
  const initialState = {
    title: "",
    description: "",
    url: "",
  };

  interface Params {
    [id: string]: any;
  }

  const params = useParams<Params>();
  console.log(params);

  const history = useNavigate();
  const [video, setVideo] = useState<Video>(initialState);

  const handleInputChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!params.id) {
        await videoService.createVideo(video);
        toast.success("Creado con exito");
        setVideo(initialState);
      } else {
        await videoService.updateVideo(params.id, video);
      }
    } catch (error) {
      console.error("Error subiendo el video:", error);
    }
    history("/video-list");
  };
  const getVideo = async (id: string) => {
    try {
      const resGetVideo = await videoService.getVideo(id);
      const { title, description, url } = resGetVideo.data;
      setVideo({ title, description, url });
    } catch (error) {
      console.error("Error en obtener los datos...", error);
    }
  };

  useEffect(() => {
    if (params.id) getVideo(params.id);
  }, [params.id]);

  return (
    <div className="max-w-md mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        {params.id === undefined ? (
          <h1 className="text-center text-2xl font-bold mb-6">Nuevo Video</h1>
        ) : (
          <h1 className="text-center text-2xl font-bold mb-6">
            Actualizar Video
          </h1>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Escribe un título para el video"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={video.title}
              required
              autoFocus
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Elige una descripción"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={video.description}
              rows={4}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="url" className="block text-gray-700 mb-2">
              URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              placeholder="https://somesite.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={video.url}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="text-center">
            {params.id ? (
              <button
                type="submit"
                className="bg-amber-600 text-white font-bold py-3 px-6 rounded hover:bg-blue-600 transition duration-300"
              >
                Actualizar
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-3 px-6 rounded hover:bg-blue-600 transition duration-300"
              >
                Subir Video
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
