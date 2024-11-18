module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TicketBooking', {
      booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      quantity: DataTypes.INTEGER,
      booking_date: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM('booked', 'cancelled', 'completed'),
        defaultValue: 'booked'
      }
    });
  };