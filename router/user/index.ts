import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IncomingMessage, ServerResponse } from "http";

import { user } from "../../bootstrap";

export default function(server) {
  server.get('/user/:user_id', {
    schema: {
      description: "get user by user_id",
      params: {
        type: "object",
        required: [ "user_id" ],
        properties: {
          user_id: { type: "number", minimum: 1 },
        },
      },
      tags: ["user"],
      security: [{bearerAuth: []}],
    },
  }, user.find())
}
