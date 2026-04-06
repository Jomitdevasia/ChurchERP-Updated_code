import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sacramentsAPI } from '../../api/sacraments';
import { membersAPI } from '../../api/members';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Alert from '../../components/common/Alert/Alert';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import { IoArrowBack } from 'react-icons/io5';
import './SacramentsPages.css';

const AddSacramentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memberIdParam = searchParams.get('memberId');
  
  const [formData, setFormData] = useState({
    memberId: memberIdParam || '',
    sacramentType: 'baptism',
    date: new Date().toISOString().split('T')[0],
    priest: '',
    church: '',
    certificateNumber: '',
    notes: ''
  });
  const [members, setMembers] = useState([]);
  const [sacramentTypes, setSacramentTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [membersRes, typesRes] = await Promise.all([
        membersAPI.getAllMembers({ limit: 100 }),
        sacramentsAPI.getSacramentTypes()
      ]);
      setMembers(membersRes.data.members || []);
      setSacramentTypes(typesRes.data || []);
    } catch (err) {
      console.error('Failed to load data');
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
      const response = await sacramentsAPI.createSacrament(formData);
      navigate(`/sacraments/records`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record sacrament');
    } finally {
      setLoading(false);
    }
  };

  const getSacramentIcon = (type) => {
    switch(type) {
      case 'baptism': return '✝️';
      case 'communion': return '🍞';
      case 'confirmation': return '🕊️';
      case 'marriage': return '💑';
      default: return '📜';
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Sacraments', path: '/sacraments' },
    { label: 'Records', path: '/sacraments/records' },
    { label: 'Add Sacrament' }
  ];

  return (
    <div className="sacraments-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="page-header">
        <Button 
          variant="outline" 
          onClick={() => navigate('/sacraments/records')}
          icon={<IoArrowBack />}
        >
          Back to Records
        </Button>
        <h1>Record New Sacrament</h1>
      </div>

      {error && <Alert type="error" message={error} />}

      <Card>
        <form onSubmit={handleSubmit} className="sacrament-form">
          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Member</label>
              <select 
                name="memberId" 
                value={formData.memberId} 
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="">Select a member</option>
                {members.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.memberId})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="input-label">Sacrament Type</label>
              <select 
                name="sacramentType" 
                value={formData.sacramentType} 
                onChange={handleChange}
                className="select-field"
                required
              >
                {sacramentTypes.map(type => (
                  <option key={type} value={type}>
                    {getSacramentIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
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
              label="Priest/Celebrant"
              name="priest"
              value={formData.priest}
              onChange={handleChange}
              placeholder="Name of priest or celebrant"
              required
            />
          </div>

          <div className="form-row">
            <Input
              label="Church"
              name="church"
              value={formData.church}
              onChange={handleChange}
              placeholder="Church where sacrament was received"
              required
            />

            <Input
              label="Certificate Number"
              name="certificateNumber"
              value={formData.certificateNumber}
              onChange={handleChange}
              placeholder="Certificate number (if applicable)"
            />
          </div>

          <Input
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes (optional)"
            multiline
            rows={3}
          />

          <div className="form-actions">
            <Button type="submit" variant="primary" isLoading={loading}>
              Record Sacrament
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/sacraments/records')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddSacramentPage;