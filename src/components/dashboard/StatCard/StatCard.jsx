import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, trend, color = 'gold' }) => {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-content">
        <div className="stat-info">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
          {trend && (
            <p className={`stat-trend ${trend.positive ? 'positive' : 'negative'}`}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className="stat-icon">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;