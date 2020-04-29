import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteShorthandOptions,
} from "fastify";
import { IncomingMessage, Server, ServerResponse, request } from "http";
import routes from "./router";
import meta from "./package.json";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({logger: true});
const port = 3000;

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          version: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get(
  "/",
  opts,
  (_: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    reply.send({
      name: meta.name,
      version: meta.version,
    });
  },
);

// init routes
routes.forEach((route) => {
  route(server);
});

server.listen(port, "0.0.0.0", (error, address) => {
  if (error) {
    // tslint:disable-next-line: no-console
    console.error(error);
  }
  // tslint:disable-next-line: no-console
  console.log(`API running at ${address}`);
});
