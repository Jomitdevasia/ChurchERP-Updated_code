# ⛪ St. Mary's Parish Management System

A comprehensive Parish ERP system for managing church operations including families, members, sacraments, donations, and more.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Node-16+-green.svg)](https://nodejs.org/)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Test Credentials](#test-credentials)
- [Project Structure](#project-structure)
- [Features Overview](#features-overview)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🔐 **Authentication** - Secure login system with role-based access
- 👨‍👩‍👧‍👦 **Family Management** - Manage parish families with complete details
- 👤 **Member Management** - Track all parish members with their information
- ✝️ **Sacraments Tracking** - Record and manage all sacraments (Baptism, Communion, Confirmation, Marriage)
- 💰 **Donation Management** - Track donations, generate reports, and export data
- 📊 **Dashboard** - Interactive dashboard with charts and statistics
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 📄 **Export Functionality** - Export data to PDF, Excel, and CSV formats
- 🔍 **Search & Filter** - Advanced search and filtering capabilities

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js 18.2.0
- **Routing:** React Router v6
- **Styling:** Custom CSS with Christian-themed design
- **Charts:** Recharts for data visualization
- **Icons:** React Icons (Io5)
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Forms:** React Hook Form
- **Date Handling:** date-fns

### Backend (Mock)
- **Server:** Express.js
- **Database:** JSON (mock data)
- **Authentication:** JWT-like tokens (mock)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
  ```
  node --version
  ```
- **npm** (v8 or higher) or **yarn**
  ```
  npm --version
  ```
- **Git** (for cloning the repository)
  ```
  git --version
  ```

## 🚀 Installation

### 1. Clone the repository
```
git clone https://github.com/yourusername/parish-erp.git
cd parish-erp/frontend
```

### 2. Install dependencies
```
npm install
```

### 3. Install additional dependencies (if needed)
```
# For mock backend
npm install express cors body-parser

# For development (optional)
npm install --save-dev concurrently
```

## 🏃 Running the Application

### Start the Mock Backend Server
Open a terminal and run:
```
node server.js
```

You should see:
```
============================================================
🚀 MOCK BACKEND SERVER IS RUNNING!
============================================================
📍 Server URL: http://localhost:5000

📋 TEST CREDENTIALS:
   ┌─────────────────────────────────────┐
   │ Email: admin@parish.com            │
   │ Password: password                  │
   ├─────────────────────────────────────┤
   │ Email: secretary@parish.com        │
   │ Password: secretary123              │
   └─────────────────────────────────────┘
```

### Start the React Application
Open a new terminal and run:
```
npm start
```

The app will open automatically at [http://localhost:3000](http://localhost:3000)

### Run Both Servers Simultaneously (Optional)
If you have `concurrently` installed:
```
npm run dev
```

## 🔑 Test Credentials

Use these credentials to log in to the system:

| Role | Email | Password |
|------|-------|----------|
| 👑 **Admin** | admin@parish.com | password |
| 📝 **Secretary** | secretary@parish.com | secretary123 |
| 🙏 **Priest** | priest@parish.com | priest123 |

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML file
│   └── favicon.ico         # Favicon
├── src/
│   ├── api/                # API integration layer
│   │   ├── axiosConfig.js  # Axios configuration
│   │   ├── auth.js         # Authentication API
│   │   ├── families.js     # Families API
│   │   ├── members.js      # Members API
│   │   ├── sacraments.js   # Sacraments API
│   │   ├── donations.js    # Donations API
│   │   └── dashboard.js    # Dashboard API
│   ├── components/         # Reusable components
│   │   ├── common/         # Common UI components
│   │   │   ├── Button/     # Button component
│   │   │   ├── Card/       # Card component
│   │   │   ├── Table/      # Table component
│   │   │   ├── Modal/      # Modal component
│   │   │   └── Alert/      # Alert component
│   │   ├── layout/         # Layout components
│   │   │   ├── Sidebar/    # Sidebar navigation
│   │   │   ├── Header/     # Header component
│   │   │   └── MainLayout/ # Main layout wrapper
│   │   └── dashboard/      # Dashboard specific components
│   │       ├── StatCard/   # Statistics card
│   │       ├── DonationChart/ # Donation chart
│   │       └── MemberGrowthChart/ # Growth chart
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx # Authentication context
│   │   └── AlertContext.jsx # Alert/Toast context
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js      # Authentication hook
│   │   ├── useApi.js       # API call hook
│   │   ├── useTable.js     # Table management hook
│   │   └── useForm.js      # Form management hook
│   ├── pages/              # Page components
│   │   ├── auth/           # Authentication pages
│   │   │   ├── LoginPage.jsx
│   │   │   └── ForgotPasswordPage.jsx
│   │   ├── dashboard/      # Dashboard page
│   │   │   └── DashboardPage.jsx
│   │   ├── families/       # Family management
│   │   │   ├── FamiliesListPage.jsx
│   │   │   ├── AddFamilyPage.jsx
│   │   │   └── FamilyDetailsPage.jsx
│   │   ├── members/        # Member management
│   │   │   ├── MembersListPage.jsx
│   │   │   ├── AddMemberPage.jsx
│   │   │   └── MemberDetailsPage.jsx
│   │   ├── sacraments/     # Sacraments management
│   │   │   ├── SacramentsDashboard.jsx
│   │   │   ├── SacramentRecordsPage.jsx
│   │   │   └── AddSacramentPage.jsx
│   │   └── donations/      # Donations management
│   │       ├── DonationsListPage.jsx
│   │       ├── AddDonationPage.jsx
│   │       └── DonationReportsPage.jsx
│   ├── styles/             # CSS styles
│   │   ├── global.css      # Global styles
│   │   ├── theme.css       # Theme variables
│   │   └── components.css  # Component styles
│   ├── utils/              # Utility functions
│   │   ├── formatters.js   # Date, currency formatters
│   │   ├── validators.js   # Form validators
│   │   └── exportHelpers.js # Export utilities
│   ├── App.jsx             # Main App component
│   └── index.js            # Entry point
├── server.js               # Mock backend server
├── package.json            # Dependencies and scripts
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## 🎯 Features Overview

### 1. Dashboard
- **Statistics Cards:** Total families, members, donations, and sacraments
- **Monthly Donations Chart:** Visual representation of donations over time
- **Member Growth Chart:** Track parish growth trends
- **Recent Activities:** Latest actions in the system
- **Upcoming Events:** Calendar of parish events

### 2. Family Management
- **List View:** Paginated list of all families with search
- **Add Family:** Create new family records
- **Family Details:** View complete family information
- **Family Members:** List of members belonging to each family
- **Edit/Delete:** Update or remove family records

### 3. Member Management
- **Member List:** Comprehensive list with search and filter
- **Add Member:** Register new parish members
- **Member Profile:** Detailed member information
- **Sacraments History:** Track all sacraments received
- **Donation History:** View member donation records

### 4. Sacraments Management
- **Sacrament Types:** Baptism, Communion, Confirmation, Marriage
- **Record Keeping:** Track dates, priests, and certificate numbers
- **Sacrament Dashboard:** Statistics by sacrament type
- **Certificate Generation:** Download sacrament certificates (coming soon)

### 5. Donations Management
- **Donation Types:** Tithe, Offertory, Building, Charity, Other
- **Payment Methods:** Cash, Check, Online, Bank Transfer
- **Reports:** Monthly, quarterly, and yearly reports
- **Export:** Download reports in PDF, Excel, or CSV format

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User authentication |
| POST | `/api/auth/logout` | User logout |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Dashboard statistics |
| GET | `/api/dashboard/recent-activities` | Recent activities |
| GET | `/api/dashboard/upcoming-events` | Upcoming events |

### Families
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/families` | List all families |
| GET | `/api/families/:id` | Get family by ID |
| POST | `/api/families/create` | Create new family |
| PUT | `/api/families/:id` | Update family |
| DELETE | `/api/families/:id` | Delete family |
| GET | `/api/families/:id/members` | Get family members |

### Members
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/members` | List all members |
| GET | `/api/members/:id` | Get member by ID |
| POST | `/api/members/create` | Create new member |
| PUT | `/api/members/:id` | Update member |
| DELETE | `/api/members/:id` | Delete member |
| GET | `/api/members/:id/sacraments` | Get member sacraments |
| GET | `/api/members/:id/donations` | Get member donations |

### Sacraments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sacraments/dashboard` | Sacraments dashboard |
| GET | `/api/sacraments/records` | List all sacraments |
| POST | `/api/sacraments/create` | Create new sacrament |
| GET | `/api/sacraments/types` | Get sacrament types |

### Donations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/donations` | List all donations |
| POST | `/api/donations/create` | Create new donation |
| GET | `/api/donations/types` | Get donation types |
| GET | `/api/reports/donations/:type` | Get donation reports |

### Parish
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/parish` | Get parish details |
| PUT | `/api/parish/update` | Update parish details |
| GET | `/api/parish/mass-schedules` | Get mass schedules |

## 📸 Screenshots

### Login Page
[Image: Login page with church-themed design]

### Dashboard
[Image: Main dashboard with statistics and charts]

### Families List
[Image: Families list with search and actions]

### Member Profile
[Image: Member details with sacraments and donations]

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
   ```
   git clone https://github.com/yourusername/parish-erp.git
   ```

2. **Create a feature branch**
   ```
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your changes**
   ```
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the branch**
   ```
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test your changes before submitting
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **St. Mary's Parish** for inspiration and requirements
- **React Community** for amazing tools and libraries
- **All Contributors** who helped build this system

## 📞 Contact

- **Project Link:** [https://github.com/yourusername/parish-erp](https://github.com/yourusername/parish-erp)
- **Report Issues:** [GitHub Issues](https://github.com/yourusername/parish-erp/issues)

## ⭐ Show Your Support

If you found this project helpful, please give it a star on GitHub! ⭐

---

**Built with ❤️ for St. Mary's Parish**