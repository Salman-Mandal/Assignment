
//------------------------------------------------Call back Code----------------------------------------------------------------------------------
const fs = require('fs');

function readFileCB(path, cb) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return cb(err);
        }
        cb(null, data);
    });
}
 readFileCB('sample.txt', (err, data) => {
    if (err) {
        console.error('Error :', err);
    } else {
        console.log('Data of the File :', data);
    }
});

// -----------------------------------------------Converted To Promises--------------------------------------------------------------------------

const fs = require('fs').promises;

function readFilePromise(path) {
    return fs.readFile(path, 'utf8');
}

readFilePromise('sample.txt')
    .then(data => {
        console.log('Data of the File:', data);
    })
    .catch(err => {
        console.error('Error :', err);
    });
// -----------------------------------------------Converted to Async Await-------------------------------------------------------------------------
const fs = require('fs').promises;

async function readFileAsync(path) {
    try {
        const data = await fs.readFile(path, 'utf8');
        console.log('Data of the File:', data);
    } catch (err) {
        console.error('Error :', err);
    }
}

readFileAsync('sample.txt');

