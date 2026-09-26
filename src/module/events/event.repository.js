import Event from "./event.model.js";

export const findBySlug = async (slug) => {
  return Event.findOne({ slug }).lean();
};

export const findById = async (id) => {
  return Event.findById(id).lean();
};

export const findMany = async (filter = {}, options = {}) => {
  const {
    skip = 0,
    limit = 20,
    sort = { createdAt: -1 },
  } = options;

  return Event.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

export const create = async (data) => {
  const event = await Event.create(data);

  return event;
};

export const updateById = async (id, data) => {
  return Event.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  ).lean();
};