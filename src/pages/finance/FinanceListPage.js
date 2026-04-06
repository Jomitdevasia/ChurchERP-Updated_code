import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { financeAPI } from '../../api/finance';
import Table from '../../components/common/Table/Table';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import Alert from '../../components/common/Alert/Alert';
import { useTable } from '../../hooks/useTable';   // ✅ correct import
import { useApi } from '../../hooks/useApi';
import { IoAdd, IoDownload, IoPieChart } from 'react-icons/io5';
import './FinancePages.css';

const FinanceListPage = () => {
  const navigate = useNavigate();
  const table = useTable({ limit: 10 });          // ✅ useTable hook
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const { data, loading, execute: fetchTransactions } = useApi(financeAPI.getAllTransactions);

  useEffect(() => {
    loadTransactions();
  }, [table.page, table.limit, table.search]);

  const loadTransactions = async () => {
    const params = table.getQueryParams();
    const result = await fetchTransactions(params);
    if (result.success) {
      setTransactions(result.data.transactions || []);
      setTotal(result.data.total || 0);
      setTotalIncome(result.data.totalIncome || 0);
      setTotalExpense(result.data.totalExpense || 0);
    }
  };

  const handleExport = async () => {
    try {
      const params = table.getQueryParams();
      const response = await financeAPI.exportFinanceData(params, 'pdf');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const columns = [
    { key: 'date', title: 'Date', width: '100px', sortable: true },
    { key: 'description', title: 'Description', sortable: true },
    { key: 'category', title: 'Category', width: '120px', sortable: true },
    {
      key: 'amount',
      title: 'Amount',
      width: '120px',
      sortable: true,
      render: (amount, row) => {
        const isExpense = row.type === 'expense' || amount < 0;
        const sign = isExpense ? '-' : '+';
        const amountAbs = Math.abs(amount);
        return (
          <span style={{ color: isExpense ? '#dc2626' : '#10b981' }}>
            {sign}${amountAbs.toLocaleString()}
          </span>
        );
      }
    },
    { key: 'account', title: 'Account', width: '120px' },
    { key: 'referenceNumber', title: 'Reference #', width: '120px' }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Finance' }
  ];

  return (
    <div className="finance-page">
      <Breadcrumb items={breadcrumbItems} />
      
      {successMessage && <Alert type="success" message={successMessage} autoClose />}
      
      <div className="page-header">
        <div>
          <h1>Finance</h1>
          <p>Manage income and expense transactions</p>
        </div>
        <div className="header-actions">
          <Button 
            variant="outline" 
            onClick={() => navigate('/finance/reports')}
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
            onClick={() => navigate('/finance/add')}
            icon={<IoAdd />}
          >
            Add Transaction
          </Button>
        </div>
      </div>

      <div className="finance-summary">
        <Card>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-label">Total Income</span>
              <span className="stat-value">${totalIncome.toLocaleString()}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Total Expenses</span>
              <span className="stat-value">${totalExpense.toLocaleString()}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Net Balance</span>
              <span className="stat-value">${(totalIncome - totalExpense).toLocaleString()}</span>
            </div>
          </div>
        </Card>
      </div>
      
      <Card>
        <div className="filters-section">
          <SearchBar 
            onSearch={table.handleSearch}
            placeholder="Search by description, category, reference number..."
          />
        </div>
        
        <Table
          columns={columns}
          data={transactions}
          loading={loading}
          onSort={table.handleSort}
          sortBy={table.sortBy}
          sortOrder={table.sortOrder}
          onRowClick={(row) => navigate(`/finance/transactions/${row.id}`)}
        />
        
        <div className="pagination-section">
          <div className="pagination-info">
            Showing {transactions.length} of {total} transactions
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
              disabled={transactions.length < table.limit}
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

export default FinanceListPage;