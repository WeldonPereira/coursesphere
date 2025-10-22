import { useState } from "react";

export default function usePagination(initialPage = 1, perPage = 5) {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(perPage);

  const offset = (page - 1) * limit;

  return {
    page,
    setPage,
    limit,
    offset,
  };
}
