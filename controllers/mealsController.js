import Meal from '../models/Meal.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';

const createMeal = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    throw new BadRequestError('Please provide all values');
  }
  req.body.createdBy = req.user.userId;
  const meal = await Meal.create(req.body);
  res.status(StatusCodes.CREATED).json({ meal });
}

const deleteMeal = async (req, res) => {
  const { id: mealId } = req.params;

  const meal = await Meal.findOne({ _id: mealId });

  if (!meal) {
    throw new NotFoundError(`No meal with id :${mealId}`);
  }

  checkPermissions(req.user, meal.createdBy);

  await meal.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success! meal removed' });
}

const getAllMeals = async (req, res) => {
  res.send('get meals');
}

const updateMeal = async (req, res) => {
  const { id: mealId } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please provide all values');
  }
  const meal = await Meal.findOne({ _id: mealId });

  if (!meal) {
    throw new NotFoundError(`No meal with id :${mealId}`);
  }
  // check permissions

  checkPermissions(req.user, meal.createdBy);

  const updatedMeal = await Meal.findOneAndUpdate({ _id: mealId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedMeal });
}


export { createMeal, deleteMeal, getAllMeals, updateMeal };
