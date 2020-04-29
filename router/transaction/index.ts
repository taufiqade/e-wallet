import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IncomingMessage, ServerResponse } from "http";

import { transaction } from "../../bootstrap";
import { IUser } from "../../model/user.interface";
import userCheck from "./../../lib/userCheckMiddleware"
import basicAuthMiddleware from "../../lib/basicAuthMiddleware";

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

  const basicOpts = {
    preHandler: async (
      request: FastifyRequest,
      reply: FastifyReply<ServerResponse>,
    ) => {
      await basicAuthMiddleware(request, reply);
      return;
    }
  }

  ////////////////////////////////////////////////////////////////////////
  server.post('/transaction', {
    ...opts,
    schema: {
      description: "transfer balance to another user",
      body: {
        type: "object",
        required: [ "email", "amount", "ip", "location", "user_agent", "author" ],
        properties: {
          email: { type: "string" },
          amount: { type: "number", minimum: 1 },
          ip: { type: "string" },
          location: { type: "string" },
          user_agent: { type: "string" },
          author: { type: "string" },
        },
      },
      tags: ["transaction"],
      security: [{bearerAuth: []}],
    },
  }, transaction.transfer())
  ////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////////////////////
  server.post('/topup', {
    ...basicOpts,
    schema: {
      description: "topup into user balance",
      body: {
        type: "object",
        required: [ "email", "amount", "ip", "location", "user_agent", "author" ],
        properties: {
          email: { type: "string" },
          amount: { type: "number", minimum: 1 },
          ip: { type: "string" },
          location: { type: "string" },
          user_agent: { type: "string" },
          author: { type: "string" },
        },
      },
      tags: ["transaction"],
      security: [{BasicAuth: []}],
    },
  }, transaction.topup())
  ////////////////////////////////////////////////////////////////////////
}
