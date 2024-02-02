#!/usr/bin/node

/**
 * Validator
 * 
 * User validator
 *  @email
 *  @username
 *  @password
 *  @answer
 * 
 * Password validator
 *  @password
 */

const Joi = require('joi');

async function validateUserDetails(username, email, password, answer) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(15).required(), 
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().min(8).required(), 
        answer: Joi.string().min(3).max(15).required()
    });

    const data = { username, email, password, answer };

    const result = await schema.validate(data);

    if (result.error) {
        return result.error.details[0].path[0];
      } else {
        return true;
      }
}

function validatePassword(password) {
  const passwordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /\d/.test(password),
    symbol: /[!@#$%^&*()_+-={}[\]|:;"<>,.?/~]/.test(password)
  };
  return Object.values(passwordStrength).every((value) => value === true);
}


module.exports = { validateUserDetails, validatePassword };