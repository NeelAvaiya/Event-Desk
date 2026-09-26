export const serializeEvent = (event) => {
  return {
    id: event._id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    venue: event.venue,
    city: event.city,
    startsAt: event.startsAt,
    capacity: event.capacity,
    seatsBooked: event.seatsBooked,
    seatsHeld: event.seatsHeld,
    price: event.price,
    organizerId: event.organizerId,
    status: event.status,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  };
};