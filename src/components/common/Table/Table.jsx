import React from 'react';
import './Table.css';

const Table = ({ 
  columns, 
  data, 
  loading = false,
  onSort,
  sortBy,
  sortOrder,
  onRowClick,
  emptyMessage = 'No data available',
  striped = true,
  hoverable = true
}) => {
  const handleSort = (column) => {
    if (column.sortable !== false && onSort) {
      onSort(column.key);
    }
  };

  const getSortIcon = (columnKey) => {
    if (sortBy !== columnKey) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className={`data-table ${striped ? 'striped' : ''} ${hoverable ? 'hoverable' : ''}`}>
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                onClick={() => handleSort(column)}
                className={column.sortable !== false ? 'sortable' : ''}
                style={{ width: column.width, textAlign: column.align || 'left' }}
              >
                {column.title}
                {column.sortable !== false && (
                  <span className="sort-icon">{getSortIcon(column.key)}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <tr 
                key={row.id || index}
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? 'clickable' : ''}
              >
                {columns.map(column => (
                  <td 
                    key={column.key}
                    style={{ textAlign: column.align || 'left' }}
                  >
                    {column.render 
                      ? column.render(row[column.key], row, index)
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="table-empty">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;