import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sacramentsAPI } from '../../api/sacraments';
import Table from '../../components/common/Table/Table';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import Alert from '../../components/common/Alert/Alert';
import { useTable } from '../../hooks/useTable';
import { useApi } from '../../hooks/useApi';
import { IoAdd, IoDocumentText } from 'react-icons/io5';
import './SacramentsPages.css';

const SacramentRecordsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get('type');
  
  const table = useTable({ 
    limit: 10,
    filters: typeFilter ? { sacramentType: typeFilter } : {}
  });
  const [sacraments, setSacraments] = useState([]);
  const [total, setTotal] = useState(0);

  const { data, loading, execute: fetchSacraments } = useApi(sacramentsAPI.getAllSacraments);

  useEffect(() => {
    loadSacraments();
  }, [table.page, table.limit, table.search, table.sortBy, table.sortOrder, table.filters]);

  const loadSacraments = async () => {
    const params = table.getQueryParams();
    const result = await fetchSacraments(params);
    if (result.success) {
      setSacraments(result.data.sacraments || []);
      setTotal(result.data.total || 0);
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

  const columns = [
    { key: 'memberName', title: 'Member Name', sortable: true },
    { 
      key: 'sacramentType', 
      title: 'Sacrament', 
      width: '120px',
      render: (type) => (
        <span className="sacrament-type-badge">
          {getSacramentIcon(type)} {type?.charAt(0).toUpperCase() + type?.slice(1)}
        </span>
      )
    },
    { key: 'date', title: 'Date', width: '120px', sortable: true },
    { key: 'priest', title: 'Priest', width: '150px' },
    { key: 'church', title: 'Church', width: '150px' },
    { key: 'certificateNumber', title: 'Certificate #', width: '120px' },
    {
      key: 'actions',
      title: 'Actions',
      width: '100px',
      render: (_, row) => (
        <div className="action-buttons">
          <button 
            className="action-btn view-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/sacraments/${row.id}`);
            }}
            title="View Certificate"
          >
            📄
          </button>
        </div>
      )
    }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Sacraments', path: '/sacraments' },
    { label: 'Records' }
  ];

  return (
    <div className="sacraments-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="page-header">
        <div>
          <h1>Sacrament Records</h1>
          <p>View and manage all sacrament records</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => navigate('/sacraments/add')}
          icon={<IoAdd />}
        >
          Add Sacrament
        </Button>
      </div>

      {typeFilter && (
        <Alert 
          type="info" 
          message={`Showing records for: ${typeFilter?.charAt(0).toUpperCase() + typeFilter?.slice(1)}`}
          closable
          onClose={() => navigate('/sacraments/records')}
        />
      )}
      
      <Card>
        <div className="filters-section">
          <SearchBar 
            onSearch={table.handleSearch}
            placeholder="Search by member name, priest, or certificate number..."
          />
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${!typeFilter ? 'active' : ''}`}
              onClick={() => navigate('/sacraments/records')}
            >
              All
            </button>
            <button 
              className={`filter-tab ${typeFilter === 'baptism' ? 'active' : ''}`}
              onClick={() => navigate('/sacraments/records?type=baptism')}
            >
              ✝️ Baptism
            </button>
            <button 
              className={`filter-tab ${typeFilter === 'communion' ? 'active' : ''}`}
              onClick={() => navigate('/sacraments/records?type=communion')}
            >
              🍞 Communion
            </button>
            <button 
              className={`filter-tab ${typeFilter === 'confirmation' ? 'active' : ''}`}
              onClick={() => navigate('/sacraments/records?type=confirmation')}
            >
              🕊️ Confirmation
            </button>
            <button 
              className={`filter-tab ${typeFilter === 'marriage' ? 'active' : ''}`}
              onClick={() => navigate('/sacraments/records?type=marriage')}
            >
              💑 Marriage
            </button>
          </div>
        </div>
        
        <Table
          columns={columns}
          data={sacraments}
          loading={loading}
          onSort={table.handleSort}
          sortBy={table.sortBy}
          sortOrder={table.sortOrder}
          onRowClick={(row) => navigate(`/sacraments/${row.id}`)}
        />
        
        <div className="pagination-section">
          <div className="pagination-info">
            Showing {sacraments.length} of {total} records
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
              disabled={sacraments.length < table.limit}
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

export default SacramentRecordsPage;