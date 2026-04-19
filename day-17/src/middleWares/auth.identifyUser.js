const jwt = require("jsonwebtoken");

async function identifyUser (req, res, next) {
    try{
        const token = req.cookies.token;

        if( !token ){
            return res.status(401).json({
                message: "Token not provided, Unauthorized access"
            })
        };

        let decoded;

        try{
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                message: "Unauthorized Access"
            })
        }

        req.user = decoded;

        next()

    } catch (err){
        return res.status(500).json({
            message: "Sorry! something went wrong...."
        })
    }
}

module.exports = identifyUser;