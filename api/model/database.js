#!/usr/bin/node

const uuid = require('uuid');

/**
 * Database
 *  Methods
 *  @getModel
 *  @getAllModel
 *  @createModel
 *  @updateModel
 *  @deleteModel
 */

// User Table
let __USER_DB__ = [
    {
        username: "JohnDoe1",
        email: "Johndoe@gmail.com",
        hashedPassword: "johndoe1",
        answer: "ikeja",
        id: "e69a46de-51a6-4a23-98d7-f1ab83528306"
    }
];

// Blog Post Table
let __BLOG_DB__ = [
    {id: "e69a46de-51a6-4a23-98d7-f1ab83528406", title: 'First blog', content: 'Here is my first blog post', author: 'JohnDoe1'}
];


class Database {
    static getModel(model, filter) {
        if(model === 'User') {
            let response = null;
            // get user from __USER_DB__
            const {email, username, id } = filter;
            if (email) {
                response = __USER_DB__.find((value) => (value.email == filter['email']));
            } else if (username) {
                response = __USER_DB__.find((value) => (value.username == filter['username']));
            } else if (id) {
                response = __USER_DB__.find((value) => (value.id == filter['id']));
            }
            return response;
        } else if (model === 'Blog') {
            // get post from __BLOG_DB__
        } else {
            throw Error('Unknown model specified');
        }
    }

    static getAllModel(model) {
        if (model === 'User') {
            let users = __USER_DB__;
            users.forEach((value) => (delete value.hashedPassword));
            return users;
        }
        else if (model === 'Blog') {
            return __BLOG_DB__;
        }
        else {
            return [];
        }
    }

    static createModel(model, data) {
        if (model === 'User') {
            // create a new user
            const id = uuid.v4();
            data['id'] = id;
            __USER_DB__ = [data, ...__USER_DB__];
            return data;
        }
        else if (model === 'Blog') {
            // create a new blog post
            console.log(data);
            return null;
        }
        else {
            throw new Error('Invalid model specified');
        }
    }

    static updateModel(model, id, data) {
        if (model === 'User') {
            const { username, email, answer, hashedPassword } = data;
            // Check if user exists
            const user = this.getModel('User', {id: id});
            if (!user) {
                return null;
            }
            // Update the details
            if (username) user.username = username;
            if (email) user.email = email;
            if (answer) user.answer = answer;
            if (hashedPassword) user.hashedPassword = hashedPassword;
            let updated = false;

            __USER_DB__.forEach((value) => {
                if (value.id == id) {
                    value = user;
                    updated = true;
                }
            });
            if (updated) return user;
            return null;

        } else if (model === 'Blog') {

        }
        else {
            throw new Error('Invalid model specified');
        }
    }

    static deleteModel(model, id) {
        if (model === 'User') {
            const prevLength= __USER_DB__.length;
            __USER_DB__ = __USER_DB__.filter(value => value.id !== id);
            return prevLength !== __USER_DB__.length;
            
        } else if (model === 'Blog') {

        } else {
            throw new Error('Invalid model specified');
        }
    }
}

module.exports = Database;