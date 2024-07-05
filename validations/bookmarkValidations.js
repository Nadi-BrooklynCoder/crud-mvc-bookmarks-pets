const checkForNameKey = (req, res, next) => {
    if(req.body.hasOwnProperty('name')) {
        next();
    } else {
        res.json({ error: "Bookmark  must contain a name"})
    };
};

const checkForDotCom = (req, res, next) => {
    if(req.body.hasOwnProperty("url")){
       const regex = /\.com/;
    
       if(regex.test(req.body.url)){
        next()
       } else {
        res.json({ error: "url must contain .com"})
       }
       } else {
        res.json({ error: "Bookmark must contain url"})
       }
    }

module.exports = { checkForNameKey, checkForDotCom };