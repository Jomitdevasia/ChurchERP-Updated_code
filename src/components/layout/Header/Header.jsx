import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { format } from 'date-fns';
import { IoNotifications, IoPerson, IoLogOut, IoSettings } from 'react-icons/io5';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy');

  const notifications = [
    { id: 1, message: 'New family registration pending', time: '5 min ago', type: 'info' },
    { id: 2, message: 'Donation received: $500', time: '1 hour ago', type: 'success' },
    { id: 3, message: 'Mass schedule updated', time: '2 hours ago', type: 'warning' }
  ];

  return (
    <header className="header">
      <div className="header-left">
        <div className="greeting">
          <h2>Welcome back, {user?.name || 'Admin'}!</h2>
          <p>{currentDate}</p>
        </div>
      </div>

      <div className="header-right">
        <div className="notification-wrapper">
          <button 
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <IoNotifications />
            <span className="notification-badge">3</span>
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <h4>Notifications</h4>
                <button>Mark all as read</button>
              </div>
              <div className="notification-list">
                {notifications.map(notif => (
                  <div key={notif.id} className={`notification-item notification-${notif.type}`}>
                    <p>{notif.message}</p>
                    <span>{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="profile-wrapper">
          <button 
            className="profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="profile-avatar">
              <IoPerson />
            </div>
            <span className="profile-name">{user?.name || 'Admin User'}</span>
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <div className="profile-info">
                  <div className="profile-avatar-large">
                    <IoPerson />
                  </div>
                  <div>
                    <h4>{user?.name || 'Admin User'}</h4>
                    <p>{user?.email || 'admin@stmarys.org'}</p>
                  </div>
                </div>
              </div>
              <div className="dropdown-menu">
                <button onClick={() => {}}>
                  <IoSettings /> Settings
                </button>
                <button onClick={logout}>
                  <IoLogOut /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;