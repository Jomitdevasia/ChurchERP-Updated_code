import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { donationsAPI } from '../../api/donations';
import Table from '../../components/common/Table/Table';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import Alert from '../../components/common/Alert/Alert';
import { useTable } from '../../hooks/useTable';
import { useApi } from '../../hooks/useApi';
import { IoAdd, IoDownload, IoPieChart } from 'react-icons/io5';
import './DonationsPages.css';

const DonationsListPage = () => {
  const navigate = useNavigate();
  const table = useTable({ limit: 10 });
  const [donations, setDonations] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const { data, loading, execute: fetchDonations } = useApi(donationsAPI.getAllDonations);

  useEffect(() => {
    loadDonations();
  }, [table.page, table.limit, table.search]);

  const loadDonations = async () => {
    const params = table.getQueryParams();
    const result = await fetchDonations(params);
    if (result.success) {
      setDonations(result.data.donations || []);
      setTotal(result.data.total || 0);
      setTotalAmount(result.data.totalAmount || 0);
    }
  };

  const handleExport = async () => {
    try {
      const params = table.getQueryParams();
      const response = await donationsAPI.exportDonations(params, 'pdf');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'donations.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const columns = [
    { key: 'date', title: 'Date', width: '100px' },
    { key: 'memberName', title: 'Donor', sortable: true },
    { key: 'amount', title: 'Amount', width: '100px', render: (amount) => `$${amount.toLocaleString()}` },
    { key: 'type', title: 'Type', width: '120px' },
    { key: 'paymentMethod', title: 'Method', width: '120px' },
    { key: 'receiptNumber', title: 'Receipt #', width: '120px' }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Donations' }
  ];

  return (
    <div className="donations-page">
      <Breadcrumb items={breadcrumbItems} />
      
      {successMessage && <Alert type="success" message={successMessage} autoClose />}
      
      <div className="page-header">
        <div>
          <h1>Donations</h1>
          <p>Manage and track all parish donations</p>
        </div>
        <div className="header-actions">
          <Button 
            variant="outline" 
            onClick={() => navigate('/donations/reports')}
            icon={<IoPieChart />}
          >
            Reports
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExport}
            icon={<IoDownload />}
          >
            Export
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/donations/add')}
            icon={<IoAdd />}
          >
            Add Donation
          </Button>
        </div>
      </div>

      <div className="donations-summary">
        <Card>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-label">Total Donations</span>
              <span className="stat-value">${totalAmount.toLocaleString()}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Number of Donations</span>
              <span className="stat-value">{total}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Average Donation</span>
              <span className="stat-value">${total > 0 ? (totalAmount / total).toFixed(2) : 0}</span>
            </div>
          </div>
        </Card>
      </div>
      
      <Card>
        <div className="filters-section">
          <SearchBar 
            onSearch={table.handleSearch}
            placeholder="Search by donor name, receipt number..."
          />
        </div>
        
        <Table
          columns={columns}
          data={donations}
          loading={loading}
          onSort={table.handleSort}
          sortBy={table.sortBy}
          sortOrder={table.sortOrder}
          onRowClick={(row) => navigate(`/donations/${row.id}`)}
        />
        
        <div className="pagination-section">
          <div className="pagination-info">
            Showing {donations.length} of {total} donations
          </div>
          <div className="pagination-controls">
            <Button
              variant="outline"
              size="small"
              disabled={table.page === 1}
              onClick={() => table.handlePageChange(table.page - 1)}
            >
              Previous
            </Button>
            <span className="page-number">Page {table.page}</span>
            <Button
              variant="outline"
              size="small"
              disabled={donations.length < table.limit}
              onClick={() => table.handlePageChange(table.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DonationsListPage;