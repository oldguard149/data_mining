var express = require('express');
var router = express.Router();
const spawn = require('child_process').spawn;

const className = ['2-4-d-injury', 'alternarialeaf-spot', 'anthracnose',
  'bacterial-blight', 'bacterial-pustule', 'brown-spot',
  'brown-stem-rot', 'charcoal-rot', 'cyst-nematode',
  'diaporthe-pod-&-stem-blight', 'diaporthe-stem-canker',
  'downy-mildew', 'frog-eye-leaf-spot', 'herbicide-injury',
  'phyllosticta-leaf-spot', 'phytophthora-rot', 'powdery-mildew',
  'purple-seed-stain', 'rhizoctonia-root-rot'];

const bodyName = ['date', 'plant-stand', 'precip', 'temp', 'hail', 'crop-hist',
  'area-damaged', 'severity', 'seed-tmt', 'germination', 'plant-growth', 'leaves',
  'leafspots-halo', 'leafspots-marg', 'leafspot-size', 'leaf-shread', 'leaf-malf',
  'leaf-mild', 'stem', 'lodging', 'stem-cankers', 'canker-lesion', 'fruiting-bodies',
  'external-decay', 'mycelium', 'int-discolor', 'sclerotina', 'fruit-pods', 'fruit-spots',
  'seed', 'mold-growth', 'seed-discolor', 'seed-size', 'shriveling', 'roots'];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', async (req, res) => {
  try {
    const formData = [];
    bodyName.forEach(value => {
      formData.push(req.body[value]);
    })

    // path of python and model is looked up from app.js directory position
    var process = spawn('python', ["ml_model/script.py", ...formData]);
    const result = [];
    for await (const data of process.stdout) {
      console.log(`stdout from the child: ${data}`);
      result.push(data.toString());
    };

    const desease = className[parseInt(result[0])];
    res.render('result', { desease });
  } catch (error) {
    console.log(error);
    res.render('error', { message: "Server error!", error });
  }
});

module.exports = router;
