const express = require("express");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// internal imports
const registrationschema = require("../../models/auth/registration");
const { hashPassword } = require("../common/function/common")

// console.log("now");

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}
profileUpdate = async (req, res) => {
    console.log("req.body")
    console.log(req.body)
    const { name, email, password, phone, address } = req.body;

    if (!email || email.trim() === '') {
        res.json({ errorMsg: "email is required" });
    } else {
        try {
            // Check if email and hashed password match
            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.json({ success: false, errorMsg: 'Invalid credentials' });
            }
            const user = await registrationschema.findOne({ email: inputEmail, password: passwordMatch })
            let updateUser
            if (!user) {
                // User not found or password doesn't match
                return res.status(401).json({ success: false, errorMsg: 'Invalid credentials' });
            } else {
                updateUser = await registrationschema.findByIdAndUpdate(user._id, {
                    name: name || user.name,
                    name: email || user.email,
                    name: password || user.password,
                    name: phone || user.phone,
                    name: address || user.address,
                })
            }
            // const existingUser = await registrationschema.findOne({ email: email });
            // if (existingUser) {
            //     return res.json({ success: false, errorMsg: "Email already exists. Please choose a different email address." });
            // }

            if (updateUser.length > 0) {
                res.status(200).json({
                    success: true,
                    user,
                    message: "Registration successful."
                });
            } else {
                console.log("Failed to profileUpdate Update .");
                res.status(401).json({
                    success: false,
                    errorMsg: "Failed to profile Update ."
                });
            }

        } catch (error) {
            console.error("Error occurred during profileUpdate:", error);
            res.json({
                success: false,
                errorMsg: "Internal server error occurred during profileUpdate."
            });
        }

    }


}
module.exports = {
    profileUpdate,
};