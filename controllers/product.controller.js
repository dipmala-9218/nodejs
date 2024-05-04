const multer = require('multer');
const db = require('../models/product.model');
const auth = require('../middleware/authentication');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Save uploaded files to the public/uploads folder
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname); // Get file extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate unique filename
        cb(null, file.fieldname + '-' + uniqueSuffix + extension); // Set filename
    }
});
// Multer instance
const upload = multer({ storage: storage });

exports.insert = async (req, res) => {
    try {
        const token = auth.authenticateToken(req.header);
        if (!token) {
            return res.status(401).json({ message: "Invalid token" });
        }
        console.log(req.body);
        const productID = await db.insertProduct(req.body);
        return res.status(200).json({ message: "product successfully added", 'id': productID });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const token = auth.authenticateToken(req.header);
        if (!token) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const productID = await db.updateProduct(id, req.body);
        return res.status(200).json({ message: "product has ben successfully updated", 'id': productID });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const token = auth.authenticateToken(req.header);
        if (!token) {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (id === 'null' || id === 'undefined') {
            return res.status(400).json({ message: "Please pass product id" });
        }
        const productID = await db.deleteProduct(id);
        return res.status(200).json({ message: "product has been successfully deleted", 'id': id });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getAll = async (req, res) => {
    const id = req.params.id
    try {
        const token = auth.authenticateToken(req.header);
        if (!token) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const productData = await db.getAll();
        res.send(productData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.get = async (req, res) => {
    const id = req.params.id
    try {
        const token = auth.authenticateToken(req.header);
        if (!token) {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (id === 'null' || id === 'undefined') {
            return res.status(400).json({ message: "Please pass product id" });
        }
        const productData = await db.get(id);
        res.send(productData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}