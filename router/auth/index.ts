import { FastifyReply, FastifyRequest } from "fastify";
import { ServerResponse } from "http";
import userCheck from "../../lib/userCheckMiddleware"
import { auth } from "../../bootstrap";
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
  //////////////// LOGIN ////////////////
  server.post('/login', {
    schema: {
      body: {
        type: "object",
        required: ['password', 'email'],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      tags: ["user"]
    },
  }, auth.login(server))
  //////////////// LOGIN ////////////////

  server.get('/check', {
    ...opts,
    schema: {
      tags: ["user"],
      security: [{bearerAuth: []}],
    },
  }, auth.check())
}