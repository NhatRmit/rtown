const Joi = require('@hapi/joi');

// login validation
const loginValidation = (data) => {
    const schema = Joi.object(
        {
            usernameOrEmail: Joi.string().min(1).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(1).required(),
        }
    ) ;
    return schema.validate(data);
}

module.exports.loginValidation = loginValidation;
