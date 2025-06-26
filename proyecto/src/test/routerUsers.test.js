import connection from "../app.js";
import mongoose from "mongoose";
import { describe, it, before, after } from "mocha";
import Assert from "assert";
import supertest from "supertest";

const assert = Assert.strict;
const requester = supertest("http://localhost:8080");

describe("Pruebas al Router de Usuarios", function () {
    this.timeout(10000);

    before(async () => {
        await connection;

        
        let userResponse = await requester.post("/api/users").send({
            first_name: "Carlos",
            last_name: "Pérez",
            email: `test${Date.now()}@mail.com`, 
            password: "test123",
            role: "user",
        });

        if (!userResponse.body || !userResponse.body.payload || !userResponse.body.payload._id) {
            throw new Error(" No se pudo crear el usuario.");
        }

        this.userId = userResponse.body.payload._id;
        console.log(" Usuario de prueba creado:", this.userId);
    });

    after(async () => {
        console.log(" Eliminando usuario de prueba...");
        await mongoose.connection.collection("users").deleteMany({});
        await mongoose.disconnect();
    });

    it("El método GET /api/users devuelve un array de usuarios", async () => {
        let { body } = await requester.get("/api/users");
        assert.ok(body.payload, "La respuesta debe contener `payload`");
        assert.equal(Array.isArray(body.payload), true, "El payload debe ser un array");
    });

    it("El método GET /api/users/:uid devuelve un usuario específico", async () => {
        let { body } = await requester.get(`/api/users/${this.userId}`);
        assert.ok(body.payload && body.payload._id, "Debe contener `_id`");
        assert.equal(body.payload._id, this.userId, "El `_id` debe coincidir con el usuario creado");
    });

    it("El método PUT /api/users/:uid actualiza un usuario", async () => {
    let { body } = await requester.put(`/api/users/${this.userId}`).send({
        first_name: "Carlos Modificado",
    });

    console.log(" Respuesta PUT:", body);

    assert.ok(body.status === "success", " La respuesta debe indicar `success`");
});



it("El método DELETE /api/users/:uid elimina un usuario", async () => {
    let { body } = await requester.delete(`/api/users/${this.userId}`);
    console.log("Respuesta DELETE:", body);

    
    assert.ok(body.status === "success", " La respuesta debe indicar `success`");
});


});
