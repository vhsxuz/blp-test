import { getAllItems, getItem, postItem, deleteItem, patchItem } from '../controller/itemController.js';
import { Router } from 'express';

const router = Router();

router.route('/')
  .get(getAllItems)
  .post(postItem)
  .delete(deleteItem)
  .patch(patchItem);

router.route('/:itemId').get(getItem);

export default router;