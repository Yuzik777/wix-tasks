import request from "supertest";
import app from "../../src/app";
import {regex} from 'uuidv4';

describe("Users API", () => {

    it("should create new user on POST request", async () => {
        const result = await request(app)
        .post("/api/v1/users")
        .set('Accept', 'application/json')
        .send({
            name: 'Test User',
            age: 18
        });

        expect(result.body.id).toMatch(regex.v4);
        expect(result.body.name).toEqual('Test User');
        expect(result.body.age).toEqual(18);
        expect(result.status).toEqual(201);

    }),

    it("should return error on wrong POST request", async () => {
        const result = await request(app)
        .post("/api/v1/users")
        .set('Accept', 'application/json')
        .send({
            name: 'Test User',
            age: "18"
        });

        expect(result.status).toEqual(422);
        expect(result.body).toEqual('Something broke!');

    })

});