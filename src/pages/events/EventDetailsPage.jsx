import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsAPI } from '../../api/events';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Alert from '../../components/common/Alert/Alert';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import Modal from '../../components/common/Modal/Modal';
import { IoArrowBack, IoCreate, IoTrash } from 'react-icons/io5';
import './EventsPages.css';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      const response = await eventsAPI.getEventById(id);
      setEvent(response.data);
    } catch (err) {
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    const result = await eventsAPI.deleteEvent(id);
    if (result.data.success) {
      navigate('/events');
    } else {
      setError('Failed to delete event');
    }
    setDeleteLoading(false);
    setDeleteModal(false);
  };

  // Helper to format event type
  const formatEventType = (type) => {
    const types = {
      marriage: 'Marriage / Wedding',
      baptism: 'Baptism / Christening',
      ielts_exam: 'IELTS Exam',
      meeting: 'Meeting / Conference',
      retreat: 'Retreat / Seminar',
      other: 'Other Program'
    };
    return types[type] || type;
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Events', path: '/events' },
    { label: event?.title || 'Event Details' }
  ];

  if (loading) {
    return (
      <div className="events-page">
        <div className="page-header">
          <h1>Loading event details...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="events-page">
        <Alert type="error" message={error} />
        <Button onClick={() => navigate('/events')}>Back to Events</Button>
      </div>
    );
  }

  return (
    <div className="events-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="page-header">
        <Button 
          variant="outline" 
          onClick={() => navigate('/events')}
          icon={<IoArrowBack />}
        >
          Back
        </Button>
        <div className="header-actions">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/events/${id}/edit`)}
            icon={<IoCreate />}
          >
            Edit Event
          </Button>
          <Button 
            variant="danger" 
            onClick={() => setDeleteModal(true)}
            icon={<IoTrash />}
          >
            Delete Event
          </Button>
        </div>
      </div>

      <div className="event-details-grid">
        <Card title="Event / Hall Booking Details">
          <div className="event-info">
            <div className="info-row">
              <strong>Event Title:</strong>
              <span>{event.title}</span>
            </div>
            <div className="info-row">
              <strong>Event Type:</strong>
              <span>{formatEventType(event.type)}</span>
            </div>
            <div className="info-row">
              <strong>Date:</strong>
              <span>{event.date}</span>
            </div>
            <div className="info-row">
              <strong>Time:</strong>
              <span>{event.time}</span>
            </div>
            <div className="info-row">
              <strong>Location / Hall:</strong>
              <span>{event.location}</span>
            </div>
            <div className="info-row">
              <strong>Status:</strong>
              <span className={`status-badge status-${event.status?.toLowerCase()}`}>
                {event.status || 'Upcoming'}
              </span>
            </div>
            <div className="info-row">
              <strong>Description:</strong>
              <span>{event.description || 'No description provided'}</span>
            </div>
          </div>
        </Card>
      </div>

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Event"
        size="small"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={deleteLoading}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{event?.title}</strong>?</p>
        <p className="warning-text">This action cannot be undone. All booking records will be removed.</p>
      </Modal>
    </div>
  );
};

export default EventDetailsPage;