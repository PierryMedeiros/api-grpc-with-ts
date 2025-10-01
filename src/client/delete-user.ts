import { UserRequest } from '../../proto/users_pb';
import { client } from './utils';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

export default function deleteUser(id: number) {
  return new Promise<Empty>((resolve, reject) => {
    const request = new UserRequest();
    request.setId(id);

    client.deleteUser(request, (err, empty) => {
      if (err) reject(err);
      else resolve(empty);
    });
  });
}
