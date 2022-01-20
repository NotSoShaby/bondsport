import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Account} from "../entity/Account";
import { User } from "../entity/User";
import { Transaction } from "../entity/Transaction";

export class AccountController {
  private defaultBalance = 100;
  private userRepository = getRepository(User)
  private accountRepository = getRepository(Account);
  private transactionRepository = getRepository(Transaction);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.accountRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.accountRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    // Todo - change to automatically take current user
    let account = request.body;
    account.user = await this.userRepository.findOne(account.userId);
    delete account.userId;
    account.balance = this.defaultBalance;
    console.log(account)
    return this.accountRepository.save(account);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let accountToRemove = await this.accountRepository.findOne(request.params.id);
    if (!accountToRemove) throw new Error('Account not found');
    await this.accountRepository.remove(accountToRemove);
  }

  async checkBalance(request: Request, response: Response, next: NextFunction) {
    let account = await this.accountRepository.findOne(request.params.id);
    return account.balance;
  }

  async withdraw(request: Request, response: Response, next: NextFunction){
    let withdrawAmount = request.body.amount;
    let account = await this.accountRepository.findOne(request.body.accountId);
    if (withdrawAmount > account.balance){
      let response = {msg: 'Insufficient balance for withdraws', availableFunds: account.balance};
      return response;
    }
    account.balance -= withdrawAmount;
    await this.accountRepository.save(account);
    let transaction = new Transaction();
    transaction.account = account;
    transaction.value = -withdrawAmount;
    await this.transactionRepository.save(transaction);
    return {
      msg: 'Withdrew money successfully', 
      oldBalance: account.balance + withdrawAmount, 
      newBalance: account.balance
    }
  }

  async deposit(request: Request, response: Response, next: NextFunction){ 
    let depositAmount = request.body.amount;
    let account = await this.accountRepository.findOne(request.body.accountId);
    account.balance += depositAmount;
    await this.accountRepository.save(account);
    let transaction = new Transaction();
    transaction.account = account;
    transaction.value = depositAmount;
    await this.transactionRepository.save(transaction);
    return {
      msg: 'Deposited money successfully', 
      oldBalance: account.balance - depositAmount, 
      newBalance: account.balance
    }
  }

  async block(request: Request, response: Response, next: NextFunction){ 
    let account = await this.accountRepository.findOne(request.body.accountId);
    account.activeFlag = false;
    this.accountRepository.save(account);
    return {
      msg: 'Account blocked', 
      accountObj: account
    }
  }

  async getTransactions(request: Request, response: Response, next: NextFunction) {
    let account = await this.accountRepository.findOne(request.params.id, {relations: ["transactions"]});
    return account.transactions;
  }

}
