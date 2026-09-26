import * as eventService from "./event.service.js";
import { serializeEvent } from "./event.serializer.js";

export const list = async (req, res) => {
  const events = await eventService.listEvents(res.locals.query);

  res.json({
    success: true,
    data: events.map(serializeEvent),
  });
};

export const detail = async (req, res) => {
  const event = await eventService.getEventBySlug(req.params.slug);

  res.json({
    success: true,
    data: serializeEvent(event),
  });
};