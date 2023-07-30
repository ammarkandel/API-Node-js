import express from 'express';
const router = express.Router();

import { createMeal, deleteMeal, getAllMeals, updateMeal } from '../controllers/mealsController.js';

router.route('/').post(createMeal).get(getAllMeals);
router.route('/:id').delete(deleteMeal).patch(updateMeal);


export default router;
