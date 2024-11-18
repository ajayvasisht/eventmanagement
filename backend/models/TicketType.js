module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TicketType', {
      ticket_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ticket_name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      seating_type: DataTypes.STRING(50),
      available_seats: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      event_id: {  // Changed from EventId to event_id
        type: DataTypes.INTEGER,
        references: {
          model: 'Events',
          key: 'event_id'
        }
      }
    }, {
      tableName: 'tickettypes',  // Ensure correct table name
      timestamps: false  // If you don't have created_at/updated_at columns
    });
  };