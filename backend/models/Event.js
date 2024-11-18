module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_description: DataTypes.TEXT,
    event_date: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('upcoming', 'ongoing', 'completed'),
      defaultValue: 'upcoming'
    }
  }, {
    tableName: 'events',
    timestamps: false
  });

  return Event;
};