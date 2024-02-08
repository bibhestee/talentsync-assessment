#!/usr/bin/node

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Database = require('../../model/database')
const {validateUserDetails, validatePassword} = require('../utils/validator');

/**
 * User controller
 *  Logics
 *  @signup
 *  @signin
 *  @resetPassword
 *  @changePassword
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

        // Validate password
        const isValid = validatePassword(password);
        if (!isValid) {
            return res.status(400).json({
                status: 'error',
                message: 'password should contain at least 1 Uppercase, 1 lowercase, 1 digit, and 1 special character.'
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

            const user = Database.createModel('User', obj);

            return res.status(201).json({
                status: 'success',
                message: 'Your account is created successfully',
                data: {
                    email: user.email,
                    username: user.username,
                    answer: user.answer,
                    id: user.id
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message: 'internal server error: Unable to create new user'
            });
        }
    }

    static async signin(req, res) {
        const { email, password } = req.body;

        if (!password) return res.status(400).json({status: 'error', message: 'password is missing'});
        if (!email) return res.status(400).json({status: 'error', message: 'email is missing'});
        // Check if user is registered
        const user = Database.getModel('User', {email});
        if (!user) return res.status(404).json({status: 'error', message: 'user not registered'});
        // Validate the password
        try {
            const valid = await bcrypt.compare(password, user.hashedPassword);
            if (!valid) return res.status(400).json({status: 'error', message: 'incorrect password, try again'});
            // Generate a bearer token
            const token = jwt.sign({email: email, id: user.id}, 'SOMETHINGHERE');
            res.setHeader('Access-Control-Expose-Header', 'Authorization');
            res.setHeader('Authorization', `Bearer ${token}`);
            return res.status(200).json({
                status : 'success',
                message : 'You are successfully logged in!',
                data : {email, id: user.id}
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({status: 'error', message: 'internal server error'});
        }
    }

    static async resetPassword(req, res) {
        const { email, password, answer } = req.body;

        try {
            if (!password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'password not provided'
                });
            }
            if (!answer) {
                return res.status(400).json({
                    status: 'error',
                    message: 'please provide answer to the security question to reset password. What is your favourite city?'
                })
            }
            // Validate password
            const isValid = validatePassword(password);
            if (!isValid) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Password should contain at least 1 Uppercase, 1 lowercase, 1 digit, and 1 special character.'
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            // Check if user exists
            const user = Database.getModel('User', {email: email});
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'no user with the provided email'
                });
            }
            // Validate the answer provided
            if (user.answer !== answer) {
                return res.status(400).json({
                    status: 'error',
                    message: 'incorrect answer, please try again. What is your favourite city?'
                });
            }
            const updated = Database.updateModel('User', user.id, {hashedPassword});
            if (updated) {
                return res.status(200).json({
                    status: 'success',
                    message: 'password reset successfully'
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

    static async changePassword(req, res) {
        const { password } = req.body;
        const { id } = req.auth;

        try {
            if (!password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'password not provided'
                });
            }
            // Validate password
            const isValid = validatePassword(password);
            if (!isValid) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Password should contain at least 1 Uppercase, 1 lowercase, 1 digit, and 1 special character.'
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const updated = Database.updateModel('User', id, {hashedPassword});
            if (updated) {
                return res.status(200).json({
                    status: 'success',
                    message: 'password changed successfully'
                });
            }
            return res.status(400).json({
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