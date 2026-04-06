import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { parishAPI } from '../../api/parish';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Alert from '../../components/common/Alert/Alert';
import { IoBusiness, IoLocation, IoCall, IoMail, IoTime, IoCreate } from 'react-icons/io5';
import './ParishPages.css';

const ParishDetailsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    priest: '',
    established: '',
    description: ''
  });
  const queryClient = useQueryClient();

  const { data: parish, isLoading } = useQuery({
    queryKey: ['parish-details'],
    queryFn: parishAPI.getParishDetails
  });

  const updateMutation = useMutation({
    mutationFn: (data) => parishAPI.updateParish(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['parish-details']);
      setIsEditing(false);
    }
  });

  useEffect(() => {
    if (parish?.data) {
      setFormData(parish.data);
    }
  }, [parish]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMutation.mutateAsync(formData);
  };

  if (isLoading) {
    return (
      <div className="parish-page">
        <div className="page-header">
          <h1>Parish Details</h1>
          <p>Loading parish information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="parish-page">
      <div className="page-header">
        <h1>Parish Details</h1>
        <p>View and manage parish information</p>
      </div>

      {updateMutation.isError && (
        <Alert type="error" message="Failed to update parish details" />
      )}

      {updateMutation.isSuccess && (
        <Alert type="success" message="Parish details updated successfully" autoClose />
      )}

      <div className="parish-content">
        <Card title="Parish Information" className="parish-info-card">
          {!isEditing ? (
            <div className="parish-view">
              <div className="parish-header">
                <div className="parish-icon-large">
                  <IoBusiness />
                </div>
                <div className="parish-title">
                  <h2>{formData.name || 'St. Mary\'s Parish'}</h2>
                  <p>Est. {formData.established || '1900'}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  icon={<IoCreate />}
                >
                  Edit
                </Button>
              </div>

              <div className="parish-details-grid">
                <div className="detail-item">
                  <IoLocation className="detail-icon" />
                  <div>
                    <strong>Address</strong>
                    <p>{formData.address || '123 Church Street'}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <IoCall className="detail-icon" />
                  <div>
                    <strong>Phone</strong>
                    <p>{formData.phone || '+1 (555) 123-4567'}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <IoMail className="detail-icon" />
                  <div>
                    <strong>Email</strong>
                    <p>{formData.email || 'parish@stmarys.org'}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <IoBusiness className="detail-icon" />
                  <div>
                    <strong>Parish Priest</strong>
                    <p>{formData.priest || 'Rev. Fr. John Doe'}</p>
                  </div>
                </div>
              </div>

              {formData.description && (
                <div className="parish-description">
                  <strong>About the Parish</strong>
                  <p>{formData.description}</p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="parish-form">
              <Input
                label="Parish Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full parish address"
              />
              
              <div className="form-row">
                <Input
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contact number"
                />
                
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Parish email"
                />
              </div>
              
              <div className="form-row">
                <Input
                  label="Parish Priest"
                  name="priest"
                  value={formData.priest}
                  onChange={handleChange}
                  placeholder="Current parish priest"
                />
                
                <Input
                  label="Established"
                  name="established"
                  value={formData.established}
                  onChange={handleChange}
                  placeholder="Year established"
                />
              </div>
              
              <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief history and description of the parish"
                multiline
                rows={4}
              />
              
              <div className="form-actions">
                <Button type="submit" variant="primary" isLoading={updateMutation.isPending}>
                  Save Changes
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Card>

        <Card title="Mass Schedule" className="mass-schedule-card">
          <div className="mass-schedule">
            <div className="schedule-day">
              <IoTime className="schedule-icon" />
              <div>
                <strong>Weekdays</strong>
                <p>Monday - Friday: 6:30 AM, 7:30 AM</p>
                <p>Saturday: 7:00 AM, 6:00 PM (Vigil Mass)</p>
              </div>
            </div>
            
            <div className="schedule-day">
              <IoTime className="schedule-icon" />
              <div>
                <strong>Sunday Masses</strong>
                <p>7:00 AM (English)</p>
                <p>9:00 AM (English)</p>
                <p>11:00 AM (Spanish)</p>
                <p>5:00 PM (Youth Mass)</p>
              </div>
            </div>
            
            <div className="schedule-day">
              <IoTime className="schedule-icon" />
              <div>
                <strong>Confessions</strong>
                <p>Saturday: 4:00 PM - 5:30 PM</p>
                <p>Or by appointment</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParishDetailsPage;