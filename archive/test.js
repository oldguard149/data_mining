const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function getFileName() {
    const expirey = new Date();
    expirey.setHours(expirey.getHours());
    const expireyTime = parseInt(expirey.getTime() / 1000);
    const id = crypto.randomBytes(3).toString('hex');
    return `${id}-${expireyTime}.csv`;
}

// create file
fs.writeFile(`${getFileName()}`, '', () => {});

//read directory and get expirey file
// fs.readdirSync(__dirname)
//     .filter(file => file !== 'test.js')
//     .map(file => file.split('.')[0])
//     .forEach(file => {
//         const time = file.split('-')[1];
//         if (parseInt(time) < parseInt(Date.now() / 1000)) {
//             fs.unlinkSync(path.resolve(__dirname, `${file}.csv`));
//         }
//     });