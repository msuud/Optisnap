const router = require('express')
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS  // Use App Password if applicable
    } 
});

transport.verify((error, success) => {
    if (error) {
        console.error('Error verifying email server:', error);
    } else {
        console.log('Email server is ready to take messages');
    }
});
