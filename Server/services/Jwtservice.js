

const jwt=require("jsonwebtoken")


class Jwtservice{




    static Sign(payload,secret,expiry){
        return jwt.sign(payload,secret,{expiresIn:expiry})
    }
    static Verify(token,secret){
        return jwt.verify(token,secret)
    }
}

module.exports=Jwtservice
