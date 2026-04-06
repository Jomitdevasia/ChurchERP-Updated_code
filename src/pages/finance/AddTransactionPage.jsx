import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { financeAPI } from '../../api/finance';
import { membersAPI } from '../../api/members';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Alert from '../../components/common/Alert/Alert';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import { IoArrowBack } from 'react-icons/io5';
import './FinancePages.css'; // or reuse DonationsPages.css

const AddTransactionPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memberIdParam = searchParams.get('memberId');

  const [formData, setFormData] = useState({
    type: 'expense',          // 'income' or 'expense'
    amount: '',
    category: '',
    account: '',
    date: new Date().toISOString().split('T')[0],
    memberId: memberIdParam || '',
    referenceNumber: '',
    description: ''
  });

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [accountsRes, categoriesRes, membersRes] = await Promise.all([
        financeAPI.getAllAccounts(),
        financeAPI.getTransactionCategories(),
        membersAPI.getAllMembers({ limit: 100 })
      ]);
      setAccounts(accountsRes.data || []);
      setCategories(categoriesRes.data || []);
      setMembers(membersRes.data.members || []);
    } catch (err) {
      console.error('Failed to load data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await financeAPI.createTransaction(formData);
      navigate(`/finance/transactions/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record transaction');
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Finance', path: '/finance' },
    { label: 'Add Transaction' }
  ];

  // Filter categories based on selected type (if your API supports)
  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  return (
    <div className="finance-page">
      <Breadcrumb items={breadcrumbItems} />

      <div className="page-header">
        <Button
          variant="outline"
          onClick={() => navigate('/finance')}
          icon={<IoArrowBack />}
        >
          Back to Finance
        </Button>
        <h1>Record New Transaction</h1>
      </div>

      {error && <Alert type="error" message={error} />}

      <Card>
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Transaction Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <Input
              label="Amount"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="">Select category</option>
                {filteredCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="input-label">Account</label>
              <select
                name="account"
                value={formData.account}
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="">Select account</option>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} ({acc.balance ? `$${acc.balance}` : ''})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <Input
              label="Reference Number"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleChange}
              placeholder="Check #, invoice #, etc."
            />
          </div>

          <div className="form-group">
            <label className="input-label">Associated Member (Optional)</label>
            <select
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
              className="select-field"
            >
              <option value="">None</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.memberId})
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Description / Notes"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Additional details (optional)"
            multiline
            rows={3}
          />

          <div className="form-actions">
            <Button type="submit" variant="primary" isLoading={loading}>
              Record Transaction
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/finance')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddTransactionPage;