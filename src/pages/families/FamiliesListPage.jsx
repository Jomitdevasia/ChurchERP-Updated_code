import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { familiesAPI } from '../../api/families';
import Table from '../../components/common/Table/Table';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import Alert from '../../components/common/Alert/Alert';
import Modal from '../../components/common/Modal/Modal';
import { useTable } from '../../hooks/useTable';
import { useApi } from '../../hooks/useApi';
import { IoAdd, IoTrash, IoDownload } from 'react-icons/io5';
import './FamiliesPages.css';

const FamiliesListPage = () => {
  const navigate = useNavigate();
  const table = useTable({ limit: 10 });
  const [families, setFamilies] = useState([]);
  const [total, setTotal] = useState(0);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { data, loading, execute: fetchFamilies } = useApi(familiesAPI.getAllFamilies);
  const { execute: deleteFamily } = useApi(familiesAPI.deleteFamily);

  useEffect(() => {
    loadFamilies();
  }, [table.page, table.limit, table.search, table.sortBy, table.sortOrder]);

  const loadFamilies = async () => {
    const params = table.getQueryParams();
    const result = await fetchFamilies(params);
    if (result.success) {
      setFamilies(result.data.families || []);
      setTotal(result.data.total || 0);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    
    setDeleteLoading(true);
    const result = await deleteFamily(deleteModal.id);
    if (result.success) {
      setSuccessMessage('Family deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      loadFamilies();
    }
    setDeleteModal(null);
    setDeleteLoading(false);
  };

  const handleExport = async () => {
    try {
      const response = await familiesAPI.exportFamilies('pdf');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'families.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const columns = [
    { key: 'familyId', title: 'Family ID', width: '100px' },
    { key: 'familyName', title: 'Family Name', sortable: true },
    { key: 'ward', title: 'Ward', width: '100px' },
    { key: 'phone', title: 'Phone', width: '150px' },
    { key: 'memberCount', title: 'Members', width: '100px' },
    { 
      key: 'status', 
      title: 'Status', 
      width: '100px',
      render: (status) => (
        <span className={`status-badge status-${status?.toLowerCase() || 'active'}`}>
          {status || 'Active'}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      width: '120px',
      render: (_, row) => (
        <div className="action-buttons">
          <button 
            className="action-btn view-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/families/${row.id}`);
            }}
            title="View Family"
          >
            👁️
          </button>
          <button 
            className="action-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModal({ id: row.id, name: row.familyName });
            }}
            title="Delete Family"
          >
            🗑️
          </button>
        </div>
      )
    }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Families' }
  ];

  return (
    <div className="families-page">
      <Breadcrumb items={breadcrumbItems} />
      
      {successMessage && <Alert type="success" message={successMessage} autoClose />}
      
      <div className="page-header">
        <div>
          <h1>Families</h1>
          <p>Manage all registered families in the parish</p>
        </div>
        <div className="header-actions">
          <Button 
            variant="outline" 
            onClick={handleExport}
            icon={<IoDownload />}
          >
            Export
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/families/add')}
            icon={<IoAdd />}
          >
            Add Family
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="filters-section">
          <SearchBar 
            onSearch={table.handleSearch}
            placeholder="Search by family name, ID, or phone..."
          />
        </div>
        
        <Table
          columns={columns}
          data={families}
          loading={loading}
          onSort={table.handleSort}
          sortBy={table.sortBy}
          sortOrder={table.sortOrder}
          onRowClick={(row) => navigate(`/families/${row.id}`)}
        />
        
        <div className="pagination-section">
          <div className="pagination-info">
            Showing {families.length} of {total} families
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
              disabled={families.length < table.limit}
              onClick={() => table.handlePageChange(table.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Delete Family"
        size="small"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteModal(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={deleteLoading}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{deleteModal?.name}</strong>?</p>
        <p className="warning-text">This action cannot be undone. All member records associated with this family will also be deleted.</p>
      </Modal>
    </div>
  );
};

export default FamiliesListPage;