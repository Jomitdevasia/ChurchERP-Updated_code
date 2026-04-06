import axiosInstance from './axiosConfig';

export const financeAPI = {
  // ==================== Transactions ====================
  getAllTransactions: (params) => {
    return axiosInstance.get('/finance/transactions', { params });
  },

  getTransactionById: (id) => {
    return axiosInstance.get(`/finance/transactions/${id}`);
  },

  createTransaction: (data) => {
    return axiosInstance.post('/finance/transactions', data);
  },

  updateTransaction: (id, data) => {
    return axiosInstance.put(`/finance/transactions/${id}`, data);
  },

  deleteTransaction: (id) => {
    return axiosInstance.delete(`/finance/transactions/${id}`);
  },

  // ==================== Accounts ====================
  getAllAccounts: (params) => {
    return axiosInstance.get('/finance/accounts', { params });
  },

  getAccountById: (id) => {
    return axiosInstance.get(`/finance/accounts/${id}`);
  },

  createAccount: (data) => {
    return axiosInstance.post('/finance/accounts', data);
  },

  updateAccount: (id, data) => {
    return axiosInstance.put(`/finance/accounts/${id}`, data);
  },

  deleteAccount: (id) => {
    return axiosInstance.delete(`/finance/accounts/${id}`);
  },

  // ==================== Budgets ====================
  getAllBudgets: (params) => {
    return axiosInstance.get('/finance/budgets', { params });
  },

  getBudgetById: (id) => {
    return axiosInstance.get(`/finance/budgets/${id}`);
  },

  createBudget: (data) => {
    return axiosInstance.post('/finance/budgets', data);
  },

  updateBudget: (id, data) => {
    return axiosInstance.put(`/finance/budgets/${id}`, data);
  },

  deleteBudget: (id) => {
    return axiosInstance.delete(`/finance/budgets/${id}`);
  },

  // ==================== Reports ====================
  getFinanceReports: (type, params) => {
    // type could be 'monthly', 'yearly', 'summary', etc.
    return axiosInstance.get(`/finance/reports/${type}`, { params });
  },

  getTransactionSummary: (year, month) => {
    return axiosInstance.get('/finance/summary', { params: { year, month } });
  },

  // ==================== New Finance Summary Methods ====================
  getFinanceSummary: async (year) => {
    try {
      const response = await axiosInstance.get('/finance/reports/summary', { params: { year } });
      return response;
    } catch (error) {
      console.error('Error fetching finance summary:', error);
      return { data: { summary: { totalIncome: 0, totalExpense: 0, netBalance: 0, totalCount: 0 } } };
    }
  },

  getMonthlyFinance: async (year) => {
    try {
      const response = await axiosInstance.get('/finance/reports/monthly', { params: { year } });
      return response;
    } catch (error) {
      console.error('Error fetching monthly finance data:', error);
      return { data: [] };
    }
  },

  // ==================== Exports ====================
  exportFinanceData: async (params, format = 'pdf') => {
    try {
      const response = await axiosInstance.get('/finance/export', {
        params: { ...params, format },
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  },

  // ==================== Additional Utilities ====================
  getTransactionCategories: () => {
    return axiosInstance.get('/finance/categories');
  },

  getAccountBalances: () => {
    return axiosInstance.get('/finance/balances');
  }
};