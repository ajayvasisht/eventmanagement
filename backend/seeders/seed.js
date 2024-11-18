// backend/seeders/seed.js
const db = require('../models');

async function seedDatabase() {
  try {
    // Create Organizer
    const organizer = await db.Organizer.create({
      name: 'Event Masters',
      contact_email: 'contact@eventmasters.com',
      phone_number: '123-456-7890',
      address: '123 Event Street'
    });

    // Create Venue
    const venue = await db.Venue.create({
      venue_name: 'Grand Hall',
      address: '456 Venue Road',
      capacity: 1000
    });

    // Create Event
    const event = await db.Event.create({
      event_name: 'Summer Music Festival',
      event_description: 'A fantastic summer music festival featuring top artists',
      event_date: new Date('2024-12-20'),
      capacity: 500,
      status: 'upcoming',
      OrganizerId: organizer.organizer_id,
      VenueId: venue.venue_id
    });

    // Create TicketType
    await db.TicketType.create({
      ticket_name: 'VIP Pass',
      price: 199.99,
      seating_type: 'VIP',
      available_seats: 100,
      EventId: event.event_id
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run seeder if this file is run directly
if (require.main === module) {
  seedDatabase().then(() => process.exit());
}

module.exports = seedDatabase;