import { RequestHandler } from "express";
import Video from "./Video";

export const getVideos: RequestHandler = async (req, res) => {
  try {
    const videos = await Video.find();

    if (videos.length === 0) {
      return res.status(404).json({ message: "No se encontraron videos." });
    }

    return res.json(videos);
  } catch (error) {
    return res.json({ message: `Error al obtener videos: ${error}` });
  }
};

export const createVideo: RequestHandler = async (req, res) => {
  try {
    const videoFound = await Video.findOne({ url: req.body.url });

    if (videoFound) {
      return res.status(301).send({ message: "La URL ya existe..." });
    }
    const video = new Video(req.body);
    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getVideo: RequestHandler = async (req, res) => {
  try {
    const videoFound = await Video.findById(req.params.id);

    if (!videoFound) return res.status(204).json();
    return res.json(videoFound);
  } catch (error) {
    res.json(error);
  }
};

export const deleteVideo: RequestHandler = async (req, res) => {
  try {
    const videoFound = await Video.findByIdAndDelete(req.params.id);

    if (!videoFound) return res.status(204).json();
    return res.json({
      message: `El video "${videoFound.title}" ha sido eliminado ...`,
    });
  } catch (error) {
    res.json(error);
  }
};

export const updateVideo: RequestHandler = async (req, res) => {
  try {
    const videoUpdate = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if (!videoUpdate) return res.status(204).json();
    res.json({
      message: `El video ${videoUpdate.title} ha sido actualizado ...`,
    });
  } catch (error) {
    res.json(error);
  }
};
