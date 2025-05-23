import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import { usersService, petsService,} from '../services/index.js'

const router = Router();


router.get('/mockingusers', async (req, res) => {
    try {
        const users = await generateMockUsers(50);
        res.send({ status: "success", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});


router.get('/mockingpets', (req, res) => {
    const pets = generateMockPets(100);
    res.send({ status: "success", payload: pets });
});


router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;

        if (!users || !pets) {
            return res.status(400).send({ status: "error", message: "Faltan parámetros numéricos" });
        }

        const mockUsers = await generateMockUsers(users);
        const mockPets = generateMockPets(pets);

        await usersService.create(mockUsers);
        await petsService.create(mockPets);

        res.send({ status: "success", message: "Datos generados e insertados correctamente" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

export default router;
