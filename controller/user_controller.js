const connection = require('../service/db');
const { isEmpty } = require('../utils/object_isEmpty');
const AppError = require('../utils/error');
const bcrypt = require('bcryptjs');
const { USER_LOGIN_MODEL } = require('../validation_models/user');
const JWT = require('jsonwebtoken');

const secretKey = 'your_secret_key';

exports.user_login = (req, res, next) => {

    if (isEmpty(req.body)) return next(new AppError('form data not found', 400));

    try {

        const { error } = USER_LOGIN_MODEL.validate(req.body);

        if (error) return next(new AppError(error.details[0].message, 400));

        connection.query("SELECT * FROM client WHERE email = ?", [[req.body.email]], async (err, data, fields) => {
            if (err) return next(new AppError(err, 500));

            if (!data.length) return next(new AppError("email or password invalid", 400));

            const isMatch = await bcrypt.compare(req.body.password, data[0].password);

            if (!isMatch) return next(new AppError("email or password invalid", 400));

            const token = JWT.sign({ name: data[0].email, role: data[0].role }, secretKey, { expiresIn: "1d" });

            res.status(200).json({
                data: "Login successful",
                status: 200,
                token: token,
                id: data[0].id,
                role: data[0].role,
                email: data[0].email,
                name: data[0].role == "CLIENT" ? data[0].first_name + " " + data[0].last_name : data[0].business_name
            })

        })

    }
    catch (err) {
        return next(new AppError(err, 500));
    }

}