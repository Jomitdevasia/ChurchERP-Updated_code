import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsAPI } from '../../api/events';
import Table from '../../components/common/Table/Table';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import Alert from '../../components/common/Alert/Alert';
import Modal from '../../components/common/Modal/Modal';
import { useTable } from '../../hooks/useTable';
import { useApi } from '../../hooks/useApi';
import { IoAdd, IoDownload } from 'react-icons/io5';
import './EventsPages.css'; // or reuse FamiliesPages.css

const EventsListPage = () => {
  const navigate = useNavigate();
  const table = useTable({ limit: 10 });
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { data, loading, execute: fetchEvents } = useApi(eventsAPI.getAllEvents);
  const { execute: deleteEvent } = useApi(eventsAPI.deleteEvent);

  useEffect(() => {
    loadEvents();
  }, [table.page, table.limit, table.search, table.sortBy, table.sortOrder]);

  const loadEvents = async () => {
    const params = table.getQueryParams();
    const result = await fetchEvents(params);
    if (result.success) {
      setEvents(result.data.events || []);
      setTotal(result.data.total || 0);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    
    setDeleteLoading(true);
    const result = await deleteEvent(deleteModal.id);
    if (result.success) {
      setSuccessMessage('Event deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      loadEvents();
    }
    setDeleteModal(null);
    setDeleteLoading(false);
  };

  const handleExport = async () => {
    try {
      // You may implement exportEvents in eventsAPI similarly
      const response = await eventsAPI.exportEvents?.('pdf') || { data: null };
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'events.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.warn('Export not implemented');
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  // Helper to format event type label
  const formatEventType = (type) => {
    const types = {
      marriage: 'Marriage',
      baptism: 'Baptism',
      ielts_exam: 'IELTS Exam',
      meeting: 'Meeting',
      retreat: 'Retreat',
      other: 'Other'
    };
    return types[type] || type;
  };

  const columns = [
    { key: 'title', title: 'Event Title', sortable: true },
    { key: 'date', title: 'Date', width: '120px', sortable: true },
    { key: 'time', title: 'Time', width: '100px' },
    { key: 'location', title: 'Location / Hall', width: '150px' },
    { 
      key: 'type', 
      title: 'Type', 
      width: '120px',
      render: (type) => formatEventType(type)
    },
    { 
      key: 'status', 
      title: 'Status', 
      width: '100px',
      render: (status) => (
        <span className={`status-badge status-${status?.toLowerCase() || 'upcoming'}`}>
          {status || 'Upcoming'}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      width: '120px',
      render: (_, row) => (
        <div className="action-buttons">
          <button 
            className="action-btn view-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/events/${row.id}`);
            }}
            title="View Event"
          >
            👁️
          </button>
          <button 
            className="action-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModal({ id: row.id, name: row.title });
            }}
            title="Delete Event"
          >
            🗑️
          </button>
        </div>
      )
    }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Events' }
  ];

  return (
    <div className="events-page">
      <Breadcrumb items={breadcrumbItems} />
      
      {successMessage && <Alert type="success" message={successMessage} autoClose />}
      
      <div className="page-header">
        <div>
          <h1>Events & Hall Bookings</h1>
          <p>Manage all parish events, hall rentals, and programs (Marriages, IELTS Exams, Baptisms, etc.)</p>
        </div>
        <div className="header-actions">
          <Button 
            variant="outline" 
            onClick={handleExport}
            icon={<IoDownload />}
          >
            Export
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/events/add')}
            icon={<IoAdd />}
          >
            Add Event / Booking
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="filters-section">
          <SearchBar 
            onSearch={table.handleSearch}
            placeholder="Search by event title, location, or type..."
          />
        </div>
        
        <Table
          columns={columns}
          data={events}
          loading={loading}
          onSort={table.handleSort}
          sortBy={table.sortBy}
          sortOrder={table.sortOrder}
          onRowClick={(row) => navigate(`/events/${row.id}`)}
        />
        
        <div className="pagination-section">
          <div className="pagination-info">
            Showing {events.length} of {total} events
          </div>
          <div className="pagination-controls">
            <Button
              variant="outline"
              size="small"
              disabled={table.page === 1}
              onClick={() => table.handlePageChange(table.page - 1)}
            >
              Previous
            </Button>
            <span className="page-number">Page {table.page}</span>
            <Button
              variant="outline"
              size="small"
              disabled={events.length < table.limit}
              onClick={() => table.handlePageChange(table.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Delete Event"
        size="small"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteModal(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={deleteLoading}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{deleteModal?.name}</strong>?</p>
        <p className="warning-text">This action cannot be undone. All associated booking details will be removed.</p>
      </Modal>
    </div>
  );
};

export default EventsListPage;