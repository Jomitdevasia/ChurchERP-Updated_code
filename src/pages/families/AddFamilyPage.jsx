import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { familiesAPI } from '../../api/families';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Alert from '../../components/common/Alert/Alert';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import { IoArrowBack } from 'react-icons/io5';
import './FamiliesPages.css';

const AddFamilyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    familyName: '',
    address: '',
    ward: '',
    phone: '',
    email: '',
    status: 'active'
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
      const response = await familiesAPI.createFamily(formData);
      navigate(`/families/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create family');
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Families', path: '/families' },
    { label: 'Add Family' }
  ];

  return (
    <div className="families-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="page-header">
        <Button 
          variant="outline" 
          onClick={() => navigate('/families')}
          icon={<IoArrowBack />}
        >
          Back to Families
        </Button>
        <h1>Add New Family</h1>
      </div>

      {error && <Alert type="error" message={error} />}

      <Card>
        <form onSubmit={handleSubmit} className="family-form">
          <div className="form-row">
            <Input
              label="Family Name"
              name="familyName"
              value={formData.familyName}
              onChange={handleChange}
              placeholder="Enter family name"
              required
            />
            
            <Input
              label="Ward"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              placeholder="Ward number"
            />
          </div>

          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full address"
            multiline
            rows={3}
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
              placeholder="Email address"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="select-field"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <Button type="submit" variant="primary" isLoading={loading}>
              Create Family
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/families')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddFamilyPage;