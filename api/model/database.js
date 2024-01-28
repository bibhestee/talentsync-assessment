#!/usr/bin/node

/**
 * Database
 *  Methods
 *  @getModel
 *  @getAllModel
 *  @createModel
 *  @updateModel
 *  @deleteModel
 */


class Database {
    __USER_DB__ = [
        {id: 1, username: 'JohnDoe1', email: 'jdoe@mail.com', password: 'password', answer: 'lagos'}
    ];

    __BLOG_DB__ = [
        {id: 1, title: 'First blog', content: 'Here is my first blog post', author: 'JohnDoe1'}
    ]

    static getModel(model, filter) {
        if(model === 'User') {
            // get user from __USER_DB__
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
    }
}