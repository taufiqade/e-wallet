import { RequestHandler, FastifyRequest, FastifyReply } from "fastify";
import { ServerResponse } from "http";
import { IUserRepository } from "../../repository/contract";

export default class UserHandler {
  protected userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  public find(): RequestHandler {
    return async (request: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
      const user = await this.userRepository.findById(request.params.user_id) || {}
      reply.send(user);
    };
  }
}