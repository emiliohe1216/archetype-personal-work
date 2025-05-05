const sequelize = require('../config/connection');
const { User, Pokemon, Team } = require('../models');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    // Create users
    // const users = await User.bulkCreate([
    //   {
    //     username: 'john_doe',
    //     email: 'john@example.com',
    //     password: 'password123',
    //   },
    //   {
    //     username: 'jane_smith',
    //     email: 'jane@example.com',
    //     password: 'password123',
    //   },
    // ]);
    console.log('\n----- USERS SEEDED -----\n');
    
    // Create categories
    // const categories = await Category.bulkCreate([
    //   { name: 'Work', color: '#3B82F6' },
    //   { name: 'Personal', color: '#10B981' },
    //   { name: 'Shopping', color: '#F59E0B' },
    //   { name: 'Health', color: '#EF4444' },
    // ]);
    // console.log('\n----- CATEGORIES SEEDED -----\n');
    
    // Create pokemons
    const pokemons = await Pokemon.bulkCreate([
      {
        title: 'Complete quarterly report',
        description: 'Compile data and create presentation',
        user_id: users[0].id,
        category_id: categories[0].id,
        priority: 'high',
        status: 'in_progress',
        due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Buy groceries',
        description: 'Milk, bread, eggs, vegetables',
        user_id: users[0].id,
        category_id: categories[2].id,
        priority: 'medium',
        status: 'pending',
        due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Doctor appointment',
        description: 'Annual checkup',
        user_id: users[1].id,
        category_id: categories[3].id,
        priority: 'high',
        status: 'pending',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Read book',
        description: 'Finish reading "Clean Code"',
        user_id: users[1].id,
        category_id: categories[1].id,
        priority: 'low',
        status: 'in_progress',
      },
    ]);
    console.log('\n----- TASKS SEEDED -----\n');
    
    console.log('All seeds completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();