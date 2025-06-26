import userModel from "./models/User.js";


export default class Users {
    
    async get(params) {
        return await userModel.find(params);
    }

    async getBy(params) {
        return await userModel.findOne(params);
    }

    async save(doc) {
        return await userModel.create(doc);
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;  
    }



    async update(id, doc) {
        return await userModel.findByIdAndUpdate(id, { $set: doc }, { new: true });
    }

    async delete(id) {
        return await userModel.findByIdAndDelete(id);
    }
}
