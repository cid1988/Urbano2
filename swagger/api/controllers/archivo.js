var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var subir = multer({ storage: storage ,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(pdf|doc|docx|jpg|png)$/)) {
            return cb(new Error('Error en el tipo de archivo.'));
        }
        cb(null, true);
    }
}).fields([{name: 'file'}])

async function upload(req, res, next){
    console.log("---------upload---------------");
    try{
        console.log(req.files)
        subir(req, res, function (error) {
            if (error) {
                console.log(error);
                res.json({
                    result: "Error",
                    status: false
                })
            }else{
                console.log('File uploaded successfully.',req.file);
                res.json({
                    result: req.file,
                    status: true
                })
            }
        })
    }catch(e){
        console.log(e)
        res.json({
            message: "Error"
        })
    }
}

module.exports = { upload }