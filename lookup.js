var bower = require('bower');
var fs = require('fs');
var async = require('async');
var _ = require('lodash');
var map = _.map, compact = _.compact;

var json = JSON.parse(fs.readFileSync('./data/query-clean-deduped.json', {encoding:'utf-8'}));
var keys = Object.keys(json);


function lookup(libName, cbk){
  bower.commands.lookup(libName).on('end', function (found) {
    if (found) {
      cbk(null, [libName, json[libName]]);
    } else {
      cbk(null, null);
    }
  }).on('error', function(){
    cbk(null, null);
  });
}

async.map(keys, lookup, function(err, array){
  var data = map(compact(array), function(line){
    return line.join(",");
  }).join("\n");
  fs.writeFileSync('./data/query-clean-deduped-installable.csv', data);
});
