import { FastifyRequest, FastifyReply, RequestHandler } from "fastify";
import { ServerResponse, request } from "http";
import { Op } from "sequelize";
import { ApiError } from "../../lib/apiError";

export default class Auth {
  protected db;
  constructor(db) {
    this.db = db
  }

  public login(server): RequestHandler {
    // tslint:disable: no-shadowed-variable
    return async (request: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
      const { email, password } = request.body
      const user = await this.db.Users.findOne({
        where: {
          [Op.and]: [
            { email },
            { password }
          ]
        }
      });
      if(!user) {
        throw new ApiError(400, "email or password incorrect")
      }
      const token = server.jwt.sign({ email, password})
      reply.send(token)
    };
  }

  public check(): RequestHandler{
    return async(request: FastifyRequest, reply) => {
      reply.send(request.user) ;
    }
  }
}