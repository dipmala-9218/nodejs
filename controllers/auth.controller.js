const db = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        bcrypt.hash(password, 10, (error, hashedPass) => {
            if (error) {
                console.error(error);
                return res.status(400).json({ error: error.array() });
            }
            
            const userData = {
                name,
                email,
                password: hashedPass
            }
            const user = db.insertUser(userData);
    
            if (user) {
                res.status(500).json({ message: "User successfully registered" });
            }
        })
    } catch (error) {
        res.status(500).json({ message:"test" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.getUserByUsername(email);
        if (user.length == 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const userPassword = user[0].password;
        if (userPassword === null || userPassword === 'undefined') {
            return res.status(401).json({ message: "Incorrect password" });
        }
        
        if (!bcrypt.compareSync(password, userPassword)) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user[0].user_id }, 'radixweb', { expiresIn: 86400 });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}