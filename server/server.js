const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const bcrypt = require('bcrypt');

const fs = require('fs');

const path = require('path');
/*const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Uploads folder created');
}

const __dirname = path.resolve();*/




const multer = require('multer');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve images statically


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
});

const upload = multer({ storage });


// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change if needed
    password: '', // Change if needed
    database: 'fundraiser_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// Handle donations
app.post('/FundMePage', (req, res) => {
    let { fundraiserId, amount } = req.body;

    amount = parseFloat(amount);
    if (isNaN(amount)) {
        return res.status(400).json({ error: 'Invalid donation amount' });
    }

    if (!fundraiserId || !amount) {
        return res.status(400).json({ error: 'Fundraiser ID and amount are required' });
    }

    const getFundraiserSql = "SELECT goalAmount, donatedAmount FROM fundraisers WHERE id = ?";
    db.query(getFundraiserSql, [fundraiserId], (err, results) => {
        if (err) {
            console.error('Database error fetching fundraiser details:', err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Fundraiser not found' });
        }

        const { goalAmount, donatedAmount } = results[0];
        const newDonatedAmount = donatedAmount + amount;

        if (newDonatedAmount > goalAmount) {
            return res.status(400).json({ error: 'Donation exceeds fundraiser goal' });
        }

        const updateFundraiserSql = "UPDATE fundraisers SET donatedAmount = ? WHERE id = ?";
        db.query(updateFundraiserSql, [newDonatedAmount, fundraiserId], (err, updateResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const remainingAmount = goalAmount - newDonatedAmount;

            const insertDonationSql = "INSERT INTO donations (fundraiserId, amount) VALUES (?, ?)";
            db.query(insertDonationSql, [fundraiserId, amount], (err, donationResult) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.status(200).json({
                    message: 'Donation recorded successfully!',
                    remainingAmount: remainingAmount,
                    newDonatedAmount: newDonatedAmount
                });
            });
        });
    });
});


// Handle fundraiser creation with image upload
app.post('/fundraisers', upload.single('image'), (req, res) => {

    //app.use('/fundraisers', express.urlencoded({ extended: true })); // Apply only for this route

    const { title, goalAmount, description, organizer, cause } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !goalAmount || !description || !organizer || !cause) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = "INSERT INTO fundraisers (title, goalAmount, description, organizer, cause, donatedAmount, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [title, goalAmount, description, organizer, cause, 0, imageUrl], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ message: 'Fundraiser created successfully!', imageUrl });
    });
});


// Handle contact form submissions
app.post('/contact', (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
    }

    const sql = "INSERT INTO contacts (name, message) VALUES (?, ?)";
    db.query(sql, [name, message], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ message: 'Message sent successfully!' });
    });
});



// Admin Registration
app.post('/admin/register', async (req, res) => {
    console.log("Received data:", req.body);  // Debugging line
    
    const { username, email, password, repeatPassword } = req.body;

    if (!username || !email || !password || !repeatPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== repeatPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO admins (username, email, password) VALUES (?, ?, ?)";
        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Registration failed: ' + err.message });
            }
            res.status(200).json({ message: 'Admin registered successfully!' });
        });
    } catch (err) {
        res.status(500).json({ error: 'Error hashing password' });
    }
});

// Admin Login Endpoint
app.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the username exists in the database
    const sql = "SELECT * FROM admins WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const admin = results[0];

        // Compare the entered password with the hashed password
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful', admin: { id: admin.id, username: admin.username, email: admin.email } });
    });
});


//API to fetch unconfirmed fundraisers for Admin Approval
app.get('/admin/fundraisers', (req, res) => {
    const sql = "SELECT * FROM fundraisers WHERE confirmed = FALSE";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

//API to Confirm a Fundraiser
app.post('/admin/confirm-fundraiser', (req, res) => {
    const { fundraiserId } = req.body;

    const sql = "UPDATE fundraisers SET confirmed = TRUE WHERE id = ?";
    db.query(sql, [fundraiserId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Fundraiser confirmed successfully!" });
    });
});




// API Endpoint to fetch all table data
app.get('/api/fundraisers', (req, res) => {
    const sql = "SELECT * FROM fundraisers WHERE confirmed = TRUE ORDER BY donatedAmount ASC";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }
        res.status(200).json(results);
    });
});

// API Endpoint to fetch a single fundraiser by ID
app.get('/api/fundraisers/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM fundraisers WHERE id = ?";
    
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Fundraiser not found" });
        }

        res.status(200).json(results[0]);
    });
});

// Start Server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
