import { createConnection } from "typeorm";
import * as request from 'supertest';
import app from "../../src/app";
import { port } from "../../src/config";

let connection, server;

const testUser = {
  name: 'John Doe',
  birthDay: '09/19/1992',
  document: 's3://some_doc'
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

it('should be no users initially', async() => {
  const response = await request(app).get('/users');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

it('should create a user', async() => {
  const response = await request(app).post('/users').send(testUser);
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ ...testUser, id: 1 });
});

it('should not create a user if no birthDay is given', async() => {
  const response = await request(app).post('/users').send({ name: 'Doe', document: 's3://some_doc' });
  expect(response.statusCode).toBe(400);
  expect(response.body.errors).not.toBeNull();
  expect(response.body.errors.length).toBe(1);
  expect(response.body.errors[0]).toEqual({
    msg: 'Invalid value', param: 'birthDay', location: 'body'
  });
});

it('should not create a user if age is less than 0', async() => {
  const response = await request(app).post('/users').send({ firstName: 'John', lastName: 'Doe', age: -1 });
  expect(response.statusCode).toBe(400);
  expect(response.body.errors).not.toBeNull();
  expect(response.body.errors.length).toBe(1);
  expect(response.body.errors[0]).toEqual({
    msg: 'age must be a positive integer', param: 'age', value: -1, location: 'body',
  });
});
