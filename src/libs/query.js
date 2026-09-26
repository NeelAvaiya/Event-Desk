const SORTABLE = ["startsAt", "price", "createdAt"];

export const parseEventQuery = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);

  const limit = Math.min(
    Math.max(Number(query.limit) || 20, 1),
    50
  );

  const filter = {};

  // Filter by city
  if (query.city) {
    filter.city = query.city;
  }

  // Filter by date range
  if (query.from || query.to) {
    filter.startsAt = {};

    if (query.from) {
      filter.startsAt.$gte = new Date(query.from);
    }

    if (query.to) {
      filter.startsAt.$lte = new Date(query.to);
    }
  }

  // Sorting
  let sortField = "createdAt";
  let sortOrder = -1;

  if (query.sort) {
    const requestedSort = query.sort.startsWith("-")
      ? query.sort.slice(1)
      : query.sort;

    if (!SORTABLE.includes(requestedSort)) {
      throw new Error(`Invalid sort field: ${requestedSort}`);
    }

    sortField = requestedSort;
    sortOrder = query.sort.startsWith("-") ? -1 : 1;
  }

  return {
    filter,
    options: {
      page,
      limit,
      sort: {
        [sortField]: sortOrder,
      },
    },
  };
};