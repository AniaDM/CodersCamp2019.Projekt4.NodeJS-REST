import supertest from "supertest";
import {ExpressServer} from "./ExpressServer";
import RegisterUserRequestBody from "./request/RegisterUserRequestBody";

let server;
/*
describe("Feature: REST API", () => {

    beforeEach(() => {
        server = ExpressServer.start()
    });

    afterEach(() => {
        server.close();
    });

    describe('POST /user-profiles should create new user profile', async () => {
        const response = await supertest(server).post("/api/user-profiles")
            .send(new RegisterUserRequestBody(
                "username",
                "firstName",
                "lastName",
                "email@email.com",
                "pass123",
                "pass123"
            ));

        return expect(response.status).toBe(200)
    })

});*/