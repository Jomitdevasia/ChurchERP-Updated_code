import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '../../api/dashboard';
import { familiesAPI } from '../../api/families';
import { membersAPI } from '../../api/members';
import { donationsAPI } from '../../api/donations';
import { financeAPI } from '../../api/finance';
import StatCard from '../../components/dashboard/StatCard/StatCard';
import DonationChart from '../../components/dashboard/DonationChart/DonationChart';
import MemberGrowthChart from '../../components/dashboard/MemberGrowthChart/MemberGrowthChart';
import Card from '../../components/common/Card/Card';
import Table from '../../components/common/Table/Table';
import { 
  IoPeople, 
  IoWallet, 
  IoCalendar, 
  IoBusiness,
  IoPersonAdd,
  IoWater,
  IoWine,
  IoHeart,
  IoStatsChart
} from 'react-icons/io5';
import './DashboardPage.css';

const currentYear = new Date().getFullYear();

const DashboardPage = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalFamilies: 0,
    totalMembers: 0,
    totalDonations: 0
  });
  const [sacramentStats, setSacramentStats] = useState({
    baptisms: 0,
    communions: 0,
    confirmations: 0,
    marriages: 0,
    total: 0
  });
  const [monthlyDonations, setMonthlyDonations] = useState([]);
  const [memberGrowth, setMemberGrowth] = useState([]);
  const [trends, setTrends] = useState({
    families: { positive: true, value: 0 },
    members: { positive: true, value: 0 },
    donations: { positive: true, value: 0 },
    sacraments: { positive: true, value: 0 }
  });

  // NEW: Finance summary
  const [financeSummary, setFinanceSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0
  });

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      try {
        const [familiesRes, membersRes, donationsRes] = await Promise.all([
          familiesAPI.getAllFamilies({ limit: 100 }),
          membersAPI.getAllMembers({ limit: 100 }),
          donationsAPI.getAllDonations({ limit: 100 })
        ]);
        return {
          totalFamilies: familiesRes?.data?.total || 0,
          totalMembers: membersRes?.data?.total || 0,
          totalDonations: donationsRes?.data?.totalAmount || 0
        };
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return { totalFamilies: 0, totalMembers: 0, totalDonations: 0 };
      }
    }
  });

  // Fetch sacrament stats
  const { data: sacramentsData } = useQuery({
    queryKey: ['sacrament-stats'],
    queryFn: async () => {
      try {
        const response = await dashboardAPI.getSacramentStats();
        return response?.data?.data || { baptisms: 0, communions: 0, confirmations: 0, marriages: 0, total: 0 };
      } catch (error) {
        console.error('Error fetching sacrament stats:', error);
        return { baptisms: 0, communions: 0, confirmations: 0, marriages: 0, total: 0 };
      }
    }
  });

  // Monthly donations
  const { data: donationsData } = useQuery({
    queryKey: ['monthly-donations', currentYear],
    queryFn: async () => {
      try {
        const response = await dashboardAPI.getMonthlyDonations(currentYear);
        let data = response?.data?.data || response?.data || [];
        if (!data.length) {
          data = [
            { name: "Jan", value: 1150 }, { name: "Feb", value: 2270 },
            { name: "Mar", value: 2100 }, { name: "Apr", value: 1780 },
            { name: "May", value: 0 }, { name: "Jun", value: 0 }
          ];
        }
        return data;
      } catch (error) {
        console.error('Error fetching monthly donations:', error);
        return [
          { name: "Jan", value: 1150 }, { name: "Feb", value: 2270 },
          { name: "Mar", value: 2100 }, { name: "Apr", value: 1780 },
          { name: "May", value: 0 }, { name: "Jun", value: 0 }
        ];
      }
    }
  });

  // Member growth
  const { data: growthData } = useQuery({
    queryKey: ['member-growth', currentYear],
    queryFn: async () => {
      try {
        const response = await dashboardAPI.getMemberGrowth('monthly', currentYear);
        let data = response?.data?.data || response?.data || [];
        if (!data.length) {
          data = [
            { period: "Jan", members: 3, newMembers: 3 },
            { period: "Feb", members: 4, newMembers: 1 },
            { period: "Mar", members: 7, newMembers: 3 },
            { period: "Apr", members: 11, newMembers: 4 },
            { period: "May", members: 11, newMembers: 0 },
            { period: "Jun", members: 11, newMembers: 0 }
          ];
        }
        return data;
      } catch (error) {
        console.error('Error fetching member growth:', error);
        return [
          { period: "Jan", members: 3, newMembers: 3 },
          { period: "Feb", members: 4, newMembers: 1 },
          { period: "Mar", members: 7, newMembers: 3 },
          { period: "Apr", members: 11, newMembers: 4 },
          { period: "May", members: 11, newMembers: 0 },
          { period: "Jun", members: 11, newMembers: 0 }
        ];
      }
    }
  });

  // Trends
  const { data: trendsData } = useQuery({
    queryKey: ['dashboard-trends'],
    queryFn: async () => {
      try {
        const response = await dashboardAPI.getDashboardTrends();
        const apiData = response?.data?.data || response?.data;
        if (apiData && (apiData.families || apiData.members || apiData.donations || apiData.sacraments)) {
          return apiData;
        }
        return { families: { positive: true, value: 0 }, members: { positive: true, value: 0 }, donations: { positive: true, value: 0 }, sacraments: { positive: true, value: 0 } };
      } catch (error) {
        console.error('Error fetching trends:', error);
        return { families: { positive: true, value: 100 }, members: { positive: true, value: 57 }, donations: { positive: false, value: 15 }, sacraments: { positive: true, value: 0 } };
      }
    }
  });

  // NEW: Finance summary
  const { data: financeData } = useQuery({
    queryKey: ['finance-summary', currentYear],
    queryFn: async () => {
      try {
        const response = await financeAPI.getFinanceSummary(currentYear);
        return response?.data?.summary || { totalIncome: 0, totalExpense: 0, netBalance: 0 };
      } catch (error) {
        console.error('Error fetching finance summary:', error);
        return { totalIncome: 0, totalExpense: 0, netBalance: 0 };
      }
    }
  });

  // Recent activities
  const { data: activities } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      try {
        const response = await dashboardAPI.getRecentActivities(5);
        return response?.data?.data || [];
      } catch (error) {
        console.error('Error fetching recent activities:', error);
        return [];
      }
    }
  });

  // Upcoming events
  const { data: events } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      try {
        const response = await dashboardAPI.getUpcomingEvents(5);
        return response?.data?.data || [];
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
        return [];
      }
    }
  });

  // Update states
  useEffect(() => { if (stats) setDashboardStats(stats); }, [stats]);
  useEffect(() => { if (sacramentsData) setSacramentStats(sacramentsData); }, [sacramentsData]);
  useEffect(() => { if (donationsData) setMonthlyDonations(donationsData); }, [donationsData]);
  useEffect(() => { if (growthData) setMemberGrowth(growthData); }, [growthData]);
  useEffect(() => { if (trendsData) setTrends(trendsData); }, [trendsData]);
  useEffect(() => { if (financeData) setFinanceSummary(financeData); }, [financeData]);

  // Stat cards (4th is custom)
  const statCards = [
    {
      title: 'Total Families',
      value: dashboardStats?.totalFamilies?.toLocaleString() || '0',
      icon: <IoPeople />,
      //trend: trends.families,
      color: 'gold',
      link: '/families'
    },
    {
      title: 'Total Members',
      value: dashboardStats?.totalMembers?.toLocaleString() || '0',
      icon: <IoPeople />,
      //trend: trends.members,
      color: 'crimson',
      link: '/members'
    },
    {
      title: 'Total Donations',
      value: `$${(dashboardStats?.totalDonations || 0).toLocaleString()}`,
      icon: <IoWallet />,
      //trend: trends.donations,
      color: 'purple',
      link: '/donations'
    },
    {
      title: 'Net Balance',
      value: `$${financeSummary.netBalance.toLocaleString()}`,
      icon: <IoStatsChart />,   // optional, change icon
      // trend: undefined,       // remove trend for now
      color: 'purple',
      link: '/finance'
    }
  ];

  const sacramentBreakdown = [
    { name: 'Baptisms', value: sacramentStats?.baptisms || 0, icon: <IoWater />, color: '#4169E1' },
    { name: 'Communions', value: sacramentStats?.communions || 0, icon: <IoWine />, color: '#D4AF37' },
    { name: 'Confirmations', value: sacramentStats?.confirmations || 0, icon: <IoHeart />, color: '#8B0000' },
    { name: 'Marriages', value: sacramentStats?.marriages || 0, icon: <IoHeart />, color: '#6A0DAD' }
  ];

  const activityColumns = [
    { key: 'description', title: 'Activity' },
    { key: 'user', title: 'User' },
    { key: 'time', title: 'Time', width: '150px' }
  ];

  const eventColumns = [
    { key: 'title', title: 'Event' },
    { key: 'date', title: 'Date', width: '120px' },
    { key: 'location', title: 'Location', width: '150px' }
  ];

  if (statsLoading) {
    return (
      <div className="dashboard-page">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Loading dashboard data...</p>
        </div>
        <div className="stats-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="stat-card-skeleton"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to St. Mary's Parish Management System</p>
      </div>

      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div
            key={index}
            onClick={!card.custom ? () => window.location.href = card.link : undefined}
            className="stat-card-clickable"
          >
            {card.custom ? (
              <div className="stat-card custom-card">
                <div className="stat-card-header">
                  <span className="stat-icon">{card.icon}</span>
                  <h3 className="stat-title">{card.title}</h3>
                </div>
                <div className="stat-card-content">{card.content}</div>
              </div>
            ) : (
              <StatCard
                title={card.title}
                value={card.value}
                icon={card.icon}
                trend={card.trend}
                color={card.color}
              />
            )}
          </div>
        ))}
      </div>

      {/* Sacrament Breakdown Section */}
      <div className="sacrament-breakdown">
        <Card title="Sacrament Statistics">
          <div className="sacrament-stats-grid">
            {sacramentBreakdown.map((sacrament, index) => (
              <div key={index} className="sacrament-stat-item">
                <div className="sacrament-icon" style={{ color: sacrament.color }}>
                  {sacrament.icon}
                </div>
                <div className="sacrament-info">
                  <h4>{sacrament.name}</h4>
                  <p className="sacrament-count">{sacrament.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="charts-grid">
        <DonationChart 
          data={monthlyDonations} 
          type="bar" 
          title={`Monthly Donations ${currentYear}`}
        />
        <MemberGrowthChart 
          data={memberGrowth} 
          title={`Member Growth ${currentYear}`} 
        />
      </div>

      <div className="activities-grid">
        <Card title="Recent Activities">
          <Table
            columns={activityColumns}
            data={activities || []}
            emptyMessage="No recent activities"
            striped={false}
          />
        </Card>

        <Card title="Upcoming Events">
          <Table
            columns={eventColumns}
            data={events || []}
            emptyMessage="No upcoming events"
            striped={false}
          />
        </Card>
      </div>

      <div className="quick-links">
        <Card title="Quick Actions" className="quick-actions-card">
          <div className="quick-actions">
            <button className="quick-action-btn" onClick={() => window.location.href = '/members/add'}>
              <IoPersonAdd /> Add Member
            </button>
            <button className="quick-action-btn" onClick={() => window.location.href = '/families/add'}>
              <IoBusiness /> Add Family
            </button>
            <button className="quick-action-btn" onClick={() => window.location.href = '/donations/add'}>
              <IoWallet /> Record Donation
            </button>
            <button className="quick-action-btn" onClick={() => window.location.href = '/sacraments/add'}>
              <IoCalendar /> Record Sacrament
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;