import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { membersAPI } from '../../api/members';
import { familiesAPI } from '../../api/families';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Alert from '../../components/common/Alert/Alert';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import { IoArrowBack } from 'react-icons/io5';
import './MembersPages.css';

const AddMemberPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const familyIdParam = searchParams.get('familyId');
  
  const [formData, setFormData] = useState({
    name: '',
    familyId: familyIdParam || '',
    dateOfBirth: '',
    gender: 'male',
    phone: '',
    email: '',
    baptismName: '',
    status: 'active'
  });
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFamilies();
  }, []);

  const loadFamilies = async () => {
    try {
      const response = await familiesAPI.getAllFamilies({ limit: 100 });
      setFamilies(response.data.families || []);
    } catch (err) {
      console.error('Failed to load families');
    }
  };

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
      const response = await membersAPI.createMember(formData);
      navigate(`/members/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create member');
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Members', path: '/members' },
    { label: 'Add Member' }
  ];

  return (
    <div className="members-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="page-header">
        <Button 
          variant="outline" 
          onClick={() => navigate('/members')}
          icon={<IoArrowBack />}
        >
          Back to Members
        </Button>
        <h1>Add New Member</h1>
      </div>

      {error && <Alert type="error" message={error} />}

      <Card>
        <form onSubmit={handleSubmit} className="member-form">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />

          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Family</label>
              <select 
                name="familyId" 
                value={formData.familyId} 
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="">Select a family</option>
                {families.map(family => (
                  <option key={family.id} value={family.id}>
                    {family.familyName} ({family.familyId})
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Gender</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Contact number"
            />
          </div>

          <div className="form-row">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
            />

            <Input
              label="Baptism Name"
              name="baptismName"
              value={formData.baptismName}
              onChange={handleChange}
              placeholder="Baptismal name (if different)"
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
              Create Member
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/members')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddMemberPage;