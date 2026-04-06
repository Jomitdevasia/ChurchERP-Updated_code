import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { membersAPI } from '../../api/members';
import { sacramentsAPI } from '../../api/sacraments';
import { donationsAPI } from '../../api/donations';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Table from '../../components/common/Table/Table';
import Alert from '../../components/common/Alert/Alert';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import { IoArrowBack, IoCreate, IoDocumentText } from 'react-icons/io5';
import './MembersPages.css';

const MemberDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [family, setFamily] = useState(null);
  const [sacraments, setSacraments] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMemberData();
  }, [id]);

  const loadMemberData = async () => {
    try {
      const [memberRes, sacramentsRes, donationsRes] = await Promise.all([
        membersAPI.getMemberById(id),
        membersAPI.getMemberSacraments(id),
        membersAPI.getMemberDonations(id, { limit: 5 })
      ]);
      setMember(memberRes.data);
      setSacraments(sacramentsRes.data || []);
      setDonations(donationsRes.data || []);
      
      if (memberRes.data.familyId) {
        const familyRes = await membersAPI.getMemberFamilies(memberRes.data.familyId);
        setFamily(familyRes.data);
      }
    } catch (err) {
      setError('Failed to load member details');
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const sacramentColumns = [
    { key: 'sacramentType', title: 'Sacrament' },
    { key: 'date', title: 'Date', width: '120px' },
    { key: 'priest', title: 'Priest', width: '150px' },
    { key: 'church', title: 'Church', width: '150px' }
  ];

  const donationColumns = [
    { key: 'date', title: 'Date', width: '100px' },
    { key: 'amount', title: 'Amount', width: '100px', render: (amount) => `$${amount}` },
    { key: 'type', title: 'Type' },
    { key: 'paymentMethod', title: 'Method' }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Members', path: '/members' },
    { label: member?.name || 'Member Details' }
  ];

  if (loading) {
    return (
      <div className="members-page">
        <div className="page-header">
          <h1>Loading member details...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="members-page">
        <Alert type="error" message={error} />
        <Button onClick={() => navigate('/members')}>Back to Members</Button>
      </div>
    );
  }

  return (
    <div className="members-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="page-header">
        <Button 
          variant="outline" 
          onClick={() => navigate('/members')}
          icon={<IoArrowBack />}
        >
          Back
        </Button>
        <div className="header-actions">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/members/${id}/edit`)}
            icon={<IoCreate />}
          >
            Edit Member
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate(`/sacraments/add?memberId=${id}`)}
            icon={<IoDocumentText />}
          >
            Add Sacrament
          </Button>
        </div>
      </div>

      <div className="member-details-grid">
        <Card title="Personal Information">
          <div className="member-info">
            <div className="info-row">
              <strong>Member ID:</strong>
              <span>{member.memberId}</span>
            </div>
            <div className="info-row">
              <strong>Full Name:</strong>
              <span>{member.name}</span>
            </div>
            <div className="info-row">
              <strong>Date of Birth:</strong>
              <span>{member.dateOfBirth} ({calculateAge(member.dateOfBirth)} years)</span>
            </div>
            <div className="info-row">
              <strong>Gender:</strong>
              <span>{member.gender === 'male' ? 'Male' : 'Female'}</span>
            </div>
            <div className="info-row">
              <strong>Baptism Name:</strong>
              <span>{member.baptismName || 'Same as given name'}</span>
            </div>
            <div className="info-row">
              <strong>Phone:</strong>
              <span>{member.phone || 'Not specified'}</span>
            </div>
            <div className="info-row">
              <strong>Email:</strong>
              <span>{member.email || 'Not specified'}</span>
            </div>
            <div className="info-row">
              <strong>Status:</strong>
              <span className={`status-badge status-${member.status}`}>
                {member.status}
              </span>
            </div>
          </div>
        </Card>

        {family && (
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
                <strong>Family Phone:</strong>
                <span>{family.phone || 'Not specified'}</span>
              </div>
              <Button 
                variant="outline" 
                size="small" 
                onClick={() => navigate(`/families/${family.id}`)}
                style={{ marginTop: 'var(--spacing-md)' }}
              >
                View Full Family
              </Button>
            </div>
          </Card>
        )}
      </div>

      <Card title="Sacraments Received">
        <Table
          columns={sacramentColumns}
          data={sacraments}
          emptyMessage="No sacraments recorded yet"
        />
        {sacraments.length === 0 && (
          <div className="empty-message">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/sacraments/add?memberId=${id}`)}
            >
              Add First Sacrament
            </Button>
          </div>
        )}
      </Card>

      <Card title="Recent Donations">
        <Table
          columns={donationColumns}
          data={donations}
          emptyMessage="No donations recorded yet"
        />
        <Button 
          variant="outline" 
          onClick={() => navigate(`/donations?memberId=${id}`)}
          style={{ marginTop: 'var(--spacing-md)' }}
        >
          View All Donations
        </Button>
      </Card>
    </div>
  );
};

export default MemberDetailsPage;