import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sacramentsAPI } from '../../api/sacraments';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Table from '../../components/common/Table/Table';
import StatCard from '../../components/dashboard/StatCard/StatCard';
import { IoAdd, IoWater, IoWine, IoHeart, IoPeople } from 'react-icons/io5';
import './SacramentsPages.css';

const SacramentsDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentSacraments, setRecentSacraments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, recentRes] = await Promise.all([
        sacramentsAPI.getSacramentsDashboard(),
        sacramentsAPI.getAllSacraments({ limit: 5 })
      ]);
      setStats(statsRes.data);
      setRecentSacraments(recentRes.data.sacraments || []);
    } catch (error) {
      console.error('Failed to load sacraments data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sacramentStats = [
    {
      title: 'Baptisms',
      value: stats?.baptisms || 0,
      icon: <IoWater />,
      color: 'blue'
    },
    {
      title: 'First Communion',
      value: stats?.communions || 0,
      icon: <IoWine />,
      color: 'gold'
    },
    {
      title: 'Confirmations',
      value: stats?.confirmations || 0,
      icon: <IoHeart />,
      color: 'crimson'
    },
    {
      title: 'Marriages',
      value: stats?.marriages || 0,
      icon: <IoPeople />,
      color: 'purple'
    }
  ];

  const columns = [
    { key: 'memberName', title: 'Member' },
    { key: 'sacramentType', title: 'Sacrament' },
    { key: 'date', title: 'Date', width: '120px' },
    { key: 'priest', title: 'Priest', width: '150px' }
  ];

  return (
    <div className="sacraments-page">
      <div className="page-header">
        <div>
          <h1>Sacraments Dashboard</h1>
          <p>Track and manage all sacraments in the parish</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => navigate('/sacraments/add')}
          icon={<IoAdd />}
        >
          Record Sacrament
        </Button>
      </div>

      <div className="stats-grid">
        {sacramentStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="sacraments-grid">
        <Card title="Recent Sacraments">
          <Table
            columns={columns}
            data={recentSacraments}
            loading={loading}
            onRowClick={(row) => navigate(`/sacraments/${row.id}`)}
          />
          <Button 
            variant="outline" 
            onClick={() => navigate('/sacraments/records')}
            style={{ marginTop: 'var(--spacing-md)' }}
          >
            View All Records
          </Button>
        </Card>

        <Card title="Sacrament Types">
          <div className="sacrament-types">
            <div className="sacrament-type" onClick={() => navigate('/sacraments/records?type=baptism')}>
              <IoWater className="type-icon" />
              <div>
                <h4>Baptism</h4>
                <p>Record and manage baptisms</p>
              </div>
            </div>
            <div className="sacrament-type" onClick={() => navigate('/sacraments/records?type=communion')}>
              <IoWine className="type-icon" />
              <div>
                <h4>First Communion</h4>
                <p>Track first communion records</p>
              </div>
            </div>
            <div className="sacrament-type" onClick={() => navigate('/sacraments/records?type=confirmation')}>
              <IoHeart className="type-icon" />
              <div>
                <h4>Confirmation</h4>
                <p>Manage confirmation records</p>
              </div>
            </div>
            <div className="sacrament-type" onClick={() => navigate('/sacraments/records?type=marriage')}>
              <IoPeople className="type-icon" />
              <div>
                <h4>Marriage</h4>
                <p>Track marriage records</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SacramentsDashboard;