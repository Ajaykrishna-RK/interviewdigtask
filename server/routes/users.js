
import  express from "express";

import  {body,validationResult} from 'express-validator'
import { SearchUser, deleteUser, getAllUsers, getUserById, postUser, updateUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/Auth.js";

const router = express.Router()


router.get("/users",getAllUsers)
router.get("/users/:id",verifyToken,getUserById)
router.post("/users/:userId",[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
],verifyToken,postUser)
router.patch("/users/:id/:userId",verifyToken,updateUser)
router.delete("/users/:id",verifyToken,deleteUser)
router.get("/users/search/:key",SearchUser)


export default router