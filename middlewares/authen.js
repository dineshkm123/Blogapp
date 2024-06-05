const { validateToken } = require("../services/authen")

const checkForAunthenticationCookie = (req, res, next) => {
    let tokenCookieValue
    if (req.cookies)
        tokenCookieValue = req.cookies["token"]
    if (!tokenCookieValue) {
        return  next()
       
    }


    try {

        const userpayload = validateToken(tokenCookieValue)
        req.user = userpayload;
        return next()
    }
    catch (error) { }
    return next()
    
}


module.exports = { checkForAunthenticationCookie }