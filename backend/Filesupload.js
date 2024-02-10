const multer=require('multer');
const path = require('path');
const fs = require('fs');


const uploadDirectory = path.join(__dirname, './uploads/');


if (!fs.existsSync(uploadDirectory)) {
    fs.mkdir(uploadDirectory, (err) => {
        if (err) {
            console.error('Error creating uploads directory:', err);
        } else {
            console.log('Uploads directory created successfully.');
        }
    });
}


const sanitizeFilename = (filename) => {
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
};


const fileFilter = function (req,file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|svg|pdf|txt|doc|docx|xls|xlsx/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb(new Error("You can only upload documents of type (pdf,txt,doc,docx,xls,xlsx) and images of type (jpeg,jpg,png,gif,svg)"));
    }
  };



const storage=multer.diskStorage({ 
    destination:function(req,file,cb){
        console.log(__dirname);
        cb(null,uploadDirectory)
    },
    filename:function(req,file,cb){  
        const timestamp = new Date().toISOString().replace(/:/g, '-'); 
        const userImageFilename = `${timestamp}-${sanitizeFilename(file.originalname)}`;
        cb(null, userImageFilename);
    }
})
const upload= multer({ storage: storage,
                       limits:{fileSize:1000000*5},                
                       fileFilter:fileFilter}).single('eventposter');



module.exports=upload;

