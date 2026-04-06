import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  title,
  subtitle,
  icon,
  actions,
  loading = false,
  className = '',
  hoverable = false,
  bordered = true
}) => {
  if (loading) {
    return (
      <div className={`card card-loading ${className}`}>
        <div className="card-skeleton">
          <div className="skeleton-title"></div>
          <div className="skeleton-content"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card ${hoverable ? 'card-hoverable' : ''} ${!bordered ? 'card-unbordered' : ''} ${className}`}>
      {(title || icon || actions) && (
        <div className="card-header">
          <div className="card-title-wrapper">
            {icon && <div className="card-icon">{icon}</div>}
            <div>
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;