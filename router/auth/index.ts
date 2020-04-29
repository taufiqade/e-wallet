import { FastifyReply, FastifyRequest } from "fastify";
import { ServerResponse } from "http";
import userCheck from "./../../lib/userCheck"
import { auth } from "../../bootstrap";
import ps from "./../../lib/parser"
import { IUser } from "../../model/user.interface";

export default function(server) {
  const opts = {
    preValidation: async(
      request: FastifyRequest,
      reply: FastifyReply<ServerResponse>
    ) => {
      try {
        await request.jwtVerify()
        return
      } catch (err) {
        reply.send(err)
      }
    },
    preHandler: async (
      request: FastifyRequest,
      reply: FastifyReply<ServerResponse>,
    ) => {
      const user: IUser = await userCheck(request, reply);
      request.user = user
      return;
    }
  }
  server.post('/login', auth.login(server))
  server.get('/check', opts, auth.check())
}