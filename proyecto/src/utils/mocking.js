import { faker } from "@faker-js/faker";
import { createHash } from '../utils/index.js';


export const generateMockUsers = async (num = 50) => {
    const users = [];
    for (let i = 0; i < num; i++) {
        users.push({
            _id: faker.database.mongodbObjectId(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: await createHash("coder123"), 
            role: faker.helpers.arrayElement(["user", "admin"]), 
            pets: [] 
        });
    }
    return users;
    };


export const generateMockPets = (num = 100) => {
    const pets = [];
    for (let i = 0; i < num; i++) {
        pets.push({
            _id: faker.database.mongodbObjectId(),
            name: faker.person.firstName(), 
            specie: faker.animal.type(),
            birthDate: faker.date.past().toISOString().split("T")[0], 
            adopted: false,
            image: faker.image.urlPicsumPhotos() 
        });
    }
    return pets;
};
