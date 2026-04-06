module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    member_id: { type: DataTypes.STRING(50), unique: true, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: DataTypes.STRING,
    middle_name: DataTypes.STRING,
    suffix: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female', 'other'),
    date_of_birth: DataTypes.DATEONLY,
    place_of_birth: DataTypes.STRING,
    baptism_date: DataTypes.DATEONLY,
    baptism_place: DataTypes.STRING,
    marital_status: DataTypes.ENUM('single', 'married', 'widowed', 'divorced', 'separated'),
    occupation: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    id_type: DataTypes.STRING,
    id_number: DataTypes.STRING,
    profile_photo_url: DataTypes.TEXT,
    status: { type: DataTypes.ENUM('active', 'inactive', 'deceased'), defaultValue: 'active' },
    notes: DataTypes.TEXT
  });

  Member.associate = (models) => {
    Member.belongsTo(models.Family, { foreignKey: 'family_id' });
  };

  return Member;
};