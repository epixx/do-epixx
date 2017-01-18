/**
 * Module dependencies.
 */

var jade = require('jade')
  , fs = require('fs');

// test cases

var cases = fs.readdirSync('test/cases').filter(function(file){
  return ~file.indexOf('.jade');
}).map(function(file){
  return file.replace('.jade', '');
});

cases.forEach(function(test){
  var name = test.replace(/[-.]/g, ' ');
  if (!fs.existsSync('test/cases/' + test + '.html')) return;
  it(name, function(){
    var path = 'test/cases/' + test + '.jade';
    var str = fs.readFileSync(path, 'utf8');
    var html = fs.readFileSync('test/cases/' + test + '.html', 'utf8').trim().replace(/\r/g, '');
    var fn = jade.compile(str, { filename: path, pretty: true });
    var actual = fn({ title: 'Jade' });
    actual.trim().should.equal(html);
  })
});
