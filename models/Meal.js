import mongoose from "mongoose";


const MealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Meal', MealSchema)
