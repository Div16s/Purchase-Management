import prisma from '../db/dbConfig.js';
import otpGenerator from 'otp-generator';
import sendOTP from '../utils/sendOTP.js'
import generateToken from '../utils/generateToken.js'

const departmentMap = new Map([
    ["Computer Science Eng", "CSE"],
    ["Electrical Engineering", "EE"],
    ["Mathematics & Computing", "MNC"],
    ["Mechanical Engineering", "ME"],
    ["Civil Engineering", "CE"],
    ["Chemical Engineering", "CH"],
    ["Physics Department", "PH"],
    ["Biomedical Engineering", "BME"],
    ["ACCOUNTS", "ACC"],
    ["PURCHASE", "PUR"],
    ["ADMINISTRATION", "ADMIN"]
]);

const userSignup = async (req, res) => {
    const { name, email, role, department } = req.body;
    if (!name || !email) {
        return res.status(404).json({
            err: "Please provide all required details"
        });
    }
    if(!email.includes("@")) {
        return res.status(404).json({
            err: "Please provide IIT Ropar email id"
        });
    }
    try {
        // if(role === "HOD" || department === "ACCOUNTS" || department === "PURCHASE" || department === "ADMINISTRATION"){
        //     const user = await prisma.user.findFirst({
        //         where: {
        //             OR: [
        //                 {role: role},
        //                 {department: department}
        //             ]
        //         }
        //     }) ;

        //     if(user){
        //         return res.status(400).json({
        //             err: "There can be only one user for this role."
        //         });
        //     }
        // }
        const userExists = await prisma.user.findFirst({
            where: { email: email }
        });

        if (userExists) {
            res.status(400).json({
                err: "User already exists in our database"
            });
        }
        else {
            const OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            const otpCreationTime = new Date();

            const existingEmail = await prisma.userOTP.findFirst({
                where: { email: email }
            });

            if (existingEmail) {
                await prisma.userOTP.update({
                    where: { id: existingEmail.id },
                    data: {
                        otp: OTP,
                        otpCreationTime: otpCreationTime
                    }
                });

                sendOTP(name, email, OTP, (error, message) => {
                    if (error) {
                        return res.status(404).json({ error: "OTP not sent!" });
                    } else {
                        return res.status(200).json({ message: "OTP sent" });
                    }
                });
            }
            else {
                await prisma.userOTP.create({
                    data: {
                        email: email,
                        otp: OTP,
                        otpCreationTime: otpCreationTime
                    }
                });

                console.log("New OTP data saved");

                sendOTP(name, email, OTP, (error, message) => {
                    if (error) {
                        return res.status(404).json({ error: "OTP not sent!" });
                    } else {
                        return res.status(200).json({ message: "OTP sent" });
                    }
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in userSignup: ", error.message);
    }
}

const verifyOTP_userSignup = async (req, res) => {
    const { name, email, role, department, otp } = req.body;
    const departmentCode = departmentMap.get(department);
    if (!otp) {
        res.status(404).json({
            error: "Enter your OTP"
        });
    }

    try {
        const userExists = await prisma.userOTP.findFirst({
            where: { email: email }
        });

        if ((userExists.otp === otp)) {
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    role,
                    department: departmentCode
                }
            });

            //token generation
            const token = generateToken(newUser.email);
            res.status(200).json({
                message: "User registration successfully done",
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                department: newUser.department,
                userToken: token,
            });
        }
        else {
            res.status(404).json({
                err: "Invalid OTP"
            });
        }
    } catch (error) {
        res.status(400).json({
            err: error.message
        });
        console.log("Error in verifyOTP_userSignup: ", error.message);
    }

}

const userLogin = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(404).json({
            err: "Please enter your email."
        });
    }

    try {
        const userExists = await prisma.user.findFirst({
            where: { email: email }
        });

        if (userExists) {
            const username = userExists.name;
            const OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

            const otpCreationTime = new Date();

            const existingEmail = await prisma.userOTP.findFirst({
                where: { email: email }
            });


            if (existingEmail) {
                await prisma.userOTP.update({
                    where: { email: email },
                    data: {
                        otp: OTP,
                        otpCreationTime: otpCreationTime
                    }
                });

                sendOTP(username, email, OTP, (error, message) => {
                    if (error) {
                        return res.status(404).json({ err: "OTP not sent!" });
                    } else {
                        return res.status(200).json({ message: "OTP sent" });
                    }
                })
            }
            else {
                await prisma.userOTP.create({
                    email: email,
                    otp: OTP,
                    otpCreationTime: otpCreationTime
                });

                sendOTP(username, email, OTP, (error, message) => {
                    if (error) {
                        return res.status(404).json({ err: "OTP not sent!" });
                    } else {
                        return res.status(200).json({ message: "OTP sent" });
                    }
                })
            }
        }
        else {
            res.status(400).json({
                err: "User doesn't exists in our database."
            });
        }
    } catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in userLogin: ", error.message);
    }
}

const verifyOTP_userLogin = async (req, res) => {
    const { email, otp } = req.body;
    if (!otp) {
        res.status(404).json({
            err: "Enter your OTP"
        });
    }

    try {
        const userExists = await prisma.userOTP.findFirst({
            where: { email: email }
        });
        if ((userExists.otp === otp)) {
            const existingUser = await prisma.user.findFirst({
                where: { email: email }
            });

            //token generation
            const token = generateToken(userExists.email);

            res.status(200).json({
                message: "User login successfully done",
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                department: existingUser.department,
                signatureFile: existingUser.signature || "",
                userToken: token
            });
        }
        else {
            res.status(404).json({
                err: "Invalid OTP"
            });
        }
    } catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in verifyOTP_userLogin: ", error.message);
    }
}

const updateUserProfile = async (req, res) => {
    const { id, name, signatureFile } = req.body;
    const userId = parseInt(id);

    try {
        const existingUser = await prisma.user.findFirst({
            where: { id: userId }
        });
        if (existingUser) {
            console.log("Existing User Signature: ", existingUser.signature);

            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    name: name,
                    signature: signatureFile
                }
            });

            const token = generateToken(updatedUser.email);

            res.status(200).json({
                message: "Profile updated successfully",
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                department: updatedUser.department,
                signatureFile: updatedUser.signature,
                userToken: token
            });
        } else {
            res.status(404).json({
                err: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            err: error.message,
        });
    }
}

export { userSignup, verifyOTP_userSignup, userLogin, verifyOTP_userLogin, updateUserProfile }