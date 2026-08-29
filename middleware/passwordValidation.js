function passwordCheck(req, res ,next){
    if(req.body.password    !== process.env.ADMIN_PASSWORD){
        req.adminError = "Wrong admin password";    
    }

    next();
}

module.exports = { passwordCheck }