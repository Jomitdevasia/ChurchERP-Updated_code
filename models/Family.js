module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define('Family', {
    family_name: { type: DataTypes.STRING, allowNull: false },
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    country: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    registered_date: DataTypes.DATEONLY,
    status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' }
  });

  Family.associate = (models) => {
    Family.hasMany(models.Member, { foreignKey: 'family_id' });
  };

  return Family;
};