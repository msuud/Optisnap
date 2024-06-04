const express = require('express')
const router = express.Router();
const userVerification = require('../schemas/userVerificationSchema');
const user = require('../schemas/userSchema')
const path = require('path')
const bcrypt = require('bcrypt')

router.get("/:id/:uString", async (req, res) => {
    const { id, uString } = req.params
    // console.log("verify called");
    let message
    try {
        let result = await userVerification.find({ uid: id })
        if (result.length > 0) {
            if (result[0].expiresAt < Date.now()) {
                await userVerification.deleteOne({ uid: id })
                message = "The link has expired.Please sign up again."
                res.redirect(`/verify/verified?error=false&&message=${message}`)
            }
            else {
                //compare with bcrypt and send appropriate messages
                let response = await userVerification.findOne({ uid: id }, { uString: 1 })
                if (bcrypt.compare(uString, response.uString)) {
                    await userVerification.deleteOne({ uid: id })
                    await user.updateOne({ _id: id }, { $set: { verified: true } })
                    message = 'The email has been verified'
                    return res.redirect(`/verify/verified?message=${message}`)
                }
                else{
                    message = 'The link is invalid.It has been altered use the link in the email'
                    return res.redirect(`/verify/verified?error=true&&message=${message}`)
                }
            }
        }
        else {
            message = "The email is already verifed or please sign up again"
            return res.redirect(`/verify/verified?error=true&&message=${message}`)
        }
    } catch (error) {
        return res.redirect(`/verify/verified?error=true&&message=${error.message}`)

    }
})

router.get('/verified', (req, res) => {
    let x = path.join(__dirname, "../verified.html")
    // console.log(x);
    return res.sendFile(x)
})
module.exports = router