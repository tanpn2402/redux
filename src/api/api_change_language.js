const vi = require('../languages/vi.json');
const en = require('../languages/en.json');
var mergeJSON = require("merge-json") ;

const content = mergeJSON.merge(vi,en)
let api = {
  getContent(language = 'en') {
    return content.filter(obj => obj.lang === language)[0];
  }
};

module.exports = api;