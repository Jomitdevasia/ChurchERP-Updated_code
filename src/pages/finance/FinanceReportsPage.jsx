import React, { useState, useEffect } from 'react';
import { financeAPI } from '../../api/finance';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Alert from '../../components/common/Alert/Alert';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import DonationChart from '../../components/dashboard/DonationChart/DonationChart'; // Reuse if generic, or create FinanceChart
import { IoDownload, IoPrint } from 'react-icons/io5';
import './FinancePages.css'; // Use finance-specific styles

const FinanceReportsPage = () => {
  const [reportType, setReportType] = useState('monthly');
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReport();
  }, [reportType, year]);

  const loadReport = async () => {
    setLoading(true);
    setError('');
    try {
      // Assuming financeAPI.getFinanceReports accepts (type, params)
      const response = await financeAPI.getFinanceReports(reportType, { year });
      setData(response.data.chartData || []);
      setSummary(response.data.summary);
    } catch (err) {
      setError('Failed to load report data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const response = await financeAPI.exportFinanceData({ type: reportType, year }, format);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `finance_report_${reportType}_${year}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Finance', path: '/finance' },
    { label: 'Reports' }
  ];

  return (
    <div className="finance-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="page-header">
        <div>
          <h1>Financial Reports</h1>
          <p>View and export income & expense reports</p>
        </div>
        <div className="header-actions">
          <Button 
            variant="outline" 
            onClick={handlePrint}
            icon={<IoPrint />}
          >
            Print
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExport('pdf')}
            icon={<IoDownload />}
          >
            Export PDF
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExport('xlsx')}
            icon={<IoDownload />}
          >
            Export Excel
          </Button>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="report-filters">
        <Card>
          <div className="filter-group">
            <label>Report Type:</label>
            <select 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value)}
              className="select-field"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>

            <label>Year:</label>
            <select 
              value={year} 
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="select-field"
            >
              {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <Button variant="primary" onClick={loadReport} isLoading={loading}>
              Generate Report
            </Button>
          </div>
        </Card>
      </div>

      {summary && (
        <div className="report-summary">
          <Card>
            <h3>Report Summary</h3>
            <div className="summary-stats">
              <div className="summary-stat">
                <span className="stat-label">Total Income</span>
                <span className="stat-value">${summary.totalIncome?.toLocaleString() || 0}</span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Total Expenses</span>
                <span className="stat-value">${summary.totalExpense?.toLocaleString() || 0}</span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Net Balance</span>
                <span className="stat-value">${summary.netBalance?.toLocaleString() || 0}</span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Transaction Count</span>
                <span className="stat-value">{summary.totalCount || 0}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Income/Expense trend chart */}
      {data && data.length > 0 && (
        <DonationChart 
          data={data} 
          type={reportType === 'yearly' ? 'bar' : 'line'}
          title={`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Income & Expense - ${year}`}
        />
      )}

      {/* Breakdown by category (if available) */}
      {summary?.categoryBreakdown && (
        <DonationChart 
          data={summary.categoryBreakdown} 
          type="pie"
          title="Transactions by Category"
        />
      )}
    </div>
  );
};

export default FinanceReportsPage;