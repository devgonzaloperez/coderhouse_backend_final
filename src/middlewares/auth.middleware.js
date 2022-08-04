export const checkAuth = (req, res, next) =>{
    if(req.session.login && req.isAuthenticated()){
        next()
    }
    else{
        res.redirect("/login");
    }
};