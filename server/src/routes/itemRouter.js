import { Router } from 'express';
import { authenticateUser } from '../middleware/middleware.js';
import { getAllItems, getItem, postItem, deleteItem, patchItem } from '../controller/itemController.js';

const router = Router();

router.use(authenticateUser);

router.route('/')
  .get(getAllItems)
  .post(postItem);

router.route('/:itemId')
  .get(getItem)
  .delete(deleteItem)
  .patch(patchItem);

export default router;