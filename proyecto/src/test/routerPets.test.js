import connection from "../app.js";
import Pets from "../dao/Pets.dao.js";
import mongoose from "mongoose";

import { describe, it, before, after } from "mocha";
import Assert from "assert";

const assert = Assert.strict;

describe("Pruebas al DAO de Pets", function () {
    this.timeout(10000);

    before(async () => {
        await connection; 

        this.petsDAO = new Pets();
        this.petMock = {
            name: "Marshall",
            specie: "dog",
            birthDate: "2019-02-12",
        };

        this.savedPet = await this.petsDAO.save(this.petMock);
        this.petId = this.savedPet._id;
    });

    after(async () => {
        await mongoose.connection.collection("pets").deleteMany({ name: "Marshall" });
        await mongoose.disconnect();
    });

    it("El método get devuelve un array de mascotas", async () => {
        let resultado = await this.petsDAO.get();
        assert.equal(Array.isArray(resultado), true);
        if (Array.isArray(resultado) && resultado.length > 0) {
            assert.ok(resultado[0]._id);
            assert.ok(resultado[0].name);
        }
    });

    it("El método save almacena correctamente una mascota en la BD", async () => {
        let nuevaMascota = {
            name: "Roger",
            specie: "rabbit",
            birthDate: "2020-05-15",
        };

        let resultado = await this.petsDAO.save(nuevaMascota);
        assert.ok(resultado._id);
        assert.equal(resultado.name, nuevaMascota.name);
    });

    it("El método delete elimina una mascota correctamente", async () => {
        await this.petsDAO.delete(this.petId);
        let resultado = await this.petsDAO.get();
        assert.ok(!resultado.some(p => p._id.toString() === this.petId.toString()));
    });
});
