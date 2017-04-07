const mongoose = require('mongoose');
const CatDoc = require('./models/cats');
const cats = [
  { name: 'rupert', ready_for_home: false, age: 12, personality: ['friendly', 'lazy', 'loving']},
  { name: 'mrs fluffy', ready_for_home: true, age: 2, personality: ['affectionate', 'playful', 'shy']},
  { name: 'tabitha', ready_for_home: true, age: 4, personality: ['aggressive', 'independent']},
  { name: 'lily', ready_for_home: false, age: 8, personality: ['friendly', 'playful', 'mischievous']},
  { name: 'stripe', ready_for_home: true, age: 1, personality: ['naughty', 'independent']},
  { name: 'bob', ready_for_home: true, age: 1, personality: ['aggressive', 'antisocial', 'nervous']},
  { name: 'jean claude cat damme', ready_for_home: true, age: 11, personality: ['sleepy', 'shy', 'loving']},
  { name: 'tilly', ready_for_home: true, age: 4, personality: ['playful', 'social', 'attention-seeking']},
  { name: 'milo', ready_for_home: false, age: 7, personality: ['mischievous', 'friendly']},
  { name: 'mr claws', ready_for_home: true, age: 13, personality: ['affectionate', 'shy', 'nervous']},
  { name: 'robert zimmercat', ready_for_home: true, age: 3, personality: ['folksy', 'prolific', 'neurotic']},
  { name: 'jasper', ready_for_home: true, age: 8, personality: ['boisterous', 'loving']},
  { name: 'kobe', ready_for_home: false, age: 3, personality: ['soft', 'boring', 'lazy']}
];

mongoose.connect('mongodb://matt:Password@ds151060.mlab.com:51060/cat_rehoming', function (error) {
  if (error) {
    console.log(error);
    return process.exit();
  }
  cats.forEach(function (cat, i) {
    let catDoc = new CatDoc(cat);
    catDoc.save(function (error, doc) {
      if (error) {
        return console.log(error);
      }
      console.log(`Cat ${i} ${cat.name} saved to db!`);
    });
  });
});