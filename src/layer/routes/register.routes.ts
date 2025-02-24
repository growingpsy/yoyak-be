import { Router } from 'express';
import { RegisterController } from '../controllers/register.controller';
import { RegisterService } from '../services/register.service';
import { RegisterRepository } from '../repositories/register.repository';
import { PrismaService } from '../../prisma/prisma.service';

const router = Router();
const prismaService = new PrismaService();
const registerRepository = new RegisterRepository(prismaService);
const registerService = new RegisterService(registerRepository);
const registerController = new RegisterController(registerService);

router.post('/register', (req, res) => registerController.register(req, res));
router.post('/verify-email', (req, res) => registerController.verifyEmail(req, res));

export default router;