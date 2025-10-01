import { Command } from 'commander';
import { User, UserStatus } from '../../proto/users_pb';
import getUser from './get-user';
import createUser from './create-user';
import allUsers from './all-users';
import updateUser from './update-user';
import deleteUser from './delete-user';

const program = new Command();

program.name('user-cli').description('A CLI for managing users').version('1.0.0');

program
  .command('get <id>')
  .description('Get a user by ID')
  .action(async (id) => {
    const user = await getUser(parseInt(id, 10));
    console.log(user.toString());
  });

program
  .command('list')
  .description('List all users')
  .action(async () => {
    const users = await allUsers();
    for (const user of users) {
      console.log(user.toString());
    }
  });

program
  .command('create <name> <age> <status>')
  .description('Create a new user')
  .action(async (name, age, status) => {
    const user = new User();
    user.setName(name);
    user.setAge(parseInt(age, 10));
    user.setStatus(UserStatus[status.toUpperCase() as keyof typeof UserStatus]);
    const newUser = await createUser(user);
    console.log('Created user:', newUser.toString());
  });

program
  .command('update <id> <name> <age> <status>')
  .description('Update an existing user')
  .action(async (id, name, age, status) => {
    const user = new User();
    user.setId(parseInt(id, 10));
    user.setName(name);
    user.setAge(parseInt(age, 10));
    user.setStatus(UserStatus[status.toUpperCase() as keyof typeof UserStatus]);
    const updatedUser = await updateUser(user);
    console.log('Updated user:', updatedUser.toString());
  });

program
  .command('delete <id>')
  .description('Delete a user by ID')
  .action(async (id) => {
    await deleteUser(parseInt(id, 10));
    console.log('User deleted');
  });

program.parse(process.argv);
