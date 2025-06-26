import connection from "../app.js";
import Users from "../dao/Users.dao.js"
import mongoose from "mongoose"; 

import { describe, it, before, after } from "mocha";
import Assert from "assert";

const assert = Assert.strict;

describe("Pruebas al DAO de Users", function () {
    this.timeout(10000);

    before(async () => {
        await connection; 

        this.usersDAO = new Users();
        this.userMock = {
            first_name: "Test",
            last_name: "User",
            email: "test@test.com",
            password: "test123",
        };

        this.savedUser = await this.usersDAO.save(this.userMock);
        this.userId = this.savedUser._id;
    });

    after(async () => {
        await mongoose.connection.collection("users").deleteMany({ email: "test@test.com" })
        await mongoose.disconnect();
    });

    it("El método get devuelve un array de usuarios", async () => {
        let resultado = await this.usersDAO.get();
        assert.equal(Array.isArray(resultado), true);
        if (Array.isArray(resultado) && resultado.length > 0) {
            assert.ok(resultado[0]._id);
            assert.ok(resultado[0].email);
        }
    });
});

