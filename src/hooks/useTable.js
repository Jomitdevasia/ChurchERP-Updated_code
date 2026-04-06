import { useState, useCallback } from 'react';

export const useTable = (initialState = {}) => {
  const [page, setPage] = useState(initialState.page || 1);
  const [limit, setLimit] = useState(initialState.limit || 10);
  const [search, setSearch] = useState(initialState.search || '');
  const [sortBy, setSortBy] = useState(initialState.sortBy || 'createdAt');
  const [sortOrder, setSortOrder] = useState(initialState.sortOrder || 'desc');
  const [filters, setFilters] = useState(initialState.filters || {});

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setPage(1);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setSearch('');
    setPage(1);
  };

  const getQueryParams = useCallback(() => {
    const params = {
      page,
      limit,
      sortBy,
      sortOrder,
      ...(search && { search }),
      ...filters
    };
    return params;
  }, [page, limit, search, sortBy, sortOrder, filters]);

  return {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    filters,
    handlePageChange,
    handleLimitChange,
    handleSearch,
    handleSort,
    handleFilter,
    clearFilters,
    getQueryParams
  };
};