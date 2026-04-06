import React, { useState, useEffect } from 'react';
import { IoCheckmarkCircle, IoWarning, IoInformation, IoCloseCircle } from 'react-icons/io5';
import './Alert.css';

const Alert = ({ 
  type = 'info', 
  message, 
  title,
  showIcon = true,
  closable = true,
  autoClose = false,
  autoCloseTime = 5000,
  onClose,
  className = ''
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, visible]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  const icons = {
    success: <IoCheckmarkCircle />,
    error: <IoCloseCircle />,
    warning: <IoWarning />,
    info: <IoInformation />
  };

  return (
    <div className={`alert alert-${type} ${closable ? 'alert-closable' : ''} ${className}`}>
      {showIcon && <div className="alert-icon">{icons[type]}</div>}
      <div className="alert-content">
        {title && <div className="alert-title">{title}</div>}
        <div className="alert-message">{message}</div>
      </div>
      {closable && (
        <button className="alert-close" onClick={handleClose}>×</button>
      )}
    </div>
  );
};

export default Alert;