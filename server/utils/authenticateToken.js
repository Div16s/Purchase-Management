import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json({
        err: "Unauthorized Access, Please login to continue."
    });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            console.log("Error in verifying token: ", err.message);
            return res.status(403).json({
                err: "Access denied!",
                description: "Your authentication token is invalid or has expired. Please login again or contact support if you believe this is a mistake."
            });
        }

        req.user = user;
        next();
    });
}

export default authenticateToken;