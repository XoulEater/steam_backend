import { UserModel } from "./../models/User";
import { Request, Response } from "express";

class User {
    /**
     * Get all users
     * @param req
     * @param res
     */
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await UserModel.find();
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get user by id
     * @param req
     * @param res
     */
    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserModel.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Create user
     * @param req
     * @param res
     */
    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = new UserModel(req.body);
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Update user
     * @param req
     * @param res
     */
    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserModel.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Delete user
     * @param req
     * @param res
     */

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            await UserModel.findByIdAndDelete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }
}

export default User;
