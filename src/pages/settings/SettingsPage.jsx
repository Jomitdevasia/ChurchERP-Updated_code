import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import './SettingsPage.css';

const SettingsPage = () => {
  // Default theme values (match your :root)
  const defaultTheme = {
    '--primary-gold': '#D4AF37',
    '--primary-gold-dark': '#B8860B',
    '--secondary-crimson': '#027313',
    '--secondary-crimson-dark': '#660000',
    '--white-pure': '#e0f0d7',
    '--gray-light': '#F5F5F5',
    '--gray-medium': '#D3D3D3',
    '--gray-dark': '#808080',
    '--black-soft': '#2C2C2C',
    '--font-heading': "'Playfair Display', serif",
    '--font-body': "'Inter', sans-serif",
    '--radius-sm': '0.25rem',
    '--radius-md': '0.5rem',
    '--radius-lg': '0.75rem',
    '--radius-xl': '1rem',
    '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '--spacing-xs': '0.25rem',
    '--spacing-sm': '0.5rem',
    '--spacing-md': '1rem',
    '--spacing-lg': '1.5rem',
    '--spacing-xl': '2rem',
    '--spacing-2xl': '3rem',
  };

  const [theme, setTheme] = useState(defaultTheme);
  const [activeColorVar, setActiveColorVar] = useState('--primary-gold');

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('parish_theme');
    if (saved) {
      const parsed = JSON.parse(saved);
      setTheme(parsed);
      applyTheme(parsed);
    } else {
      applyTheme(defaultTheme);
    }
  }, []);

  // Apply theme to root element
  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    Object.entries(newTheme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  };

  // Update a single CSS variable
  const updateVariable = (variable, value) => {
    const newTheme = { ...theme, [variable]: value };
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('parish_theme', JSON.stringify(newTheme));
  };

  // Reset to default theme
  const resetTheme = () => {
    setTheme(defaultTheme);
    applyTheme(defaultTheme);
    localStorage.setItem('parish_theme', JSON.stringify(defaultTheme));
  };

  // Font options (Google Fonts)
  const fontOptions = [
    { label: 'Inter', value: "'Inter', sans-serif" },
    { label: 'Playfair Display', value: "'Playfair Display', serif" },
    { label: 'Roboto', value: "'Roboto', sans-serif" },
    { label: 'Open Sans', value: "'Open Sans', sans-serif" },
    { label: 'Lato', value: "'Lato', sans-serif" },
    { label: 'Montserrat', value: "'Montserrat', sans-serif" },
    { label: 'Poppins', value: "'Poppins', sans-serif" },
  ];

  const spacingOptions = ['0.25rem', '0.5rem', '1rem', '1.5rem', '2rem', '3rem'];
  const radiusOptions = ['0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem', '2rem'];
  const shadowOptions = [
    { label: 'None', value: 'none' },
    { label: 'Small', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
    { label: 'Medium', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
    { label: 'Large', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
    { label: 'XL', value: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
  ];

  const colorVariables = [
    { name: 'Primary Gold', var: '--primary-gold' },
    { name: 'Primary Gold Dark', var: '--primary-gold-dark' },
    { name: 'Secondary Crimson', var: '--secondary-crimson' },
    { name: 'Secondary Crimson Dark', var: '--secondary-crimson-dark' },
    { name: 'Background (White/Pure)', var: '--white-pure' },
    { name: 'Light Gray', var: '--gray-light' },
    { name: 'Medium Gray', var: '--gray-medium' },
    { name: 'Dark Gray', var: '--gray-dark' },
    { name: 'Text (Black Soft)', var: '--black-soft' },
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Settings' }
  ];

  return (
    <div className="settings-page">
      <Breadcrumb items={breadcrumbItems} />
      <div className="page-header">
        <h1>Theme & Style Settings</h1>
        <p>Customize the look and feel of the parish management system</p>
      </div>

      <div className="settings-grid">
        {/* Colors Section */}
        <Card title="Colors">
          <div className="color-settings">
            <div className="color-list">
              {colorVariables.map((item) => (
                <button
                  key={item.var}
                  className={`color-btn ${activeColorVar === item.var ? 'active' : ''}`}
                  onClick={() => setActiveColorVar(item.var)}
                >
                  <span
                    className="color-swatch"
                    style={{ backgroundColor: theme[item.var] || '#ccc' }}
                  ></span>
                  {item.name}
                </button>
              ))}
            </div>
            <div className="color-picker">
              <HexColorPicker
                color={theme[activeColorVar] || '#D4AF37'}
                onChange={(color) => updateVariable(activeColorVar, color)}
              />
            </div>
          </div>
        </Card>

        {/* Typography Section */}
        <Card title="Typography">
          <div className="setting-group">
            <label>Heading Font</label>
            <select
              value={theme['--font-heading']}
              onChange={(e) => updateVariable('--font-heading', e.target.value)}
              className="select-field"
            >
              {fontOptions.map(font => (
                <option key={font.value} value={font.value}>{font.label}</option>
              ))}
            </select>
          </div>
          <div className="setting-group">
            <label>Body Font</label>
            <select
              value={theme['--font-body']}
              onChange={(e) => updateVariable('--font-body', e.target.value)}
              className="select-field"
            >
              {fontOptions.map(font => (
                <option key={font.value} value={font.value}>{font.label}</option>
              ))}
            </select>
          </div>
        </Card>

        {/* Spacing & Borders */}
        <Card title="Spacing & Borders">
          <div className="setting-group">
            <label>Base Spacing (Small)</label>
            <select
              value={theme['--spacing-sm']}
              onChange={(e) => updateVariable('--spacing-sm', e.target.value)}
              className="select-field"
            >
              {spacingOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="setting-group">
            <label>Base Spacing (Medium)</label>
            <select
              value={theme['--spacing-md']}
              onChange={(e) => updateVariable('--spacing-md', e.target.value)}
              className="select-field"
            >
              {spacingOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="setting-group">
            <label>Border Radius (Small)</label>
            <select
              value={theme['--radius-sm']}
              onChange={(e) => updateVariable('--radius-sm', e.target.value)}
              className="select-field"
            >
              {radiusOptions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="setting-group">
            <label>Border Radius (Large)</label>
            <select
              value={theme['--radius-lg']}
              onChange={(e) => updateVariable('--radius-lg', e.target.value)}
              className="select-field"
            >
              {radiusOptions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </Card>

        {/* Shadows */}
        <Card title="Shadows">
          <div className="setting-group">
            <label>Shadow Small</label>
            <select
              value={theme['--shadow-sm']}
              onChange={(e) => updateVariable('--shadow-sm', e.target.value)}
              className="select-field"
            >
              {shadowOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div className="setting-group">
            <label>Shadow Medium</label>
            <select
              value={theme['--shadow-md']}
              onChange={(e) => updateVariable('--shadow-md', e.target.value)}
              className="select-field"
            >
              {shadowOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div className="setting-group">
            <label>Shadow Large</label>
            <select
              value={theme['--shadow-lg']}
              onChange={(e) => updateVariable('--shadow-lg', e.target.value)}
              className="select-field"
            >
              {shadowOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </Card>
      </div>

      <div className="settings-actions">
        <Button variant="outline" onClick={resetTheme}>Reset to Default</Button>
        <Button variant="primary" onClick={() => alert('Settings saved to browser!')}>
          Save (Auto-saved)
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;