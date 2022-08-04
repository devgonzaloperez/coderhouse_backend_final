import supertest from 'supertest';
import chai from 'chai';
import faker from '@faker-js/faker';

//Tests con Mocha, Chai y Supertest. Cabe destacar que esto se debería realizar en una BBDD específica para testing y no en la misma BBDD de producción.

const request = supertest('http://localhost:8080');
const expect = chai.expect;

describe('Tests API Rest Full', ()=>{

    describe('GET', ()=>{

        it('Debería devolver un status 200 al buscar productos', async ()=>{
            let response = await request.get('/api/productos');
            expect(response.status).to.eql(200);
        });

        it('Debería devolver un status 200 al buscar un producto existente por ID', async ()=>{
            let response = await request.get('/api/productos/62b628a39fba4368db36f12e');
            expect(response.status).to.eql(200);
        });

    });

    describe('POST', ()=>{

        it('Debería devolver un status 200 al crear un producto', async ()=>{
            let response = await request.post('/api/productos').send({
                name: faker.commerce.product(),
                description: "Test Description",
                price: 100,
                stock: 100,
                imageURL: "Test URL"
            });
            expect(response.status).to.eql(200);
        });

    });

    describe('PUT', ()=>{

        it('Debería devolver un status 200 al actualizar un producto', async ()=>{
            let response = await request.put('/api/productos/62d7049564be226834824b46').send({stock: 100});
            expect(response.status).to.eql(200);
        });

    });

    describe('DELETE', ()=>{

        // it('Debería devolver un status 200 al eliminar un producto existente por ID', async ()=>{
        //     let response = await request.delete('/api/productos/62b628bd9fba4368db36f134');
        //     expect(response.status).to.eql(200);
        // });

    });

});
