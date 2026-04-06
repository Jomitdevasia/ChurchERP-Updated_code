const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const familyRoutes = require('./routes/families');
const memberRoutes = require('./routes/members');

const app = express();
const PORT = process.env.PORT || 3000;

// 👇 ADD THIS LINE RIGHT HERE (after creating the app, before other middleware/routes)
app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/families', familyRoutes);
app.use('/api/members', memberRoutes);

app.get('/', (req, res) => {
  res.send('Member Management API is running');
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });