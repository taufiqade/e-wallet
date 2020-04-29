import { FastifyReply, FastifyRequest } from "fastify";
import { ServerResponse } from "http";
import { ApiError } from "./apiError";
import { Op } from "sequelize";

import db from "./../database/models"
import ps from "./../lib/parser"
import { IUser } from "../model/user.interface";

export default async function(
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>): Promise<IUser> {
    if (!request.user) {
      throw new ApiError(400, "invalid token");
    }
    try {
      const {email, password} = ps(request.user)
      const user: IUser = await db.Users.findOne({
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

      return ps(user)
    } catch (error) {
      throw new ApiError(500, error)
    }
}
