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
            return __USER_DB__;
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
            delete data.hashedPassword;
            return data;
        }
        else if (model === 'Blog') {
            // create a new blog post
            console.log(data);
            return null;
        }
        else {
            throw new Error('Invalid model specified')
        }
    }
}

module.exports = Database;