const crypto = require('crypto');
const { writeToString } = require('@fast-csv/format');
const spawn = require('child_process').spawn;
const fs = require('fs');
const csv = require('fast-csv');
const fetch = require('node-fetch');
const { className, bodyName } = require('./helper_data');

function isValidDesease(deseaseName) {
  const checker = className.filter(name => name === deseaseName);
  if (checker.length === 1) {
    return true;
  }
  return false;
}

function getHeaderForResultCsv() {
  let result = '';
  bodyName.forEach(body => {
    result += `"${body}",`;
  });
  result += '"class"\n';
  return result
}

function getFileName() {
  const expirey = new Date();
  expirey.setHours(expirey.getHours() + 1); // expirey time is 1 hours
  const expireyTime = parseInt(expirey.getTime() / 1000);
  const id = crypto.randomBytes(3).toString('hex');
  return `${id}-${expireyTime}.csv`;
}

/**
 * 
 * @param {Array[Object]} data read from csv: [{"roots": value1, "seed": value2, ...}]
 * @rerturns {Array} result: [value1, value2]
 */
function convertDataFromCsvFormat(data) {
  const result = [];
  bodyName.forEach(body => {
    result.push(data[body]);
  });
  return result;
}

function getWaitTime(filesize) { // filesize is measure in byte
  const oneKB = 1024;
  const oneMB = 1024 * oneKB;
  let waitTime;
  if (filesize <= 500 * oneKB) { // smaller than or equal 500kb
    waitTime = 5;
  } else if (filesize <= oneMB) {
    waitTime = 10;
  } else {
    waitTime = 15;
  }
  return waitTime;
}

async function fetchPredictClass(rawData) {
  const url = 'http://127.0.0.1:5000/'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rawData)
  });
  const resData = await response.json();
  return className[parseInt(resData['result'])]
}

function handleUploadFile(req, res, clientCsvFilePath, resultFilePath, resultCsvFileName) {
  const csvHeader = getHeaderForResultCsv();
  const waitTime = getWaitTime(req.file.size);
  fs.writeFile(resultFilePath, csvHeader, () => { });
  fs.createReadStream(clientCsvFilePath)
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', async rawData => {
      const data = convertDataFromCsvFormat(rawData);
      const desease = await fetchPredictClass(rawData);
      setTimeout(() => { }, 50);
      data.push(desease);

      writeToString([data]).then(data => {
        fs.appendFile(resultFilePath, `${data}\n`, () => { });
      });
    })
    .on('end', () => res.render('download',
      {
        link: `/download/${resultCsvFileName}`,
        waitTime
      }
    ));
}

module.exports = {
  isValidDesease,
  getHeaderForResultCsv,
  getFileName,
  handleUploadFile,
  getPredictClass
}