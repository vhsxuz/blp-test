import { Router } from 'express';
import { postRole, getAllRoles } from '../controller/roleController.js'

const router = Router();

router.route('/')
  .get(getAllRoles)
  .post(postRole);

export default router;