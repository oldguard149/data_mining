const className = ['2-4-d-injury', 'alternarialeaf-spot', 'anthracnose',
    'bacterial-blight', 'bacterial-pustule', 'brown-spot',
    'brown-stem-rot', 'charcoal-rot', 'cyst-nematode',
    'diaporthe-pod-&-stem-blight', 'diaporthe-stem-canker',
    'downy-mildew', 'frog-eye-leaf-spot', 'herbicide-injury',
    'phyllosticta-leaf-spot', 'phytophthora-rot', 'powdery-mildew',
    'purple-seed-stain', 'rhizoctonia-root-rot'];

const result = ['{\n'];

className.forEach(name => {
    result.push(`"${name.trim()}": [],\n`);
})
result.push('}')

const fs = require('fs');

fs.writeFile('./deseasedata.json', result.join(''), (err) => {
    console.log(err);
})