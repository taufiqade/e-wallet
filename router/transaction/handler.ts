import { RequestHandler, FastifyRequest, FastifyReply } from "fastify";
import { ServerResponse } from "http";
import { IUserBalanceRepository, IUserBalanceHistoryRepository, IUserRepository } from "../../repository/contract";
import { ApiError } from "../../lib/apiError";
import ps from "./../../lib/parser"

export default class TransactionHandler {
  protected userBalanceRepo: IUserBalanceRepository;
  protected userBalanceHistoryRepo: IUserBalanceHistoryRepository;
  protected userRepo: IUserRepository;
  protected sequelize;

  constructor({ userRepo, userBalanceRepo, userBalanceHistoryRepo, db }) {
    this.userRepo = userRepo
    this.userBalanceRepo = userBalanceRepo
    this.userBalanceHistoryRepo = userBalanceHistoryRepo
    this.sequelize = db.sequelize
  }

  public transfer(): RequestHandler {
    return async (request: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
      try {
        const input = request.body
        const { email, amount } = input;
        const obligor = ps(request.user);
        const beneficiary = await this.userRepo.findBy({email})

        if(!beneficiary) throw new ApiError(404, `${email} not found`);

        const userBalance = await Promise.all([
          this.userBalanceRepo.findById(obligor.id),
          this.userBalanceRepo.findById(beneficiary.id)
        ])
        if(userBalance[0].balance < amount) throw new ApiError(402, "insuficient balance");

        return await this.sequelize.transaction(async (t) => {
          const promises = userBalance.map((user, idx) => {
            const balance = idx === 0 ? user.balance - amount: user.balance + amount;
            // create transaction (user balance history)
            this.userBalanceHistoryRepo.store({
              user_balance_id: user.id,
              balance_before: user.balance,
              balance_after: balance,
              activity: "Transfer",
              type: idx === 0 ? "credit": "debit",
              ip: input.ip,
              location: input.location,
              user_agent: input.user_agent,
              author: input.author,
            }, t)
            // update user balance
            // balance_achieve is the total balance received, it will not decrease
            // balance is current balance
            const balanceAchieve = idx === 0 ? user.balance_achieve: user.balance_achieve + amount;
            this.userBalanceRepo.update({ balance, balance_achieve:balanceAchieve }, user.id, t)
          })

          await Promise.all(promises)
          return { message: "transaction successfully executed" }
        })
      } catch (error) {
        reply.send(error)
      }
    }
  }
  public topup(): RequestHandler {
    return async (request: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
      try {
        const input = request.body

        const user = await this.userRepo.findBy({email: input.email})
        if(!user) throw new ApiError(404, `${input.email} not found`);

        const userBalance = await this.userBalanceRepo.findById(user.id)

        return await this.sequelize.transaction(async (t) => {
          const balance = userBalance.balance + input.amount
          const insert = this.userBalanceHistoryRepo.store({
            user_balance_id: userBalance.id,
            balance_before: userBalance.balance,
            balance_after: balance,
            activity: "TopUp",
            type: "debit",
            ip: input.ip,
            location: input.location,
            user_agent: input.user_agent,
            author: input.author,
          }, t)
          const update = this.userBalanceRepo.update({ balance }, userBalance.id, t)
          await Promise.all([insert, update])
          return { message: "transaction successfully executed" }
        })
      } catch (error) {
        reply.send(error)
      }
    }
  }
}