const SORTABLE = ["startsAt", "price", "createdAt"];

export const parseEventQuery = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 50);

  const filter = {};

  if (query.city) filter.city = query.city;

  if (query.from || query.to) {
    filter.startsAt = {};
    if (query.from) filter.startsAt.$gte = new Date(query.from);
    if (query.to) filter.startsAt.$lte = new Date(query.to);
  }

  let sortField = "createdAt";
  let sortOrder = -1;

  if (query.sort) {
    const field = query.sort.replace(/^-/, "");
    if (!SORTABLE.includes(field)) throw new Error(`Invalid sort field: ${field}`);
    sortField = field;
    sortOrder = query.sort.startsWith("-") ? -1 : 1;
  }

  return {
    filter,
    options: { page, limit, sort: { [sortField]: sortOrder } },
  };
};