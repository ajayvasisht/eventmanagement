module.exports = (sequelize, DataTypes) => {
    const Organizer = sequelize.define('Organizer', {
      organizer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contact_email: {
        type: DataTypes.STRING,
        unique: true
      },
      phone_number: DataTypes.STRING,
      address: DataTypes.TEXT
    });
    return Organizer;
  };