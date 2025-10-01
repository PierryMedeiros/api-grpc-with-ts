import { User } from '../../proto/users_pb';
import { client } from './utils';

export default function createUser(user: User) {
  return new Promise<User>((resolve, reject) => {
    client.createUser(user, (err, newUser) => {
      if (err) reject(err);
      else resolve(newUser);
    });
  });
}
