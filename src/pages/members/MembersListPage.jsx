import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { membersAPI } from '../../api/members';
import Table from '../../components/common/Table/Table';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import Alert from '../../components/common/Alert/Alert';
import Modal from '../../components/common/Modal/Modal';
import { useTable } from '../../hooks/useTable';
import { useApi } from '../../hooks/useApi';
import { IoAdd, IoDownload } from 'react-icons/io5';
import './MembersPages.css';

const MembersListPage = () => {
  const navigate = useNavigate();
  const table = useTable({ limit: 10 });
  const [members, setMembers] = useState([]);
  const [total, setTotal] = useState(0);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { data, loading, execute: fetchMembers } = useApi(membersAPI.getAllMembers);
  const { execute: deleteMember } = useApi(membersAPI.deleteMember);

  useEffect(() => {
    loadMembers();
  }, [table.page, table.limit, table.search, table.sortBy, table.sortOrder]);

  const loadMembers = async () => {
    const params = table.getQueryParams();
    const result = await fetchMembers(params);
    if (result.success) {
      setMembers(result.data.members || []);
      setTotal(result.data.total || 0);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    
    setDeleteLoading(true);
    const result = await deleteMember(deleteModal.id);
    if (result.success) {
      setSuccessMessage('Member deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      loadMembers();
    }
    setDeleteModal(null);
    setDeleteLoading(false);
  };

  const handleExport = async () => {
    try {
      const response = await membersAPI.exportMembers('pdf');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'members.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const columns = [
    { key: 'memberId', title: 'Member ID', width: '100px' },
    { key: 'name', title: 'Name', sortable: true },
    { key: 'familyName', title: 'Family', width: '150px' },
    { key: 'dateOfBirth', title: 'Date of Birth', width: '120px' },
    { key: 'age', title: 'Age', width: '80px' },
    { key: 'gender', title: 'Gender', width: '80px' },
    { key: 'phone', title: 'Phone', width: '150px' },
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
              navigate(`/members/${row.id}`);
            }}
            title="View Member"
          >
            👁️
          </button>
          <button 
            className="action-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModal({ id: row.id, name: row.name });
            }}
            title="Delete Member"
          >
            🗑️
          </button>
        </div>
      )
    }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Members' }
  ];

  return (
    <div className="members-page">
      <Breadcrumb items={breadcrumbItems} />
      
      {successMessage && <Alert type="success" message={successMessage} autoClose />}
      
      <div className="page-header">
        <div>
          <h1>Members</h1>
          <p>Manage all registered members of the parish</p>
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
            onClick={() => navigate('/members/add')}
            icon={<IoAdd />}
          >
            Add Member
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="filters-section">
          <SearchBar 
            onSearch={table.handleSearch}
            placeholder="Search by name, ID, or family..."
          />
        </div>
        
        <Table
          columns={columns}
          data={members}
          loading={loading}
          onSort={table.handleSort}
          sortBy={table.sortBy}
          sortOrder={table.sortOrder}
          onRowClick={(row) => navigate(`/members/${row.id}`)}
        />
        
        <div className="pagination-section">
          <div className="pagination-info">
            Showing {members.length} of {total} members
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
              disabled={members.length < table.limit}
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
        title="Delete Member"
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
        <p className="warning-text">This action cannot be undone. All sacraments and donation records for this member will also be deleted.</p>
      </Modal>
    </div>
  );
};

export default MembersListPage;