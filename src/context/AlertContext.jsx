import React, { createContext, useContext, useState, useCallback } from 'react';
import Alert from '../components/common/Alert/Alert';
import './AlertContext.css';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback((alert) => {
    const id = Date.now();
    const newAlert = { id, ...alert };
    
    setAlerts(prev => [...prev, newAlert]);
    
    if (alert.autoClose !== false) {
      setTimeout(() => {
        removeAlert(id);
      }, alert.autoCloseTime || 5000);
    }
    
    return id;
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const success = useCallback((message, options = {}) => {
    return addAlert({ type: 'success', message, ...options });
  }, [addAlert]);

  const error = useCallback((message, options = {}) => {
    return addAlert({ type: 'error', message, ...options });
  }, [addAlert]);

  const warning = useCallback((message, options = {}) => {
    return addAlert({ type: 'warning', message, ...options });
  }, [addAlert]);

  const info = useCallback((message, options = {}) => {
    return addAlert({ type: 'info', message, ...options });
  }, [addAlert]);

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert, success, error, warning, info }}>
      {children}
      <div className="alert-container">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            title={alert.title}
            closable={alert.closable}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};