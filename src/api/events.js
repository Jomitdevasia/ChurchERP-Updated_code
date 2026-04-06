import axiosInstance from './axiosConfig';

export const eventsAPI = {
  // ==================== Events (General Programs) ====================
  getAllEvents: (params) => {
    return axiosInstance.get('/events', { params });
  },
  
  getEventById: (id) => {
    return axiosInstance.get(`/events/${id}`);
  },
  
  createEvent: (data) => {
    return axiosInstance.post('/events/create', data);
  },
  
  updateEvent: (id, data) => {
    return axiosInstance.put(`/events/${id}`, data);
  },
  
  deleteEvent: (id) => {
    return axiosInstance.delete(`/events/${id}`);
  },
  
  // ==================== Hall Bookings (Marriages, IELTS, Baptisms, etc.) ====================
  getAllBookings: (params) => {
    return axiosInstance.get('/hall-bookings', { params });
  },
  
  getBookingById: (id) => {
    return axiosInstance.get(`/hall-bookings/${id}`);
  },
  
  createBooking: (data) => {
    return axiosInstance.post('/hall-bookings/create', data);
  },
  
  updateBooking: (id, data) => {
    return axiosInstance.put(`/hall-bookings/${id}`, data);
  },
  
  deleteBooking: (id) => {
    return axiosInstance.delete(`/hall-bookings/${id}`);
  },
  
  // Check hall availability for a given date and time range
  checkAvailability: (hallId, date, startTime, endTime) => {
    return axiosInstance.get('/hall-bookings/check-availability', {
      params: { hallId, date, startTime, endTime }
    });
  },
  
  // Get booking types (e.g., marriage, baptism, IELTS exam, meeting, etc.)
  getBookingTypes: () => {
    return axiosInstance.get('/hall-bookings/types');
  },
  
  // Get all available halls (with their details)
  getHalls: () => {
    return axiosInstance.get('/halls');
  },
  
  // Get bookings for a specific date range (reports)
  getBookingsByDateRange: (startDate, endDate, params) => {
    return axiosInstance.get('/hall-bookings/reports/date-range', {
      params: { startDate, endDate, ...params }
    });
  },
  
  // Get booking statistics (e.g., total income, number of bookings per month)
  getBookingSummary: (year, month) => {
    return axiosInstance.get('/hall-bookings/summary', { params: { year, month } });
  },
  
  // Export bookings data (PDF/Excel)
  exportBookings: async (params, format = 'pdf') => {
    try {
      const response = await axiosInstance.get('/hall-bookings/export', {
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
  // Get list of event categories (e.g., Liturgical, Social, Educational)
  getEventCategories: () => {
    return axiosInstance.get('/events/categories');
  },
  
  // Get upcoming events (for dashboard widget)
  getUpcomingEvents: (limit = 5) => {
    return axiosInstance.get('/events/upcoming', { params: { limit } });
  }
};