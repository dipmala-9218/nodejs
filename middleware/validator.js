const { check } = require("express-validator");

module.exports = {
    login: [
        check("email")
        .notEmpty()
        .withMessage("Email is required")
        .trim()
        .isEmail()
        .withMessage("Enter a valid email"),
        check("password")
        .notEmpty()
        .withMessage("Password is required")
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
    ],
    register: [
        check("name")
        .notEmpty()
        .withMessage("Name is required")
        .trim()
        .escape(),
        check("email")
        .notEmpty()
        .withMessage("Email is required")
        .trim()
        .isEmail()
        .withMessage("Enter a valid email"),
        check("password")
        .notEmpty()
        .withMessage("Password is required")
        .trim()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        .withMessage("Password Must have One Capital character and One small character & one symbol")
    ],
    insert: [
        check("name")
        .notEmpty()
        .withMessage("Name is required")
        .trim()
        .escape(),
        check("price")
        .notEmpty()
        .withMessage("Price is required")
        .trim()
        .isDecimal()
        .withMessage('Must be a decimal number'),
        check('description')
        .trim()
        .escape()
        .isLength({ min: 0, max: 255 })
        .withMessage('Content must not be more than 255 character'),
        check("product_type")
        .notEmpty()
        .withMessage("Product type is required"),
        /* check('product_image')
        .isImage()
        .withMessage("Only allow images") */
    ]
};