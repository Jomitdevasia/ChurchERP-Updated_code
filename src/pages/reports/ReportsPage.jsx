import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { reportsAPI } from '../../api/reports';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import Table from '../../components/common/Table/Table';
import Modal from '../../components/common/Modal/Modal';
import DonationChart from '../../components/dashboard/DonationChart/DonationChart';
import { IoDownload, IoPrint } from 'react-icons/io5';
import './ReportsPage.css';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('families');
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { isLoading, refetch } = useQuery({
    queryKey: ['report', reportType, year],
    queryFn: async () => {
      let response;
      let chart = [];
      let table = [];
      let summ = null;

      switch (reportType) {
        case 'families':
          response = await reportsAPI.getFamiliesByWard();
          chart = response.data.data || [];
          table = response.data.details || [];
          summ = { total: response.data.total, wards: response.data.wards };
          break;
        case 'members':
          response = await reportsAPI.getMembersByGender();
          chart = response.data.data || [];
          table = response.data.details || [];
          // Flatten the byGender object into separate stats
          const byGender = response.data.byGender || {};
          summ = {
            total: response.data.total,
            male: byGender.male || 0,
            female: byGender.female || 0,
          };
          break;
        case 'sacraments':
          response = await reportsAPI.getSacramentsSummary(year);
          chart = response.data.data || [];
          table = response.data.details || [];
          summ = response.data.summary;
          break;
        case 'donations':
          response = await reportsAPI.getDonationsByType(year);
          chart = response.data.data || [];
          table = response.data.details || [];
          summ = response.data.summary;
          break;
        case 'finance':
          const monthlyRes = await reportsAPI.getMonthlyFinance(year);
          chart = monthlyRes.data.data || [];
          table = monthlyRes.data.details || chart;
          const summaryRes = await reportsAPI.getFinanceSummary(year);
          summ = summaryRes.data.summary;
          break;
        case 'events':
          response = await reportsAPI.getEventsSummary(year);
          chart = response.data.data || [];
          table = response.data.details || [];
          summ = response.data.summary;
          break;
        case 'hallBookings':
          response = await reportsAPI.getHallBookingsRevenue(year);
          chart = response.data.data || [];
          table = response.data.details || [];
          summ = response.data.summary;
          break;
        default:
          break;
      }
      setChartData(chart);
      setTableData(table);
      setSummary(summ);
      return response;
    },
    enabled: true,
  });

  const handleExport = async (format) => {
    try {
      const response = await reportsAPI.exportReport(reportType, { year }, format);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}_report_${year}.${format}`);
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

  const handleRowClick = (row) => {
    setSelectedItem(row);
    setModalOpen(true);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Reports' }
  ];

  const reportOptions = [
    { value: 'families', label: 'Families by Ward' },
    { value: 'members', label: 'Members by Gender' },
    { value: 'sacraments', label: 'Sacraments Summary' },
    { value: 'donations', label: 'Donations by Type' },
    { value: 'finance', label: 'Monthly Income & Expense' },
    { value: 'events', label: 'Events Summary' },
    { value: 'hallBookings', label: 'Hall Bookings Revenue' }
  ];

  const getTableColumns = () => {
    switch (reportType) {
      case 'families':
        return [
          { key: 'ward', title: 'Ward' },
          { key: 'count', title: 'Number of Families' }
        ];
      case 'members':
        return [
          { key: 'gender', title: 'Gender' },
          { key: 'count', title: 'Number of Members' }
        ];
      case 'sacraments':
        return [
          { key: 'type', title: 'Sacrament Type' },
          { key: 'count', title: 'Count' }
        ];
      case 'donations':
        return [
          { key: 'type', title: 'Donation Type' },
          { key: 'amount', title: 'Amount', render: (val) => `$${val.toLocaleString()}` }
        ];
      case 'finance':
        return [
          { key: 'month', title: 'Month' },
          { key: 'income', title: 'Income', render: (val) => `$${val.toLocaleString()}` },
          { key: 'expense', title: 'Expense', render: (val) => `$${val.toLocaleString()}` },
          { key: 'net', title: 'Net', render: (val) => `$${val.toLocaleString()}` }
        ];
      case 'events':
        return [
          { key: 'type', title: 'Event Type' },
          { key: 'count', title: 'Number of Events' }
        ];
      case 'hallBookings':
        return [
          { key: 'month', title: 'Month' },
          { key: 'revenue', title: 'Revenue', render: (val) => `$${val.toLocaleString()}` },
          { key: 'bookings', title: 'Bookings' }
        ];
      default:
        return [];
    }
  };

  const tableColumns = getTableColumns();

  const getTableData = () => {
    if (tableData.length) return tableData;
    // Fallback: convert chart data to table rows
    switch (reportType) {
      case 'families':
        return chartData.map(item => ({ ward: item.name, count: item.value }));
      case 'members':
        return chartData.map(item => ({ gender: item.name, count: item.value }));
      case 'sacraments':
        return chartData.map(item => ({ type: item.name, count: item.value }));
      case 'donations':
        return chartData.map(item => ({ type: item.name, amount: item.value }));
      case 'finance':
        return chartData.map(item => ({ month: item.month, income: item.income, expense: item.expense, net: item.net }));
      case 'events':
        return chartData.map(item => ({ type: item.name, count: item.value }));
      case 'hallBookings':
        return chartData.map(item => ({ month: item.name, revenue: item.value, bookings: item.bookings || 0 }));
      default:
        return [];
    }
  };

  // Safe rendering of summary values (skip objects)
  const renderSummaryValue = (value) => {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'number') {
      if (value.toString().includes('amount') || value.toString().includes('revenue')) {
        return `$${value.toLocaleString()}`;
      }
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div className="reports-page">
      <Breadcrumb items={breadcrumbItems} />
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>Generate and export parish reports</p>
        </div>
        <div className="header-actions">
          <Button variant="outline" onClick={handlePrint} icon={<IoPrint />}>Print</Button>
          <Button variant="outline" onClick={() => handleExport('pdf')} icon={<IoDownload />}>Export PDF</Button>
          <Button variant="outline" onClick={() => handleExport('xlsx')} icon={<IoDownload />}>Export Excel</Button>
        </div>
      </div>

      <div className="report-filters">
        <Card>
          <div className="filter-group">
            <label>Report Type:</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="select-field">
              {reportOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {reportType !== 'families' && reportType !== 'members' && (
              <>
                <label>Year:</label>
                <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="select-field">
                  {[2026, 2025, 2024, 2023, 2022].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </>
            )}

            <Button variant="primary" onClick={() => refetch()} isLoading={isLoading}>
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
              {Object.entries(summary).map(([key, value]) => {
                // Skip rendering if value is an object (already flattened)
                if (typeof value === 'object') return null;
                return (
                  <div key={key} className="summary-stat">
                    <span className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="stat-value">{renderSummaryValue(value)}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {chartData && chartData.length > 0 && (
        <div className="report-chart">
          <Card title={`${reportOptions.find(opt => opt.value === reportType)?.label} - ${year}`}>
            <DonationChart
              data={chartData}
              type={reportType === 'finance' ? 'line' : 'bar'}
              title=""
            />
          </Card>
        </div>
      )}

      {(tableData.length > 0 || getTableData().length > 0) ? (
        <div className="report-table">
          <Card title="Detailed Data">
            <Table
              columns={tableColumns}
              data={getTableData()}
              onRowClick={handleRowClick}
              emptyMessage="No data available"
            />
          </Card>
        </div>
      ) : (
        !isLoading && (
          <Card>
            <p className="no-data-message">No data available for this report. Click "Generate Report" to load data.</p>
          </Card>
        )
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Details"
        size="medium"
      >
        {selectedItem && (
          <div className="detail-view">
            <pre>{JSON.stringify(selectedItem, null, 2)}</pre>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReportsPage;