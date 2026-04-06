import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { familiesAPI } from '../../api/families';
import { membersAPI } from '../../api/members';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Table from '../../components/common/Table/Table';
import Alert from '../../components/common/Alert/Alert';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import { IoArrowBack, IoCreate, IoPersonAdd } from 'react-icons/io5';
import './FamiliesPages.css';

const FamilyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [family, setFamily] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFamilyData();
  }, [id]);

  const loadFamilyData = async () => {
    try {
      const [familyRes, membersRes] = await Promise.all([
        familiesAPI.getFamilyById(id),
        familiesAPI.getFamilyMembers(id)
      ]);
      setFamily(familyRes.data);
      setMembers(membersRes.data);
    } catch (err) {
      setError('Failed to load family details');
    } finally {
      setLoading(false);
    }
  };

  const memberColumns = [
    { key: 'memberId', title: 'Member ID', width: '100px' },
    { key: 'name', title: 'Name', sortable: true },
    { key: 'role', title: 'Role', width: '100px' },
    { key: 'dateOfBirth', title: 'Date of Birth', width: '120px' },
    { key: 'phone', title: 'Phone', width: '150px' }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Families', path: '/families' },
    { label: family?.familyName || 'Family Details' }
  ];

  if (loading) {
    return (
      <div className="families-page">
        <div className="page-header">
          <h1>Loading family details...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="families-page">
        <Alert type="error" message={error} />
        <Button onClick={() => navigate('/families')}>Back to Families</Button>
      </div>
    );
  }

  return (
    <div className="families-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="page-header">
        <Button 
          variant="outline" 
          onClick={() => navigate('/families')}
          icon={<IoArrowBack />}
        >
          Back
        </Button>
        <div className="header-actions">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/families/${id}/edit`)}
            icon={<IoCreate />}
          >
            Edit Family
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate(`/members/add?familyId=${id}`)}
            icon={<IoPersonAdd />}
          >
            Add Member
          </Button>
        </div>
      </div>

      <div className="family-details-grid">
        <Card title="Family Information">
          <div className="family-info">
            <div className="info-row">
              <strong>Family Name:</strong>
              <span>{family.familyName}</span>
            </div>
            <div className="info-row">
              <strong>Family ID:</strong>
              <span>{family.familyId}</span>
            </div>
            <div className="info-row">
              <strong>Ward:</strong>
              <span>{family.ward || 'Not specified'}</span>
            </div>
            <div className="info-row">
              <strong>Address:</strong>
              <span>{family.address || 'Not specified'}</span>
            </div>
            <div className="info-row">
              <strong>Phone:</strong>
              <span>{family.phone || 'Not specified'}</span>
            </div>
            <div className="info-row">
              <strong>Email:</strong>
              <span>{family.email || 'Not specified'}</span>
            </div>
            <div className="info-row">
              <strong>Status:</strong>
              <span className={`status-badge status-${family.status}`}>
                {family.status}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Family Members">
          <Table
            columns={memberColumns}
            data={members}
            onRowClick={(member) => navigate(`/members/${member.id}`)}
          />
          {members.length === 0 && (
            <div className="empty-message">
              <p>No members added yet.</p>
              <Button 
                variant="outline" 
                onClick={() => navigate(`/members/add?familyId=${id}`)}
              >
                Add First Member
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FamilyDetailsPage;