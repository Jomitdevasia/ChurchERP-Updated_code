import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { donationsAPI } from '../../api/donations';
import { membersAPI } from '../../api/members';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Alert from '../../components/common/Alert/Alert';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import { IoArrowBack } from 'react-icons/io5';
import './DonationsPages.css';

const AddDonationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memberIdParam = searchParams.get('memberId');
  
  const [formData, setFormData] = useState({
    memberId: memberIdParam || '',
    amount: '',
    type: 'tithe',
    paymentMethod: 'cash',
    date: new Date().toISOString().split('T')[0],
    receiptNumber: '',
    notes: ''
  });
  const [members, setMembers] = useState([]);
  const [donationTypes, setDonationTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [membersRes, typesRes] = await Promise.all([
        membersAPI.getAllMembers({ limit: 100 }),
        donationsAPI.getDonationTypes()
      ]);
      setMembers(membersRes.data.members || []);
      setDonationTypes(typesRes.data || []);
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
      const response = await donationsAPI.createDonation(formData);
      navigate(`/donations/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record donation');
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Donations', path: '/donations' },
    { label: 'Add Donation' }
  ];

  return (
    <div className="donations-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="page-header">
        <Button 
          variant="outline" 
          onClick={() => navigate('/donations')}
          icon={<IoArrowBack />}
        >
          Back to Donations
        </Button>
        <h1>Record New Donation</h1>
      </div>

      {error && <Alert type="error" message={error} />}

      <Card>
        <form onSubmit={handleSubmit} className="donation-form">
          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Donor</label>
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

            <Input
              label="Amount"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Donation Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange}
                className="select-field"
                required
              >
                {donationTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="input-label">Payment Method</label>
              <select 
                name="paymentMethod" 
                value={formData.paymentMethod} 
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="cash">Cash</option>
                <option value="check">Check</option>
                <option value="online">Online</option>
                <option value="bank_transfer">Bank Transfer</option>
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
              label="Receipt Number"
              name="receiptNumber"
              value={formData.receiptNumber}
              onChange={handleChange}
              placeholder="Optional"
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
              Record Donation
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/donations')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddDonationPage;