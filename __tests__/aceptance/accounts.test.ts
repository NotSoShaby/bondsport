import { createConnection } from "typeorm";
import * as request from 'supertest';
import app from "../../src/app";
import { port } from "../../src/config";

let connection, server;

const testAccount = {
  balance: 1000,
  dailyWithdrawlLimit: 100,
  accountType: 1,
  activeFlag: true
};

beforeEach(async() => {
  connection = await createConnection();
  await connection.synchronize(true);
  server = app.listen(port);
});

afterEach(() => {
  connection.close();
  server.close();
});

it('should be no accounts initially', async() => {
  const response = await request(app).get('/accounts');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

it('should create a account with correct createdDate', async() => {
  const response = await request(app).post('/accounts').send(testAccount);
  expect(response.statusCode).toBe(200);
  const createdDate = new Date(response.body.createdDate);
  delete response.body.createdDate;
  expect(createdDate.setHours(0,0,0,0) == new Date().setHours(0,0,0,0));
  expect(response.body).toEqual({ ...testAccount, id: 1 });
});

it('should not create a account if no dailyWithdrawlLimit is given', async() => {
  let testAccountCopy = JSON.parse(JSON.stringify(testAccount));
  delete testAccountCopy.dailyWithdrawlLimit;
  const response = await request(app).post('/accounts').send(testAccountCopy);
  expect(response.statusCode).toBe(400);
  expect(response.body.errors).not.toBeNull();
  expect(response.body.errors.length).toBe(1);
  expect(response.body.errors[0]).toEqual({
    msg: 'Invalid value', param: 'dailyWithdrawlLimit', location: 'body'
  });
});
