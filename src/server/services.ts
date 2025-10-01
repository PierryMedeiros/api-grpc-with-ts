import { PrismaClient } from '@prisma/client';
import {
  ServerUnaryCall,
  sendUnaryData,
  ServiceError,
  ServerWritableStream,
  status,
} from '@grpc/grpc-js';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

import { IUsersServer } from '../../proto/users_grpc_pb';
import { User, UserRequest } from '../../proto/users_pb';

const prisma = new PrismaClient();

export class UsersServer implements IUsersServer {
  async getUser(
    call: ServerUnaryCall<UserRequest, User>,
    callback: sendUnaryData<User>,
  ) {
    const userId = call.request.getId();
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const error: ServiceError = {
        code: status.NOT_FOUND,
        name: 'User Missing',
        message: `User with ID ${userId} does not exist.`,
      };
      callback(error, null);
      return;
    }

    console.log(`getUser: returning ${user.name} (id: ${user.id}).`);
    const userResponse = new User();
    userResponse.setId(user.id);
    userResponse.setName(user.name);
    userResponse.setAge(user.age);
    userResponse.setStatus(user.status as any);
    callback(null, userResponse);
  }

  async getUsers(call: ServerWritableStream<Empty, User>) {
    console.log(`getUsers: streaming all users.`);
    const users = await prisma.user.findMany();
    for (const user of users) {
      const userResponse = new User();
      userResponse.setId(user.id);
      userResponse.setName(user.name);
      userResponse.setAge(user.age);
      userResponse.setStatus(user.status as any);
      call.write(userResponse);
    }
    call.end();
  }

  async createUser(
    call: ServerUnaryCall<User, User>,
    callback: sendUnaryData<User>,
  ) {
    const userRequest = call.request;
    const user = await prisma.user.create({
      data: {
        name: userRequest.getName(),
        age: userRequest.getAge(),
        status: userRequest.getStatus().toString(),
      },
    });

    console.log(`createUser: created ${user.name} (id: ${user.id}).`);
    const userResponse = new User();
    userResponse.setId(user.id);
    userResponse.setName(user.name);
    userResponse.setAge(user.age);
    userResponse.setStatus(user.status as any);
    callback(null, userResponse);
  }

  async updateUser(
    call: ServerUnaryCall<User, User>,
    callback: sendUnaryData<User>,
  ) {
    const userRequest = call.request;
    const user = await prisma.user.update({
      where: { id: userRequest.getId() },
      data: {
        name: userRequest.getName(),
        age: userRequest.getAge(),
        status: userRequest.getStatus().toString(),
      },
    });

    console.log(`updateUser: updated ${user.name} (id: ${user.id}).`);
    const userResponse = new User();
    userResponse.setId(user.id);
    userResponse.setName(user.name);
    userResponse.setAge(user.age);
    userResponse.setStatus(user.status as any);
    callback(null, userResponse);
  }

  async deleteUser(
    call: ServerUnaryCall<UserRequest, Empty>,
    callback: sendUnaryData<Empty>,
  ) {
    const userId = call.request.getId();
    await prisma.user.delete({
      where: { id: userId },
    });

    console.log(`deleteUser: deleted user with id ${userId}.`);
    callback(null, new Empty());
  }
}
