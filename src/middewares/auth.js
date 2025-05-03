const adminAuth = (req, res, next) => {
    console.log("admin auth checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("unauhorized request");  
    }else {
        next();
    }
} ;
module.exports ={adminAuth}