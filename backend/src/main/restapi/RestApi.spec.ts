import supertest from "supertest";
import {ExpressServer} from "./ExpressServer";
import RegisterUserRequestBody from "./request/RegisterUserRequestBody";
import {Express} from "express";
import UserCredentialsRequestBody from "./request/UserCredentialsRequestBody";
import {TOKEN_HEADER} from "./routes/UserCredentialsRoute";

let server: Express;

describe("Feature: REST API", () => {

    beforeAll(async () => {
        server = await ExpressServer.instance()
    });

    describe('POST /user-profiles', () => {

        it('should create new user profile', async () => {
            const response = await supertest(server).post("/api/user-profiles")
                .send(new RegisterUserRequestBody(
                    "username",
                    "firstName",
                    "lastName",
                    "email@email.com",
                    "pass123",
                    "pass123"
                ));

            expect(response.status).toBe(201)
        });

        describe('POST /login', () => {

            it('should return user token if credentials are valid', async () => {
                const response = await supertest(server).post("/api/user-auth/login")
                    .send(new UserCredentialsRequestBody(
                        "username",
                        "pass123"
                    ));

                expect(response.status).toBe(200);
                expect(response.get(TOKEN_HEADER)).toBeDefined();
            });

            it('should not return user token if credentials are invalid', async () => {
                const response = await supertest(server).post("/api/user-auth/login")
                    .send(new UserCredentialsRequestBody(
                        "username",
                        "wrong-password"
                    ));

                expect(response.status).toBe(401);
                expect(response.get(TOKEN_HEADER)).toBeUndefined();
            })
        })


    });

});