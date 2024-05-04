const jwt = require('jsonwebtoken');

module.exports = {
    authenticateToken(headers) {
        const authHeader = headers['Authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return false;

        jwt.verify(token, 'radixweb', (err, user) => {
            if (err) return false;
            return req.user = user;
        });
    }
}