const Joi = require('@hapi/joi');

exports.USER_LOGIN_MODEL = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})