const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database
const db = {
  users: [
    { id: 1, email: "admin@parish.com", password: "password", name: "Admin User", role: "admin" },
    { id: 2, email: "secretary@parish.com", password: "secretary123", name: "Mary Johnson", role: "secretary" },
    { id: 3, email: "priest@parish.com", password: "priest123", name: "Rev. Fr. John Doe", role: "priest" },
    { id: 4, email: "treasurer@parish.com", password: "treasurer123", name: "Michael Brown", role: "treasurer" }
  ],
  
  // Families 2024-2026
  families: [
    { id: 1, familyId: "F001", familyName: "Smith Family", address: "123 Main St", ward: "Ward 1", phone: "+1 (555) 123-4567", email: "smith@example.com", status: "active", memberCount: 4, createdAt: "2024-01-15" },
    { id: 2, familyId: "F002", familyName: "Johnson Family", address: "456 Oak Ave", ward: "Ward 2", phone: "+1 (555) 234-5678", email: "johnson@example.com", status: "active", memberCount: 3, createdAt: "2024-01-20" },
    { id: 3, familyId: "F003", familyName: "Williams Family", address: "789 Pine St", ward: "Ward 1", phone: "+1 (555) 345-6789", email: "williams@example.com", status: "active", memberCount: 5, createdAt: "2024-02-01" },
    { id: 4, familyId: "F004", familyName: "Brown Family", address: "321 Elm St", ward: "Ward 3", phone: "+1 (555) 456-7890", email: "brown@example.com", status: "active", memberCount: 2, createdAt: "2024-02-10" },
    { id: 5, familyId: "F005", familyName: "Davis Family", address: "654 Maple Ave", ward: "Ward 2", phone: "+1 (555) 567-8901", email: "davis@example.com", status: "active", memberCount: 4, createdAt: "2024-02-15" },
    { id: 6, familyId: "F006", familyName: "Miller Family", address: "987 Cedar St", ward: "Ward 1", phone: "+1 (555) 678-9012", email: "miller@example.com", status: "active", memberCount: 3, createdAt: "2024-03-01" },
    { id: 7, familyId: "F007", familyName: "Wilson Family", address: "147 Birch Ave", ward: "Ward 3", phone: "+1 (555) 789-0123", email: "wilson@example.com", status: "active", memberCount: 4, createdAt: "2024-03-10" },
    { id: 8, familyId: "F008", familyName: "Moore Family", address: "258 Spruce St", ward: "Ward 2", phone: "+1 (555) 890-1234", email: "moore@example.com", status: "active", memberCount: 2, createdAt: "2024-03-15" },
    { id: 9, familyId: "F009", familyName: "Taylor Family", address: "369 Walnut Ave", ward: "Ward 1", phone: "+1 (555) 901-2345", email: "taylor@example.com", status: "active", memberCount: 3, createdAt: "2024-03-20" },
    { id: 10, familyId: "F010", familyName: "Anderson Family", address: "741 Cherry Ln", ward: "Ward 3", phone: "+1 (555) 012-3456", email: "anderson@example.com", status: "active", memberCount: 4, createdAt: "2024-03-25" },
    { id: 11, familyId: "F011", familyName: "Martinez Family", address: "852 Oak St", ward: "Ward 2", phone: "+1 (555) 111-2222", email: "martinez@example.com", status: "active", memberCount: 3, createdAt: "2025-02-10" },
    { id: 12, familyId: "F012", familyName: "Garcia Family", address: "963 Pine Ave", ward: "Ward 1", phone: "+1 (555) 333-4444", email: "garcia@example.com", status: "active", memberCount: 4, createdAt: "2025-03-15" },
    { id: 13, familyId: "F013", familyName: "Rodriguez Family", address: "741 Maple Dr", ward: "Ward 3", phone: "+1 (555) 555-6666", email: "rodriguez@example.com", status: "active", memberCount: 2, createdAt: "2025-04-20" },
    { id: 14, familyId: "F014", familyName: "Lopez Family", address: "159 Cedar Rd", ward: "Ward 1", phone: "+1 (555) 777-8888", email: "lopez@example.com", status: "active", memberCount: 5, createdAt: "2025-06-05" },
    { id: 15, familyId: "F015", familyName: "Gonzalez Family", address: "753 Birch Ln", ward: "Ward 2", phone: "+1 (555) 999-0000", email: "gonzalez@example.com", status: "active", memberCount: 3, createdAt: "2025-09-12" },
    { id: 16, familyId: "F016", familyName: "Perez Family", address: "357 Spruce St", ward: "Ward 3", phone: "+1 (555) 111-3333", email: "perez@example.com", status: "active", memberCount: 4, createdAt: "2026-01-15" },
    { id: 17, familyId: "F017", familyName: "Sanchez Family", address: "246 Walnut Ave", ward: "Ward 1", phone: "+1 (555) 444-5555", email: "sanchez@example.com", status: "active", memberCount: 3, createdAt: "2026-02-20" },
    { id: 18, familyId: "F018", familyName: "Ramirez Family", address: "135 Cherry Ln", ward: "Ward 2", phone: "+1 (555) 666-7777", email: "ramirez@example.com", status: "active", memberCount: 5, createdAt: "2026-03-10" }
  ],
  
  // Members 2024-2026
  members: [
    { id: 1, memberId: "M001", name: "John Smith", familyId: 1, familyName: "Smith Family", dateOfBirth: "1985-03-15", gender: "male", phone: "+1 (555) 123-4567", email: "john.smith@example.com", status: "active", age: 39, joinedDate: "2024-01-15" },
    { id: 2, memberId: "M002", name: "Mary Smith", familyId: 1, familyName: "Smith Family", dateOfBirth: "1987-07-22", gender: "female", phone: "+1 (555) 123-4567", email: "mary.smith@example.com", status: "active", age: 37, joinedDate: "2024-01-15" },
    { id: 3, memberId: "M003", name: "James Johnson", familyId: 2, familyName: "Johnson Family", dateOfBirth: "1990-11-10", gender: "male", phone: "+1 (555) 234-5678", email: "james.johnson@example.com", status: "active", age: 34, joinedDate: "2024-01-20" },
    { id: 4, memberId: "M004", name: "Sarah Williams", familyId: 3, familyName: "Williams Family", dateOfBirth: "1992-05-20", gender: "female", phone: "+1 (555) 345-6789", email: "sarah.williams@example.com", status: "active", age: 32, joinedDate: "2024-02-01" },
    { id: 5, memberId: "M005", name: "Robert Brown", familyId: 4, familyName: "Brown Family", dateOfBirth: "1978-12-03", gender: "male", phone: "+1 (555) 456-7890", email: "robert.brown@example.com", status: "active", age: 46, joinedDate: "2024-02-10" },
    { id: 6, memberId: "M006", name: "Lisa Davis", familyId: 5, familyName: "Davis Family", dateOfBirth: "1983-09-18", gender: "female", phone: "+1 (555) 567-8901", email: "lisa.davis@example.com", status: "active", age: 41, joinedDate: "2024-02-15" },
    { id: 7, memberId: "M007", name: "Michael Miller", familyId: 6, familyName: "Miller Family", dateOfBirth: "1995-02-28", gender: "male", phone: "+1 (555) 678-9012", email: "michael.miller@example.com", status: "active", age: 29, joinedDate: "2024-03-01" },
    { id: 8, memberId: "M008", name: "Patricia Wilson", familyId: 7, familyName: "Wilson Family", dateOfBirth: "1980-06-14", gender: "female", phone: "+1 (555) 789-0123", email: "patricia.wilson@example.com", status: "active", age: 44, joinedDate: "2024-03-10" },
    { id: 9, memberId: "M009", name: "Thomas Moore", familyId: 8, familyName: "Moore Family", dateOfBirth: "1975-10-22", gender: "male", phone: "+1 (555) 890-1234", email: "thomas.moore@example.com", status: "active", age: 49, joinedDate: "2024-03-15" },
    { id: 10, memberId: "M010", name: "Jennifer Taylor", familyId: 9, familyName: "Taylor Family", dateOfBirth: "1988-04-05", gender: "female", phone: "+1 (555) 901-2345", email: "jennifer.taylor@example.com", status: "active", age: 36, joinedDate: "2024-03-20" },
    { id: 11, memberId: "M011", name: "David Anderson", familyId: 10, familyName: "Anderson Family", dateOfBirth: "1993-08-12", gender: "male", phone: "+1 (555) 012-3456", email: "david.anderson@example.com", status: "active", age: 31, joinedDate: "2024-03-25" },
    { id: 12, memberId: "M012", name: "Carlos Martinez", familyId: 11, familyName: "Martinez Family", dateOfBirth: "1985-07-15", gender: "male", phone: "+1 (555) 111-2222", email: "carlos.martinez@example.com", status: "active", age: 40, joinedDate: "2025-02-10" },
    { id: 13, memberId: "M013", name: "Elena Martinez", familyId: 11, familyName: "Martinez Family", dateOfBirth: "1987-03-22", gender: "female", phone: "+1 (555) 111-2222", email: "elena.martinez@example.com", status: "active", age: 38, joinedDate: "2025-02-10" },
    { id: 14, memberId: "M014", name: "Antonio Garcia", familyId: 12, familyName: "Garcia Family", dateOfBirth: "1990-11-10", gender: "male", phone: "+1 (555) 333-4444", email: "antonio.garcia@example.com", status: "active", age: 35, joinedDate: "2025-03-15" },
    { id: 15, memberId: "M015", name: "Sofia Garcia", familyId: 12, familyName: "Garcia Family", dateOfBirth: "1992-08-20", gender: "female", phone: "+1 (555) 333-4444", email: "sofia.garcia@example.com", status: "active", age: 33, joinedDate: "2025-03-15" },
    { id: 16, memberId: "M016", name: "Luis Rodriguez", familyId: 13, familyName: "Rodriguez Family", dateOfBirth: "1988-05-18", gender: "male", phone: "+1 (555) 555-6666", email: "luis.rodriguez@example.com", status: "active", age: 37, joinedDate: "2025-04-20" },
    { id: 17, memberId: "M017", name: "Maria Perez", familyId: 16, familyName: "Perez Family", dateOfBirth: "1991-09-25", gender: "female", phone: "+1 (555) 111-3333", email: "maria.perez@example.com", status: "active", age: 35, joinedDate: "2026-01-15" },
    { id: 18, memberId: "M018", name: "Jose Perez", familyId: 16, familyName: "Perez Family", dateOfBirth: "1989-12-10", gender: "male", phone: "+1 (555) 111-3333", email: "jose.perez@example.com", status: "active", age: 37, joinedDate: "2026-01-15" },
    { id: 19, memberId: "M019", name: "Ana Sanchez", familyId: 17, familyName: "Sanchez Family", dateOfBirth: "1993-04-12", gender: "female", phone: "+1 (555) 444-5555", email: "ana.sanchez@example.com", status: "active", age: 33, joinedDate: "2026-02-20" },
    { id: 20, memberId: "M020", name: "Diego Sanchez", familyId: 17, familyName: "Sanchez Family", dateOfBirth: "1995-07-30", gender: "male", phone: "+1 (555) 444-5555", email: "diego.sanchez@example.com", status: "active", age: 31, joinedDate: "2026-02-20" },
    { id: 21, memberId: "M021", name: "Carmen Ramirez", familyId: 18, familyName: "Ramirez Family", dateOfBirth: "1986-11-08", gender: "female", phone: "+1 (555) 666-7777", email: "carmen.ramirez@example.com", status: "active", age: 40, joinedDate: "2026-03-10" },
    { id: 22, memberId: "M022", name: "Fernando Ramirez", familyId: 18, familyName: "Ramirez Family", dateOfBirth: "1988-02-14", gender: "male", phone: "+1 (555) 666-7777", email: "fernando.ramirez@example.com", status: "active", age: 38, joinedDate: "2026-03-10" }
  ],
  
  // Sacraments 2024-2026
  sacraments: [
    { id: 1, memberId: 1, memberName: "John Smith", sacramentType: "baptism", date: "2024-01-20", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2024-001", year: 2024 },
    { id: 2, memberId: 2, memberName: "Mary Smith", sacramentType: "communion", date: "2024-02-15", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "COM-2024-001", year: 2024 },
    { id: 3, memberId: 7, memberName: "Michael Miller", sacramentType: "baptism", date: "2024-03-05", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2024-002", year: 2024 },
    { id: 4, memberId: 3, memberName: "James Johnson", sacramentType: "confirmation", date: "2024-04-10", priest: "Rev. Fr. John", church: "St. Mary's Church", certificateNumber: "CON-2024-001", year: 2024 },
    { id: 5, memberId: 12, memberName: "Carlos Martinez", sacramentType: "baptism", date: "2025-02-20", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2025-001", year: 2025 },
    { id: 6, memberId: 13, memberName: "Elena Martinez", sacramentType: "communion", date: "2025-03-15", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "COM-2025-001", year: 2025 },
    { id: 7, memberId: 14, memberName: "Antonio Garcia", sacramentType: "baptism", date: "2025-03-25", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2025-002", year: 2025 },
    { id: 8, memberId: 16, memberName: "Luis Rodriguez", sacramentType: "confirmation", date: "2025-05-10", priest: "Rev. Fr. John", church: "St. Mary's Church", certificateNumber: "CON-2025-001", year: 2025 },
    { id: 9, memberId: 15, memberName: "Sofia Garcia", sacramentType: "marriage", date: "2025-06-20", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "MAR-2025-001", year: 2025, spouseName: "Antonio Garcia" },
    { id: 10, memberId: 17, memberName: "Maria Perez", sacramentType: "baptism", date: "2026-01-25", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2026-001", year: 2026 },
    { id: 11, memberId: 19, memberName: "Ana Sanchez", sacramentType: "communion", date: "2026-02-28", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "COM-2026-001", year: 2026 },
    { id: 12, memberId: 21, memberName: "Carmen Ramirez", sacramentType: "baptism", date: "2026-03-15", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2026-002", year: 2026 }
  ],
  
  // Donations 2024-2026
  donations: [
    { id: 1, memberId: 1, memberName: "John Smith", amount: 500, type: "tithe", date: "2024-01-05", paymentMethod: "cash", receiptNumber: "RCP-2024-001", month: 1, year: 2024 },
    { id: 2, memberId: 2, memberName: "Mary Smith", amount: 300, type: "offertory", date: "2024-01-12", paymentMethod: "online", receiptNumber: "RCP-2024-002", month: 1, year: 2024 },
    { id: 3, memberId: 3, memberName: "James Johnson", amount: 200, type: "tithe", date: "2024-02-18", paymentMethod: "cash", receiptNumber: "RCP-2024-003", month: 2, year: 2024 },
    { id: 4, memberId: 4, memberName: "Sarah Williams", amount: 150, type: "offertory", date: "2024-02-26", paymentMethod: "check", receiptNumber: "RCP-2024-004", month: 2, year: 2024 },
    { id: 5, memberId: 7, memberName: "Michael Miller", amount: 400, type: "tithe", date: "2024-03-19", paymentMethod: "online", receiptNumber: "RCP-2024-005", month: 3, year: 2024 },
    { id: 6, memberId: 8, memberName: "Patricia Wilson", amount: 600, type: "building", date: "2024-03-23", paymentMethod: "check", receiptNumber: "RCP-2024-006", month: 3, year: 2024 },
    { id: 7, memberId: 12, memberName: "Carlos Martinez", amount: 550, type: "tithe", date: "2025-02-10", paymentMethod: "cash", receiptNumber: "RCP-2025-001", month: 2, year: 2025 },
    { id: 8, memberId: 13, memberName: "Elena Martinez", amount: 350, type: "offertory", date: "2025-02-20", paymentMethod: "online", receiptNumber: "RCP-2025-002", month: 2, year: 2025 },
    { id: 9, memberId: 14, memberName: "Antonio Garcia", amount: 400, type: "tithe", date: "2025-03-15", paymentMethod: "cash", receiptNumber: "RCP-2025-003", month: 3, year: 2025 },
    { id: 10, memberId: 16, memberName: "Luis Rodriguez", amount: 700, type: "building", date: "2025-04-20", paymentMethod: "check", receiptNumber: "RCP-2025-004", month: 4, year: 2025 },
    { id: 11, memberId: 15, memberName: "Sofia Garcia", amount: 300, type: "offertory", date: "2025-05-10", paymentMethod: "cash", receiptNumber: "RCP-2025-005", month: 5, year: 2025 },
    { id: 12, memberId: 1, memberName: "John Smith", amount: 600, type: "tithe", date: "2025-06-05", paymentMethod: "cash", receiptNumber: "RCP-2025-006", month: 6, year: 2025 },
    { id: 13, memberId: 17, memberName: "Maria Perez", amount: 450, type: "tithe", date: "2026-01-20", paymentMethod: "cash", receiptNumber: "RCP-2026-001", month: 1, year: 2026 },
    { id: 14, memberId: 18, memberName: "Jose Perez", amount: 350, type: "offertory", date: "2026-01-25", paymentMethod: "online", receiptNumber: "RCP-2026-002", month: 1, year: 2026 },
    { id: 15, memberId: 19, memberName: "Ana Sanchez", amount: 500, type: "tithe", date: "2026-02-15", paymentMethod: "cash", receiptNumber: "RCP-2026-003", month: 2, year: 2026 },
    { id: 16, memberId: 20, memberName: "Diego Sanchez", amount: 300, type: "offertory", date: "2026-02-22", paymentMethod: "online", receiptNumber: "RCP-2026-004", month: 2, year: 2026 },
    { id: 17, memberId: 21, memberName: "Carmen Ramirez", amount: 600, type: "tithe", date: "2026-03-10", paymentMethod: "cash", receiptNumber: "RCP-2026-005", month: 3, year: 2026 },
    { id: 18, memberId: 22, memberName: "Fernando Ramirez", amount: 400, type: "building", date: "2026-03-18", paymentMethod: "check", receiptNumber: "RCP-2026-006", month: 3, year: 2026 }
  ],
  
  // Dashboard with aggregated data
  dashboard: {
    totalFamilies: 18,
    totalMembers: 22,
    totalDonations: 7600,
    sacramentsThisYear: 3,
    recentActivities: [
      { id: 1, description: "New family registered: Ramirez Family", user: "Admin", time: "2 hours ago" },
      { id: 2, description: "Donation received: $400 from Fernando Ramirez", user: "Treasurer", time: "5 hours ago" },
      { id: 3, description: "Baptism recorded for Carmen Ramirez", user: "Priest", time: "1 day ago" },
      { id: 4, description: "New member added: Fernando Ramirez", user: "Secretary", time: "2 days ago" },
      { id: 5, description: "First Communion for Ana Sanchez", user: "Priest", time: "3 days ago" }
    ],
    upcomingEvents: [
      { id: 1, title: "Sunday Mass", date: "2026-03-30", location: "Main Church", time: "10:00 AM" },
      { id: 2, title: "Bible Study", date: "2026-03-31", location: "Parish Hall", time: "7:00 PM" },
      { id: 3, title: "Youth Group Meeting", date: "2026-04-02", location: "Youth Center", time: "6:30 PM" },
      { id: 4, title: "Easter Vigil Mass", date: "2026-04-04", location: "Main Church", time: "8:00 PM" },
      { id: 5, title: "Easter Sunday Mass", date: "2026-04-05", location: "Main Church", time: "10:00 AM" }
    ],
    monthlyStats: {
      families: { jan: 16, feb: 17, mar: 18 },
      members: { jan: 19, feb: 21, mar: 22 },
      donations: { jan: 800, feb: 800, mar: 1000 }
    }
  },
  
  // Reports with month-by-month data
  reports: {
    monthlyDonations: [
      { name: "Jan", value: 800 },
      { name: "Feb", value: 800 },
      { name: "Mar", value: 1000 },
      { name: "Apr", value: 0 },
      { name: "May", value: 0 },
      { name: "Jun", value: 0 }
    ],
    memberGrowth: [
      { period: "Jan", members: 19, newMembers: 2 },
      { period: "Feb", members: 21, newMembers: 2 },
      { period: "Mar", members: 22, newMembers: 1 },
      { period: "Apr", members: 22, newMembers: 0 },
      { period: "May", members: 22, newMembers: 0 },
      { period: "Jun", members: 22, newMembers: 0 }
    ],
    donationTypes: [
      { name: "Tithe", value: 3800 },
      { name: "Offertory", value: 1900 },
      { name: "Building", value: 1700 },
      { name: "Charity", value: 200 },
      { name: "Other", value: 0 }
    ]
  },
  
  parish: {
    id: 1,
    name: "St. Mary's Parish",
    address: "123 Church Street, Parish City",
    phone: "+1 (555) 123-4567",
    email: "parish@stmarys.org",
    priest: "Rev. Fr. John Doe",
    established: "1900",
    description: "St. Mary's Parish is a vibrant Catholic community dedicated to serving God and neighbor. We welcome all to join us in faith, worship, and service."
  },

  // ============ FINANCE MODULE DATA ============
  finance: {
    accounts: [
      { id: 1, name: "Main Checking", type: "checking", balance: 12500.00, currency: "USD", isActive: true },
      { id: 2, name: "Savings Account", type: "savings", balance: 45000.00, currency: "USD", isActive: true },
      { id: 3, name: "Petty Cash", type: "cash", balance: 500.00, currency: "USD", isActive: true },
      { id: 4, name: "Building Fund", type: "savings", balance: 78500.00, currency: "USD", isActive: true }
    ],
    categories: [
      { id: 1, name: "Tithe", type: "income", isActive: true },
      { id: 2, name: "Offertory", type: "income", isActive: true },
      { id: 3, name: "Building Fund", type: "income", isActive: true },
      { id: 4, name: "Charity", type: "income", isActive: true },
      { id: 5, name: "Salaries", type: "expense", isActive: true },
      { id: 6, name: "Utilities", type: "expense", isActive: true },
      { id: 7, name: "Maintenance", type: "expense", isActive: true },
      { id: 8, name: "Office Supplies", type: "expense", isActive: true },
      { id: 9, name: "Programs & Events", type: "expense", isActive: true }
    ],
    transactions: [
      { id: 1, date: "2024-01-05", description: "January Tithes", amount: 500.00, type: "income", category: "Tithe", account: "Main Checking", memberId: 1, referenceNumber: "TIT-2024-001", notes: "" },
      { id: 2, date: "2024-01-12", description: "Offertory Collection", amount: 300.00, type: "income", category: "Offertory", account: "Main Checking", memberId: null, referenceNumber: "OFF-2024-001", notes: "" },
      { id: 3, date: "2024-01-25", description: "Electricity Bill", amount: -180.00, type: "expense", category: "Utilities", account: "Main Checking", memberId: null, referenceNumber: "UTIL-2024-001", notes: "Jan 2024 bill" },
      { id: 4, date: "2024-02-10", description: "February Tithes", amount: 450.00, type: "income", category: "Tithe", account: "Main Checking", memberId: 3, referenceNumber: "TIT-2024-002", notes: "" },
      { id: 5, date: "2024-02-18", description: "Office Supplies", amount: -95.00, type: "expense", category: "Office Supplies", account: "Petty Cash", memberId: null, referenceNumber: "SUP-2024-001", notes: "Paper, pens, ink" },
      { id: 6, date: "2024-03-01", description: "March Building Fund", amount: 600.00, type: "income", category: "Building Fund", account: "Building Fund", memberId: 8, referenceNumber: "BLD-2024-001", notes: "Special donation" },
      { id: 7, date: "2024-03-15", description: "Priest Salary", amount: -2500.00, type: "expense", category: "Salaries", account: "Main Checking", memberId: null, referenceNumber: "SAL-2024-003", notes: "March stipend" },
      { id: 8, date: "2025-01-20", description: "January Tithes", amount: 550.00, type: "income", category: "Tithe", account: "Main Checking", memberId: 12, referenceNumber: "TIT-2025-001", notes: "" },
      { id: 9, date: "2025-02-10", description: "Utility Bill - Water", amount: -120.00, type: "expense", category: "Utilities", account: "Main Checking", memberId: null, referenceNumber: "UTIL-2025-002", notes: "Feb water" },
      { id: 10, date: "2025-03-05", description: "Youth Event Supplies", amount: -350.00, type: "expense", category: "Programs & Events", account: "Petty Cash", memberId: null, referenceNumber: "EVT-2025-001", notes: "Food, decorations" },
      { id: 11, date: "2025-04-20", description: "Building Fund - Easter", amount: 800.00, type: "income", category: "Building Fund", account: "Building Fund", memberId: 16, referenceNumber: "BLD-2025-002", notes: "" },
      { id: 12, date: "2025-05-15", description: "Maintenance - Roof Repair", amount: -1200.00, type: "expense", category: "Maintenance", account: "Main Checking", memberId: null, referenceNumber: "MNT-2025-001", notes: "Leak fix" },
      { id: 13, date: "2026-01-25", description: "January Tithes", amount: 450.00, type: "income", category: "Tithe", account: "Main Checking", memberId: 17, referenceNumber: "TIT-2026-001", notes: "" },
      { id: 14, date: "2026-01-30", description: "Offertory", amount: 350.00, type: "income", category: "Offertory", account: "Main Checking", memberId: 18, referenceNumber: "OFF-2026-001", notes: "" },
      { id: 15, date: "2026-02-10", description: "February Tithes", amount: 500.00, type: "income", category: "Tithe", account: "Main Checking", memberId: 19, referenceNumber: "TIT-2026-002", notes: "" },
      { id: 16, date: "2026-02-18", description: "Electricity Bill", amount: -210.00, type: "expense", category: "Utilities", account: "Main Checking", memberId: null, referenceNumber: "UTIL-2026-002", notes: "Feb bill" },
      { id: 17, date: "2026-03-05", description: "Building Fund", amount: 600.00, type: "income", category: "Building Fund", account: "Building Fund", memberId: 21, referenceNumber: "BLD-2026-001", notes: "" },
      { id: 18, date: "2026-03-12", description: "Office Supplies", amount: -65.00, type: "expense", category: "Office Supplies", account: "Petty Cash", memberId: null, referenceNumber: "SUP-2026-002", notes: "" },
      { id: 19, date: "2026-03-20", description: "Youth Program", amount: -200.00, type: "expense", category: "Programs & Events", account: "Main Checking", memberId: null, referenceNumber: "EVT-2026-001", notes: "Easter event" }
    ],
    budgets: [
      { id: 1, category: "Salaries", amount: 30000, year: 2026 },
      { id: 2, category: "Utilities", amount: 5000, year: 2026 },
      { id: 3, category: "Maintenance", amount: 4000, year: 2026 },
      { id: 4, category: "Programs & Events", amount: 3500, year: 2026 },
      { id: 5, category: "Office Supplies", amount: 1500, year: 2026 }
    ],
    reports: {
      monthlyIncome: [
        { name: "Jan", value: 800 },
        { name: "Feb", value: 500 },
        { name: "Mar", value: 600 },
        { name: "Apr", value: 0 },
        { name: "May", value: 0 },
        { name: "Jun", value: 0 }
      ],
      monthlyExpense: [
        { name: "Jan", value: 180 },
        { name: "Feb", value: 95 },
        { name: "Mar", value: 2500 },
        { name: "Apr", value: 0 },
        { name: "May", value: 0 },
        { name: "Jun", value: 0 }
      ],
      categoryBreakdown: [
        { name: "Tithe", value: 2450 },
        { name: "Offertory", value: 1000 },
        { name: "Building Fund", value: 2000 },
        { name: "Salaries", value: 2500 },
        { name: "Utilities", value: 510 },
        { name: "Maintenance", value: 1200 },
        { name: "Programs & Events", value: 550 },
        { name: "Office Supplies", value: 160 }
      ]
    }
  },

  // ============ EVENTS MODULE DATA ============
  events: [
    { id: 1, title: "Sunday Mass", date: "2026-03-30", time: "10:00 AM", location: "Main Church", description: "Weekly Sunday service", status: "upcoming", type: "other" },
    { id: 2, title: "Bible Study", date: "2026-03-31", time: "7:00 PM", location: "Parish Hall", description: "Study the Gospel of John", status: "upcoming", type: "meeting" },
    { id: 3, title: "Youth Group Meeting", date: "2026-04-02", time: "6:30 PM", location: "Youth Center", description: "Games and fellowship", status: "upcoming", type: "meeting" },
    { id: 4, title: "Easter Vigil", date: "2026-04-04", time: "8:00 PM", location: "Main Church", description: "Easter Vigil Mass", status: "upcoming", type: "other" },
    { id: 5, title: "Wedding Reception", date: "2026-04-10", time: "2:00 PM", location: "Parish Hall", description: "Reception for John and Mary", status: "upcoming", type: "marriage" },
    { id: 6, title: "IELTS Exam", date: "2026-04-15", time: "9:00 AM", location: "Conference Room", description: "International English Language Testing", status: "upcoming", type: "ielts_exam" }
  ],

  // ============ HALL BOOKINGS MODULE DATA ============
  hallBookings: [
    { id: 1, eventName: "Wedding Reception", date: "2026-04-10", startTime: "14:00", endTime: "22:00", hall: "Parish Hall", contactPerson: "John Doe", phone: "1234567890", status: "confirmed", amount: 500 },
    { id: 2, eventName: "Charity Dinner", date: "2026-04-15", startTime: "18:00", endTime: "21:00", hall: "Parish Hall", contactPerson: "Jane Smith", phone: "0987654321", status: "pending", amount: 300 },
    { id: 3, eventName: "Baptism Reception", date: "2026-04-20", startTime: "12:00", endTime: "16:00", hall: "Conference Room", contactPerson: "Maria Perez", phone: "5551112222", status: "confirmed", amount: 200 }
  ]
};

// ============ AUTH ENDPOINTS ============
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword, accessToken: 'mock-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true });
});

// ============ FAMILIES ENDPOINTS ============
app.get('/api/families', (req, res) => {
  res.json({ families: db.families, total: db.families.length });
});

app.get('/api/families/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const family = db.families.find(f => f.id === id);
  family ? res.json(family) : res.status(404).json({ message: 'Family not found' });
});

app.post('/api/families/create', (req, res) => {
  const newFamily = { id: db.families.length + 1, ...req.body, memberCount: 0 };
  db.families.push(newFamily);
  res.json(newFamily);
});

app.put('/api/families/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.families.findIndex(f => f.id === id);
  if (index !== -1) {
    db.families[index] = { ...db.families[index], ...req.body };
    res.json(db.families[index]);
  } else {
    res.status(404).json({ message: 'Family not found' });
  }
});

app.delete('/api/families/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.families.findIndex(f => f.id === id);
  if (index !== -1) {
    db.families.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ message: 'Family not found' });
  }
});

