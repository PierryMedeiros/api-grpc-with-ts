import { User } from '../../proto/users_pb';
import { client } from './utils';

export default function updateUser(user: User) {
  return new Promise<User>((resolve, reject) => {
    client.updateUser(user, (err, updatedUser) => {
      if (err) reject(err);
      else resolve(updatedUser);
    });
  });
}
