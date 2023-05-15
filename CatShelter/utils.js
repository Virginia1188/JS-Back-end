
const fss = require('fs');
const fs = require('fs/promises');

function readFile(path) {
    return fs.readFile(path, { encoding: 'utf-8' });
}

function catTemplate (cat){
    const html = fss.readFileSync('./views/partials/cats.html', { encoding: 'utf-8' });

    const modified = Object.keys(cat).reduce((result, key) => {
        return result.replaceAll(`{{${key}}}`, cat[key]);
    }, html);

    return modified;
}

function writeDataToFile(filename,content){
    fss.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) =>{
        if(err){
            console.log(err);
        }
    });
}

// function getPostData(req){
//     return new Promise((resolve, reject)=>{
//         try {
//             let body = '';
//             req.on('data', (chunk) =>{
//                 body+= chunk.toString();
               
//             });
//             req.on('end', ()=>{
//                 resolve(body);
//             });
//         } catch (error) {
//             reject(error);
//         }
//     });
// }



module.exports = {
    readFile,
    catTemplate,
    writeDataToFile,
    // getPostData,
    
};