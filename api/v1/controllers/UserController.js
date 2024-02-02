#!/usr/bin/node

const bcrypt = require('bcrypt');
const Database = require('../../model/database')
const {validateUserDetails} = require('../utils/validator');

/**
 * User controller
 *  Logics
 *  @login
 *  @signup
 *  @forgetpassword
 *  @changepassword
 *  @getAllUser
 *  @getUser
 *  @deleteUser
 *  @updateUser
 */

class UserController {
    static async signup(req, res) {
        const {
            username, email, password, answer
        } = req.body;
    
        // validate inputs
        const result = await validateUserDetails(username, email, password, answer)
    
        if (result === 'username') {
            return res.status(400).json({
                status: 'error',
                message: 'username should be minimum of 3 and maximum of 15 characters'
            });
        }
        else if (result === 'email') {
            return res.status(400).json({
                status: 'error',
                message: 'email address is invalid or missing, provide a valid email'
            });
        }
        else if (result === 'password') {
            return res.status(400).json({
                status: 'error',
                message: 'password should have minimum of 8 characters'
            });
        }
        else if (result === 'answer') {
            return res.status(400).json({
                status: 'error',
                message: 'answer should have min of 3 characters, what is your favourite city?'
            });
        }
        // check if user exists
        try {
            const userExists = Database.getModel('User', {email: email})
            if (userExists) {
                return res.status(400).json({
                    status: 'error',
                    message: `User ${email} already exists`
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message: 'internal server error: Unable to create new user'
            });
        }
        // create a new user model and populate the db
        try {

            const hashedPassword = await bcrypt.hash(password, 10);
            // create new user model
            const obj = {
                username, email, hashedPassword, answer
            };

            const user = Database.createModel('User', obj)

            return res.status(201).json({
                status: 'success',
                message: 'Your account is created successfully',
                data: user
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message: 'internal server error: Unable to create new user'
            });
        }
    }

    static async login(req, res) {
        return res.send(200).json({
            'status': 'success',
            'message': 'You are successfully logged in!'
        });
    }

    static async getUser(req, res) {
        const { id } = req.params;
        try {
            const user = Database.getModel('User', {id: id});
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found'
                });
            }
            delete user.hashedPassword;
            return res.status(200).json({
                status: 'success',
                message: 'User retrieved successfully',
                data: user
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message: `internal server error: ${err}`
            })
        }
    }

    static getAllUser(req, res) {
        const users = Database.getAllModel('User');
        return res.status(200).json(users);
    }

    static updateUser(req, res) {
        const { username, email, answer } = req.body;
        const { id } = req.params;

        try {
            const user = Database.getModel('User', {id: id});
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'no user with the provided id'
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message: `internal server error: ${err}`
            });
        }

        if (username || email || answer) {
            try {
                const updatedUser = Database.updateModel('User', id, {username: username, email: email, answer: answer});
                if (updatedUser) {
                    return res.status(200).json({
                        status: 'success',
                        message: 'user updated successfully',
                        data: updatedUser
                    });
                }
            } catch (err) {
                console.log(err);
                return res.status(500).json({
                    status: 'error',
                    message: `internal server error: ${err}`
                });
            }

        }
        return res.status(400).json({
            status: 'error',
            message: 'no information provided'
        });
    }

    static deleteUser(req, res) {
        const { id } = req.params;

        try {
            const userDeleted = Database.deleteModel('User', id);
            if (userDeleted) return res.status(204).end();
            return res.status(404).json({
                status: 'error',
                message: 'no user with the provided id'
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message: `internal server error: ${err}`
            });
        }
    }
}

module.exports = UserController;