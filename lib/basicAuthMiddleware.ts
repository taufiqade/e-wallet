import dotenv from "dotenv";
import { FastifyReply, FastifyRequest } from "fastify";
import { ServerResponse } from "http";
import { ApiError } from "./apiError";

export default async function(
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>) {
    if (!request.headers.authorization || request.headers.authorization.indexOf("Basic ") === -1) {
      throw new ApiError(500, "not authorized")
    }
    // verify auth credentials
    const base64Credentials =  request.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");

    if (username !== process.env.AUTH_USERNAME && password !== process.env.AUTH_PASSWORD) {
      throw new ApiError(500, "credential not correct")
    }
    return true;
}
