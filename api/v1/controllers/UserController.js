#!/usr/bin/node

/**
 * User controller
 *  Logics
 *  @login
 *  @signup
 *  @forgetpassword
 *  @changepassword
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
                message: 'email address is invalid, provide a valid email'
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
        // create a new user model and populate the db
    }

    static async login(req, res) {
        return res.send(200).json({
            'status': 'success',
            'message': 'You are successfully logged in!'
        });
    }
}

module.exports = UserController;