import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsAPI } from '../../api/events';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Alert from '../../components/common/Alert/Alert';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import { IoArrowBack } from 'react-icons/io5';
import './EventsPages.css'; // or reuse FamiliesPages.css

const AddEventPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    location: '',
    description: '',
    status: 'upcoming',
    type: 'other' // e.g., marriage, baptism, ielts_exam, meeting, retreat
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await eventsAPI.createEvent(formData);
      navigate(`/events/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Events', path: '/events' },
    { label: 'Add Event' }
  ];

  return (
    <div className="events-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="page-header">
        <Button 
          variant="outline" 
          onClick={() => navigate('/events')}
          icon={<IoArrowBack />}
        >
          Back to Events
        </Button>
        <h1>Add New Event / Hall Booking</h1>
      </div>

      {error && <Alert type="error" message={error} />}

      <Card>
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-row">
            <Input
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Wedding Reception, IELTS Exam, Baptism Celebration"
              required
            />
            
            <div className="form-group">
              <label className="input-label">Event Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="marriage">Marriage / Wedding</option>
                <option value="baptism">Baptism / Christening</option>
                <option value="ielts_exam">IELTS Exam</option>
                <option value="meeting">Meeting / Conference</option>
                <option value="retreat">Retreat / Seminar</option>
                <option value="other">Other Program</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="e.g., 10:00 AM"
              required
            />
          </div>

          <Input
            label="Location / Hall"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Main Hall, Conference Room, Youth Center"
            required
          />

          <Input
            label="Description / Special Requests"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Additional details (optional)"
            multiline
            rows={3}
          />

          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="select-field"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <Button type="submit" variant="primary" isLoading={loading}>
              Create Event
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/events')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddEventPage;