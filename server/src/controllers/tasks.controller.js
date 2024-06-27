import { Task } from "../models/task.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addNewTask = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { title, description, estimate } = req.body;
    if (!title || title.length === 0) {
      throw new ApiError(400, "Please enter a title");
    }
    const newTask = await Task.create({
      title,
      description,
      estimate,
      owner: user,
    });
    if (!newTask) {
      throw new ApiError(400, "Error creating new task");
    }
    return res
      .status(200)
      .send(new ApiResponse(200, newTask, "Successfully created new task"));
  } catch (error) {
    throw new ApiError(400, error);
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const owner = req.user;
    const { title } = req.body;
    const deletedTask = await Task.findOneAndDelete({
      $and: [{ owner }, { title }],
    });
    if (!deletedTask) {
      res.status(400).send(new ApiResponse(400, "Could not find task"));
    }
    res
      .status(200)
      .send(new ApiResponse(200, deletedTask, "Task deleted successfully"));
  } catch (error) {
    throw new ApiError(400, "Error in deleting task");
  }
});

export const changeTaskStatus = asyncHandler(async (req, res) => {
  try {
    const owner = req.user;
    const { title, status } = req.body;
  
    const updatedTask = await Task.updateOne(
      {
        $and: [{ owner }, { title }],
      },
      {
        $set: {
          completed: status,
        },
        $currentDate: { lastUpdated: true },
      }
    );
    if(!updatedTask){
      throw new ApiError(400, "Could not update task")
    }
    res.status(200).send(new ApiResponse(200,updatedTask, "Changed task status successfully"))
  } catch (error) {
    throw new ApiError(400, error)
  }
});

export const getUserTasks = asyncHandler(async (req,res) => {

    //wip: need to understand aggregation models
    const user = req.user;
    const userTasks = await Task.find()
})