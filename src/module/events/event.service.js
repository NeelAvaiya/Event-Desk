import * as eventRepository from "./event.repository.js";
import { AppError } from "../../libs/ApiError.js";

export const listEvents = async (filter = {}, options = {}) => {
  return eventRepository.findMany(filter, options);
};

export const getEventBySlug = async (slug) => {
  const event = await eventRepository.findBySlug(slug);

  if (!event) {
    throw new AppError("EVENT_NOT_FOUND", 404);
  }

  return event;
};