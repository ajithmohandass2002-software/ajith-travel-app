const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Destination = require('./models/Destination');
const Package = require('./models/Package');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await User.deleteMany();
    await Destination.deleteMany();
    await Package.deleteMany();

    // 1. Create Admin & User
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@travelgo.com',
      password: 'password123',
      role: 'admin'
    });

    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user'
    });

    // 2. Create Destinations
    const dest1 = await Destination.create({
      name: 'Santorini',
      country: 'Greece',
      description: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera.',
      price: 1200,
      rating: 4.8,
      images: ['https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1920&q=80']
    });

    const dest2 = await Destination.create({
      name: 'Kyoto',
      country: 'Japan',
      description: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It\'s famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It’s also known for formal traditions such as kaiseki dining.',
      price: 1500,
      rating: 4.9,
      images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80']
    });

    const dest3 = await Destination.create({
      name: 'Banff National Park',
      country: 'Canada',
      description: 'Banff National Park is Canada\'s oldest national park, established in 1885. Located in Alberta\'s Rocky Mountains, it encompasses mountainous terrain, with many glaciers and ice fields, dense coniferous forest, and alpine landscapes.',
      price: 900,
      rating: 4.7,
      images: ['https://images.unsplash.com/photo-1544325946-b84784405900?auto=format&fit=crop&w=1920&q=80']
    });

    const dest4 = await Destination.create({
      name: 'Swiss Alps',
      country: 'Switzerland',
      description: 'The Alpine region of Switzerland, conventionally referred to as the Swiss Alps, represents a major natural feature of the country and is, along with the Swiss Plateau and the Swiss portion of the Jura Mountains, one of its three main physiographic regions.',
      price: 2100,
      rating: 5.0,
      images: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=80']
    });

    // 3. Create Packages
    await Package.insertMany([
      {
        title: 'Santorini Sunset Retreat',
        destinationId: dest1._id,
        durationDays: 5,
        price: 1500,
        description: 'Enjoy 5 days of luxury overlooking the beautiful Aegean sea with guided sunset tours.'
      },
      {
        title: 'Aegean Island Hopper',
        destinationId: dest1._id,
        durationDays: 10,
        price: 2800,
        description: 'Hop around the Greek islands over 10 days, starting from gorgeous Santorini.'
      },
      {
        title: 'Historic Kyoto Experience',
        destinationId: dest2._id,
        durationDays: 7,
        price: 2200,
        description: 'Immerse yourself in ancient Japanese culture with guided temple tours and tea ceremonies.'
      },
      {
        title: 'Canadian Rockies Adventure',
        destinationId: dest3._id,
        durationDays: 6,
        price: 1100,
        description: 'Hike the majestic trails of Banff, including visits to Lake Louise and Moraine Lake.'
      },
      {
        title: 'Swiss Alpine Ski Resort',
        destinationId: dest4._id,
        durationDays: 8,
        price: 3500,
        description: 'Stay in a luxury ski-in/ski-out chalet with included lift passes.'
      }
    ]);

    console.log('Database successfully seeded!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