app.get('/api/families/:id/members', (req, res) => {
  const familyId = parseInt(req.params.id);
  const members = db.members.filter(m => m.familyId === familyId);
  res.json(members);
});

// ============ MEMBERS ENDPOINTS ============
app.get('/api/members', (req, res) => {
  res.json({ members: db.members, total: db.members.length });
});

app.get('/api/members/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const member = db.members.find(m => m.id === id);
  member ? res.json(member) : res.status(404).json({ message: 'Member not found' });
});

app.post('/api/members/create', (req, res) => {
  const newMember = { id: db.members.length + 1, ...req.body };
  db.members.push(newMember);
  res.json(newMember);
});

app.put('/api/members/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.members.findIndex(m => m.id === id);
  if (index !== -1) {
    db.members[index] = { ...db.members[index], ...req.body };
    res.json(db.members[index]);
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

app.delete('/api/members/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.members.findIndex(m => m.id === id);
  if (index !== -1) {
    db.members.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

// ============ SACRAMENTS ENDPOINTS ============
app.get('/api/sacraments/records', (req, res) => {
  res.json({ sacraments: db.sacraments, total: db.sacraments.length });
});

app.post('/api/sacraments/create', (req, res) => {
  const newSacrament = { id: db.sacraments.length + 1, ...req.body };
  db.sacraments.push(newSacrament);
  res.json(newSacrament);
});

app.get('/api/dashboard/sacrament-stats', (req, res) => {
  const baptisms = db.sacraments.filter(s => s.sacramentType === 'baptism').length;
  const communions = db.sacraments.filter(s => s.sacramentType === 'communion').length;
  const confirmations = db.sacraments.filter(s => s.sacramentType === 'confirmation').length;
  const marriages = db.sacraments.filter(s => s.sacramentType === 'marriage').length;
  res.json({ data: { baptisms, communions, confirmations, marriages, total: db.sacraments.length } });
});

// ============ DONATIONS ENDPOINTS ============
app.get('/api/donations', (req, res) => {
  res.json({ donations: db.donations, total: db.donations.length, totalAmount: db.donations.reduce((sum, d) => sum + d.amount, 0) });
});

app.post('/api/donations/create', (req, res) => {
  const newDonation = { id: db.donations.length + 1, ...req.body };
  db.donations.push(newDonation);
  res.json(newDonation);
});

app.get('/api/donations/types', (req, res) => {
  res.json(['tithe', 'offertory', 'building', 'charity', 'other']);
});

// ============ PARISH ENDPOINTS ============
app.get('/api/parish', (req, res) => {
  res.json({ data: db.parish });
});

app.put('/api/parish/update', (req, res) => {
  db.parish = { ...db.parish, ...req.body };
  res.json(db.parish);
});

// ============ CONTACT ENDPOINTS ============
app.post('/api/contact/send', (req, res) => {
  res.json({ success: true, message: 'Message received!' });
});

// ============ DASHBOARD ENDPOINTS ============
app.get('/api/dashboard', (req, res) => {
  res.json({ data: db.dashboard });
});

app.get('/api/dashboard/recent-activities', (req, res) => {
  res.json({ data: db.dashboard.recentActivities });
});

app.get('/api/dashboard/upcoming-events', (req, res) => {
  res.json({ data: db.dashboard.upcomingEvents });
});

app.get('/api/dashboard/trends', (req, res) => {
  res.json({ data: { families: { positive: true, value: 12 }, members: { positive: true, value: 8 }, donations: { positive: true, value: 5 }, sacraments: { positive: true, value: 0 } } });
});

app.get('/api/reports/monthly-donations', (req, res) => {
  res.json({ data: db.reports.monthlyDonations });
});

app.get('/api/reports/member-growth', (req, res) => {
  res.json({ data: db.reports.memberGrowth });
});

// ============ FINANCE ENDPOINTS ============

// Helper function to filter and paginate transactions
const filterTransactions = (transactions, query) => {
  let filtered = [...transactions];
  if (query.search) {
    const search = query.search.toLowerCase();
    filtered = filtered.filter(t => t.description.toLowerCase().includes(search) || (t.referenceNumber && t.referenceNumber.toLowerCase().includes(search)));
  }
  if (query.type) filtered = filtered.filter(t => t.type === query.type);
  if (query.category) filtered = filtered.filter(t => t.category === query.category);
  if (query.account) filtered = filtered.filter(t => t.account === query.account);
  if (query.sortBy) {
    const sortField = query.sortBy;
    const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
    filtered.sort((a, b) => {
      let aVal = a[sortField], bVal = b[sortField];
      if (sortField === 'amount') { aVal = Math.abs(aVal); bVal = Math.abs(bVal); }
      if (aVal < bVal) return -1 * sortOrder;
      if (aVal > bVal) return 1 * sortOrder;
      return 0;
    });
  } else {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return filtered;
};

app.get('/api/finance/transactions', (req, res) => {
  const transactions = db.finance.transactions;
  let filtered = filterTransactions(transactions, req.query);
  const total = filtered.length;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  const totalIncome = filtered.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filtered.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  res.json({ transactions: paginated, total, totalIncome, totalExpense, page, limit });
});

app.get('/api/finance/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const transaction = db.finance.transactions.find(t => t.id === id);
  transaction ? res.json(transaction) : res.status(404).json({ message: 'Transaction not found' });
});

app.post('/api/finance/transactions', (req, res) => {
  const newId = db.finance.transactions.length + 1;
  const newTransaction = { id: newId, ...req.body, amount: req.body.type === 'expense' ? -Math.abs(req.body.amount) : Math.abs(req.body.amount) };
  db.finance.transactions.push(newTransaction);
  res.json(newTransaction);
});

app.put('/api/finance/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.finance.transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    const updated = { ...db.finance.transactions[index], ...req.body };
    if (req.body.amount) updated.amount = updated.type === 'expense' ? -Math.abs(updated.amount) : Math.abs(updated.amount);
    db.finance.transactions[index] = updated;
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
});

app.delete('/api/finance/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.finance.transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    db.finance.transactions.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
});

app.get('/api/finance/accounts', (req, res) => res.json(db.finance.accounts));
app.get('/api/finance/categories', (req, res) => res.json(db.finance.categories));
app.get('/api/finance/budgets', (req, res) => {
  let budgets = db.finance.budgets;
  if (req.query.year) budgets = budgets.filter(b => b.year === parseInt(req.query.year));
  res.json(budgets);
});
app.post('/api/finance/budgets', (req, res) => {
  const newBudget = { id: db.finance.budgets.length + 1, ...req.body };
  db.finance.budgets.push(newBudget);
  res.json(newBudget);
});
app.get('/api/finance/balances', (req, res) => res.json(db.finance.accounts.map(acc => ({ id: acc.id, name: acc.name, balance: acc.balance }))));

app.get('/api/finance/reports/:type', (req, res) => {
  const { type } = req.params;
  if (type === 'monthly') {
    const currentYear = new Date().getFullYear();
    const monthlyData = [];
    for (let m = 1; m <= 12; m++) {
      const monthStr = m.toString().padStart(2, '0');
      const income = db.finance.transactions.filter(t => t.type === 'income' && t.date.startsWith(`${currentYear}-${monthStr}`)).reduce((sum, t) => sum + t.amount, 0);
      const expense = db.finance.transactions.filter(t => t.type === 'expense' && t.date.startsWith(`${currentYear}-${monthStr}`)).reduce((sum, t) => sum + Math.abs(t.amount), 0);
      monthlyData.push({ month: m, income, expense, net: income - expense });
    }
    res.json({ data: monthlyData });
  } else if (type === 'yearly') {
    const years = [...new Set(db.finance.transactions.map(t => t.date.split('-')[0]))];
    const yearlyData = years.map(y => {
      const income = db.finance.transactions.filter(t => t.type === 'income' && t.date.startsWith(y)).reduce((sum, t) => sum + t.amount, 0);
      const expense = db.finance.transactions.filter(t => t.type === 'expense' && t.date.startsWith(y)).reduce((sum, t) => sum + Math.abs(t.amount), 0);
      return { year: y, income, expense, net: income - expense };
    });
    res.json({ data: yearlyData });
  } else {
    const currentYear = new Date().getFullYear();
    const transactions = db.finance.transactions.filter(t => t.date.startsWith(currentYear.toString()));
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const categoryBreakdown = {};
    transactions.forEach(t => {
      const cat = t.category;
      if (!categoryBreakdown[cat]) categoryBreakdown[cat] = 0;
      categoryBreakdown[cat] += t.type === 'income' ? t.amount : -Math.abs(t.amount);
    });
    const breakdownArray = Object.entries(categoryBreakdown).map(([name, value]) => ({ name, value }));
    res.json({ summary: { totalIncome, totalExpense, netBalance: totalIncome - totalExpense, totalCount: transactions.length }, categoryBreakdown: breakdownArray });
  }
});

app.get('/api/finance/export', (req, res) => {
  const content = `Finance Report\nGenerated: ${new Date().toISOString()}\nTransactions: ${JSON.stringify(db.finance.transactions)}`;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=finance_report.pdf');
  res.send(Buffer.from(content));
});

// ============ EVENTS ENDPOINTS ============
app.get('/api/events', (req, res) => {
  res.json({ events: db.events, total: db.events.length });
});

app.get('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const event = db.events.find(e => e.id === id);
  event ? res.json(event) : res.status(404).json({ message: 'Event not found' });
});

app.post('/api/events/create', (req, res) => {
  const newEvent = { id: db.events.length + 1, ...req.body };
  db.events.push(newEvent);
  res.json(newEvent);
});

app.put('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.events.findIndex(e => e.id === id);
  if (index !== -1) {
    db.events[index] = { ...db.events[index], ...req.body };
    res.json(db.events[index]);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

app.delete('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.events.findIndex(e => e.id === id);
  if (index !== -1) {
    db.events.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

// ============ HALL BOOKINGS ENDPOINTS ============
app.get('/api/hall-bookings', (req, res) => {
  res.json({ bookings: db.hallBookings, total: db.hallBookings.length });
});

app.get('/api/hall-bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const booking = db.hallBookings.find(b => b.id === id);
  booking ? res.json(booking) : res.status(404).json({ message: 'Booking not found' });
});

app.post('/api/hall-bookings/create', (req, res) => {
  const newBooking = { id: db.hallBookings.length + 1, ...req.body };
  db.hallBookings.push(newBooking);
  res.json(newBooking);
});

app.put('/api/hall-bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.hallBookings.findIndex(b => b.id === id);
  if (index !== -1) {
    db.hallBookings[index] = { ...db.hallBookings[index], ...req.body };
    res.json(db.hallBookings[index]);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});

app.delete('/api/hall-bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.hallBookings.findIndex(b => b.id === id);
  if (index !== -1) {
    db.hallBookings.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});

// ============ REPORTS ENDPOINTS ============

// Families by ward
app.get('/api/reports/families-by-ward', (req, res) => {
  const wardCount = {};
  db.families.forEach(f => { wardCount[f.ward] = (wardCount[f.ward] || 0) + 1; });
  const data = Object.entries(wardCount).map(([name, value]) => ({ name, value }));
  res.json({ data, total: db.families.length, wards: Object.keys(wardCount).length });
});

// Members by gender
app.get('/api/reports/members-by-gender', (req, res) => {
  const genderCount = { male: 0, female: 0 };
  db.members.forEach(m => { genderCount[m.gender] = (genderCount[m.gender] || 0) + 1; });
  const data = Object.entries(genderCount).map(([name, value]) => ({ name, value }));
  res.json({ data, total: db.members.length, byGender: genderCount });
});

// Sacraments summary
app.get('/api/reports/sacraments-summary', (req, res) => {
  const { year } = req.query;
  let sacraments = db.sacraments;
  if (year) sacraments = sacraments.filter(s => s.year === parseInt(year));
  const summary = {
    total: sacraments.length,
    baptisms: sacraments.filter(s => s.sacramentType === 'baptism').length,
    communions: sacraments.filter(s => s.sacramentType === 'communion').length,
    confirmations: sacraments.filter(s => s.sacramentType === 'confirmation').length,
    marriages: sacraments.filter(s => s.sacramentType === 'marriage').length,
  };
  const data = Object.entries(summary).filter(([k]) => k !== 'total').map(([name, value]) => ({ name, value }));
  res.json({ data, summary });
});

// Donations by type
app.get('/api/reports/donations-by-type', (req, res) => {
  const { year } = req.query;
  let donations = db.donations;
  if (year) donations = donations.filter(d => d.year === parseInt(year));
  const typeTotal = {};
  donations.forEach(d => { typeTotal[d.type] = (typeTotal[d.type] || 0) + d.amount; });
  const data = Object.entries(typeTotal).map(([name, value]) => ({ name, value }));
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  res.json({ data, summary: { totalAmount, categories: Object.keys(typeTotal).length } });
});

// Events summary
app.get('/api/reports/events-summary', (req, res) => {
  const { year } = req.query;
  let events = db.events;
  if (year) events = events.filter(e => new Date(e.date).getFullYear() === parseInt(year));
  const typeCount = {};
  events.forEach(e => { typeCount[e.type] = (typeCount[e.type] || 0) + 1; });
  const data = Object.entries(typeCount).map(([name, value]) => ({ name, value }));
  res.json({ data, summary: { total: events.length, upcoming: events.filter(e => e.status === 'upcoming').length } });
});

// Hall Bookings revenue
app.get('/api/reports/hall-bookings-revenue', (req, res) => {
  const { year } = req.query;
  let bookings = db.hallBookings;
  if (year) bookings = bookings.filter(b => new Date(b.date).getFullYear() === parseInt(year));
  const monthlyRevenue = Array(12).fill(0);
  bookings.forEach(b => {
    const month = new Date(b.date).getMonth();
    monthlyRevenue[month] += b.amount || 0;
  });
  const data = monthlyRevenue.map((value, idx) => ({ name: new Date(0, idx).toLocaleString('default', { month: 'short' }), value }));
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  res.json({ data, summary: { totalRevenue, totalBookings: bookings.length } });
});

// Export report (mock)
app.get('/api/reports/export/:type', (req, res) => {
  const { type } = req.params;
  const { year, format } = req.query;
  const content = `${type.toUpperCase()} Report\nGenerated: ${new Date().toISOString()}\nYear: ${year || 'All'}\nData: ${JSON.stringify({ type, year })}`;
  const filename = `${type}_report_${year || 'all'}.${format}`;
  const contentType = format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.send(Buffer.from(content));
});

app.get('/api/reports/families-by-ward', (req, res) => {
  const wardMap = {};
  db.families.forEach(f => { wardMap[f.ward] = (wardMap[f.ward] || 0) + 1; });
  const data = Object.entries(wardMap).map(([name, value]) => ({ name, value }));
  const details = Object.entries(wardMap).map(([ward, count]) => ({ ward, count }));
  res.json({ data, details, total: db.families.length, wards: Object.keys(wardMap).length });
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 MOCK BACKEND SERVER IS RUNNING!');
  console.log('='.repeat(60));
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log('\n📋 TEST CREDENTIALS:');
  console.log('   ┌─────────────────────────────────────┐');
  console.log('   │ Email: admin@parish.com            │');
  console.log('   │ Password: password                  │');
  console.log('   ├─────────────────────────────────────┤');
  console.log('   │ Email: secretary@parish.com        │');
  console.log('   │ Password: secretary123              │');
  console.log('   ├─────────────────────────────────────┤');
  console.log('   │ Email: priest@parish.com           │');
  console.log('   │ Password: priest123                 │');
  console.log('   └─────────────────────────────────────┘');
  console.log('\n📊 API ENDPOINTS:');
  console.log('   POST   /api/auth/login');
  console.log('   POST   /api/auth/logout');
  console.log('   GET    /api/dashboard');
  console.log('   GET    /api/dashboard/recent-activities');
  console.log('   GET    /api/dashboard/upcoming-events');
  console.log('   GET    /api/dashboard/sacrament-stats');
  console.log('   GET    /api/families');
  console.log('   POST   /api/families/create');
  console.log('   PUT    /api/families/:id');
  console.log('   DELETE /api/families/:id');
  console.log('   GET    /api/members');
  console.log('   POST   /api/members/create');
  console.log('   PUT    /api/members/:id');
  console.log('   DELETE /api/members/:id');
  console.log('   GET    /api/sacraments/records');
  console.log('   POST   /api/sacraments/create');
  console.log('   GET    /api/donations');
  console.log('   POST   /api/donations/create');
  console.log('   GET    /api/parish');
  console.log('   PUT    /api/parish/update');
  console.log('   POST   /api/contact/send');
  console.log('   --- Finance Module ---');
  console.log('   GET    /api/finance/transactions');
  console.log('   POST   /api/finance/transactions');
  console.log('   GET    /api/finance/transactions/:id');
  console.log('   PUT    /api/finance/transactions/:id');
  console.log('   DELETE /api/finance/transactions/:id');
  console.log('   GET    /api/finance/accounts');
  console.log('   GET    /api/finance/categories');
  console.log('   GET    /api/finance/budgets');
  console.log('   POST   /api/finance/budgets');
  console.log('   GET    /api/finance/balances');
  console.log('   GET    /api/finance/reports/:type');
  console.log('   GET    /api/finance/export');
  console.log('   --- Events Module ---');
  console.log('   GET    /api/events');
  console.log('   GET    /api/events/:id');
  console.log('   POST   /api/events/create');
  console.log('   PUT    /api/events/:id');
  console.log('   DELETE /api/events/:id');
  console.log('   --- Hall Bookings Module ---');
  console.log('   GET    /api/hall-bookings');
  console.log('   GET    /api/hall-bookings/:id');
  console.log('   POST   /api/hall-bookings/create');
  console.log('   PUT    /api/hall-bookings/:id');
  console.log('   DELETE /api/hall-bookings/:id');
  console.log('\n📊 DATA SUMMARY:');
  console.log(`   👨‍👩‍👧‍👦 Families: ${db.families.length}`);
  console.log(`   👤 Members: ${db.members.length}`);
  console.log(`   ✝️ Sacraments: ${db.sacraments.length}`);
  console.log(`   💰 Donations: ${db.donations.length}`);
  console.log(`   💵 Finance Transactions: ${db.finance.transactions.length}`);
  console.log(`   📅 Events: ${db.events.length}`);
  console.log(`   🏢 Hall Bookings: ${db.hallBookings.length}`);
  console.log('\n✨ Server ready! Press Ctrl+C to stop.\n');
  console.log('='.repeat(60));
});