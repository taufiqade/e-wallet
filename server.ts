import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteShorthandOptions,
} from "fastify";
import { IncomingMessage, Server, ServerResponse, request } from "http";
import fastifyOas from "fastify-oas";
import fastifyJwt from "fastify-jwt"
import routes from "./router";
import meta from "./package.json";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({logger: true});
const port = 3000;

server.register(fastifyOas, {
  routePrefix: "/documentation",
  swagger: {
    info: {
      title: "Mini Wallet",
      description: "Mini Wallet swagger api",
      version: meta.version,
    },
    consumes: ["application/json"],
    produces: ["application/json"],
    servers: [{
      url: "http://localhost:3000",
      description: "localhost",
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
        BasicAuth: {
          type: "http",
          scheme: "basic",
        },
      },
    },
  },
  exposeRoute: true,
});

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

server.register(fastifyJwt, {
  secret: 'supersecret'
})

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
