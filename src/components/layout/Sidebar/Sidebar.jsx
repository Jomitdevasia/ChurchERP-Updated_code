import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  IoHome, 
  IoPeople, 
  IoPerson, 
  IoWallet, 
  IoCalendar,
  IoBarChart,
  IoSettings,
  IoBusiness,
  IoLogOut,
  IoMenu,
  IoClose,
  IoPieChart
} from 'react-icons/io5';
import { useAuth } from '../../../hooks/useAuth';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <IoHome /> },
    { path: '/parish', label: 'Parish', icon: <IoBusiness /> },
    { path: '/families', label: 'Families', icon: <IoPeople /> },
    { path: '/members', label: 'Members', icon: <IoPerson /> },
    { path: '/sacraments', label: 'Sacraments', icon: <IoCalendar /> },
    { path: '/donations', label: 'Donations', icon: <IoWallet /> },
    { path: '/finance', label: 'Finance', icon: <IoPieChart /> },
    { path: '/events', label: 'Events', icon: <IoCalendar /> },       // <-- NEW: Events (hall bookings)
    { path: '/reports', label: 'Reports', icon: <IoBarChart /> },
    { path: '/settings', label: 'Settings', icon: <IoSettings /> }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={toggleMobile}>
        {isMobileOpen ? <IoClose /> : <IoMenu />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && <div className="sidebar-overlay" onClick={toggleMobile}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <IoBusiness />
            </div>
            {!isCollapsed && (
              <div className="logo-text">
                <h2>St. Mary's</h2>
                <p>Parish Management</p>
              </div>
            )}
          </div>
          <button className="collapse-btn" onClick={toggleSidebar}>
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link logout-btn" onClick={logout}>
            <span className="sidebar-icon"><IoLogOut /></span>
            {!isCollapsed && <span className="sidebar-label">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;