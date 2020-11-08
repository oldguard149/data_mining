// const className = ['2-4-d-injury', 'alternarialeaf-spot', 'anthracnose',
//     'bacterial-blight', 'bacterial-pustule', 'brown-spot',
//     'brown-stem-rot', 'charcoal-rot', 'cyst-nematode',
//     'diaporthe-pod-&-stem-blight', 'diaporthe-stem-canker',
//     'downy-mildew', 'frog-eye-leaf-spot', 'herbicide-injury',
//     'phyllosticta-leaf-spot', 'phytophthora-rot', 'powdery-mildew',
//     'purple-seed-stain', 'rhizoctonia-root-rot'];

// const result = ['{\n'];

// className.forEach(name => {
//     result.push(`"${name.trim()}": [],\n`);
// })
// result.push('}')

// const fs = require('fs');

// fs.writeFile('./deseasedata.json', result.join(''), (err) => {
//     console.log(err);
// })


const bodyName = ['date', 'plant-stand', 'precip', 'temp', 'hail', 'crop-hist',
  'area-damaged', 'severity', 'seed-tmt', 'germination', 'plant-growth', 'leaves',
  'leafspots-halo', 'leafspots-marg', 'leafspot-size', 'leaf-shread', 'leaf-malf',
  'leaf-mild', 'stem', 'lodging', 'stem-cankers', 'canker-lesion', 'fruiting-bodies',
  'external-decay', 'mycelium', 'int-discolor', 'sclerotina', 'fruit-pods', 'fruit-spots',
  'seed', 'mold-growth', 'seed-discolor', 'seed-size', 'shriveling', 'roots'];

// let result = '';//['[\n'];
// bodyName.forEach(body => {
//   // result.push(`{label: '${body}', value: '${body}'},\n`);
//   result += `${body},`;
// });
// console.log(result);

function getHeaderForCsv() {
  let result = '';
  bodyName.forEach(body => {
    result += `${body},`;
  });
  result += 'class';
  return result
}

console.log(getHeaderForCsv())