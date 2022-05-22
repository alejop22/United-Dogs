const { Raza,Temperamento, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Modelo Raza', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se puede conectar a la base de datos:', err);
    }));

  describe('Validaciones', () => {
    beforeEach(() => Raza.sync({ force: true }));

    describe('id', () => {
      it('debería arrojar un error si el id es null', (done) => {
        Raza.create({})
          .then(() => done(new Error('La PK id es obligatoria')))
          .catch(() => done());
      });
      it('debería funcionar con id valido', () => {
        Raza.create({ id: 1 });
      });
    });

    describe('name', () => {
      it('debería arrojar un error si name es null', (done) => {
        Raza.create({})
          .then(() => done(new Error('El atributo name es obligatorio')))
          .catch(() => done());
      });
      it('debería funcionar con un name valido', () => {
        Raza.create({ name: 'Pug' });
      });
    });

    describe('height', () => {
      it('debería arrojar un error si el height es null', (done) => {
        Raza.create({})
          .then(() => done(new Error('el atributo height es obligatorio')))
          .catch(() => done());
      });
      it('debería funcionar con height valido', () => {
        Raza.create({ height: '20 - 40' });
      });
    });

    describe('weight', () => {
      it('debería arrojar un error si el weight es null', (done) => {
        Raza.create({})
          .then(() => done(new Error('el atributo weight es obligatorio')))
          .catch(() => done());
      });
      it('debería funcionar con weight valido', () => {
        Raza.create({ height: '10 - 20' });
      });
    });

    describe('life_span', () => {
      it('debería funcionar con un life_span valido', () => {
        Temperamento.create({ life_span: '20 years' });
      });
    });

  });
});

describe('Modelo Temperamento', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se puede conectar a la base de datos:', err);
    }));

  describe('Validaciones', () => {
    beforeEach(() => Temperamento.sync({ force: true }));

    describe('name', () => {
      it('debería arrojar un error si name es null', (done) => {
        Temperamento.create({})
          .then(() => done(new Error('El atributo name es obligatorio')))
          .catch(() => done());
      });
      it('debería funcionar con un name valido', () => {
        Temperamento.create({ name: 'Alegre' });
      });
    });
  });
});
