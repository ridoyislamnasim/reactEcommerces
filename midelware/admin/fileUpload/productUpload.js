// Index.html
{/* <div>
<h1>File upload</h1>
<input type="file" multiple onChange={e => uploadFile(e)}/>
</div> */}


// Index.js
// const uploadFile = async e => {
// const files = e.target.files
// console.log('files', files)
// const form = new FormData()
// for (let i = 0; i < files.length; i++) {
// form.append('files', files[i], files[i].name)
// }
// try {
// let request = await fetch('/upload', {
//   method: 'post',
//   body: form,
// })
// const response = await request.json()
// console.log('Response', response)
// } catch (err) {
// alert('Error uploading the files')
// console.log('Error uploading the files', err)
// }
// }



// Server.js
const Formidable = require("formidable")
const { join } = require("path")
const bluebird = require('bluebird')
const fs = require('fs');
const fsPromises = require('fs').promises;
// const fs = bluebird.promisifyAll(require('fs'))


// const fs = require('fs').promises;
// const util = require('util');
// const stat = util.promisify(fs.stat);
// await stat(uploadsFolder);
// await fs.mkdir(uploadsFolder);
// Server.js
// Returns true if successful or false otherwise
async function checkCreateUploadsFolder(uploadsFolder) {
    console.log("uploadsFolder", uploadsFolder)
    try {
        // check this file has or not
        fs.stat(uploadsFolder)
    } catch (e) {
        console.log("e.code", e.code)
        console.log("e.code", e)
        // if file not exist error.code : 'ENOENT' 
        if (e && e.code == 'ENOENT') {
            console.log('The uploads folder doesn\'t exist, creating a new one...')
            try {
                // if not exits this file to create this file
                // fs.mkdir(uploadsFolder)
                fs.mkdir(uploadsFolder, (err) => {
                    console.log('Error creating directory: ====================================', err);

                    if (err) {
                        console.log('Error creating directory: ====================================', err);
                    } else {
                        console.log('Directory created successfully');
                    }
                });
            } catch (err) {
                console.log('Error creating the uploads folder 1')
                return false
            }
        } else {
            console.log('Error creating the uploads folder 2')
            return false
        }
    }
    return true
}

// Returns true or false depending on whether the file is an accepted type
function checkAcceptedExtensions(file) {
    console.log("file --------single", file.mimetype)
    // console.log("file --------single", file)

    const type = file.mimetype.split('/').pop()
    const accepted = ['jpeg', 'jpg', 'png', 'gif', 'pdf']
    if (accepted.indexOf(type) == -1) {
        return false
    }
    return true
}

upload = async (req, res) => {
    // receive file and fild for form
    let form = new Formidable.IncomingForm()
    console.log("------------form----------")
    // console.log(form)
    // make upload directory
    console.log("__dirname __dirname __dirname", __dirname)
    const uploadsFolder = join(__dirname, 'dist', 'uploads')
    // if wanted multiples file to make true otherwise single file receive
    form.multiples = true
    // where file upload know that
    form.uploadDir = uploadsFolder
    //inisilize file size if we want
    form.maxFileSize = 50 * 1024 * 1024 // 50 MB
    const folderCreationResult = await checkCreateUploadsFolder(uploadsFolder)
    console.log("folderCreationResult-------", folderCreationResult)

    if (!folderCreationResult) {
        return res.json({ ok: false, msg: "The uploads folder couldn't be created" })
    }
    form.parse(req, async (err, fields, files) => {
        // console.log("files-------", files)
        // console.log("files-------", files.files.length)
        let myUploadedFiles = []
        if (err) {
            console.log('Error parsing the incoming form')
            return res.json({ ok: false, msg: 'Error passing the incoming form' })
        }
        // If we are sending only one file:
        if (!files.files.length) {
            const file = files.files
            if (!checkAcceptedExtensions(file)) {
                console.log('The received file is not a valid type')
                return res.json({ ok: false, msg: 'The sent file is not a valid type' })
            }
            const fileName = encodeURIComponent(file.originalFilename.replace(/&. *;+/g, '-'))
            // myUploadedFiles.push(fileName)
            try {
                // console.log("-----file.path--------", file.path)
                // console.log("-----uploadsFolder--------", uploadsFolder)
                // console.log("-----fileName--------", fileName)
                await fs.renameAsync(file.filepath, join(uploadsFolder, fileName))
            } catch (e) {
                console.log('Error uploading the file')
                try { await fs.unlinkAsync(file.filepath) } catch (e) { }
                return res.json({ ok: false, msg: 'Error uploading the file' })
            }
        } else {
            for (let i = 0; i < files.files.length; i++) {
                const file = files.files[i]
                if (!checkAcceptedExtensions(file)) {
                    console.log('The received file is not a valid type')
                    return res.json({ ok: false, msg: 'The sent file is not a valid type' })
                }
                const fileName = encodeURIComponent(file.originalFilename.replace(/&. *;+/g, '-'))
                console.log("-----fileName--------", fileName)
                // myUploadedFiles.push(fileName)
                try {
                    console.log("-----file--------", file)
                    // console.log("-----file.path--------", file.filepath)
                    console.log("-----uploadsFolder--------", uploadsFolder)

                    await fs.renameAsync(file.filepath, join(uploadsFolder, fileName))
                } catch (e) {
                    console.log('Error uploading the file')
                    try { await fs.unlinkAsync(file.filepath) } catch (e) { }
                    return res.json({ ok: false, msg: 'Error uploading the file' })
                }
            }
        }
        res.json({ ok: true, msg: 'Files uploaded succesfully!', files: myUploadedFiles })
    })
}
module.exports = {
    upload,
};