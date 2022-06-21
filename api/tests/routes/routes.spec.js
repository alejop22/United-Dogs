/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Raza,Temperamento, conn } = require('../../src/db.js');

const agent = session(app);

const raza = {
  id: 1,
  name: 'Pug',
  height: '20 - 40',
  weight: '10 - 20',
};

const temperamentos = {
  name: 'Alegre'
}

describe('Raza route', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No se puede conectar a la base de datos:', err);
  }));

  beforeEach(() => Raza.sync({ force: true })
    .then(() => Raza.create(raza)));

  describe('GET /dogs', () => {
    it('Deberia retornar 200', () =>
      agent.get('/dogs').expect(200)
    );

    it('Deberia retornar 200 con params', () =>
      agent.get('/dogs/1').expect(200)
    );
  });

});

describe('Temperamento route', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No se puede conectar a la base de datos:', err);
  }));

  beforeEach(() => Temperamento.sync({ force: true })
    .then(() => Temperamento.create(temperamentos)));

  describe('GET /temperament', () => {
    it('Deberia retornar 200', () =>
      agent.get('/temperament').expect(200)
    );
  });
});

