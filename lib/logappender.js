var db = require('./db');

var batchSize = 10;
var lastWriteTime = null;
var count = 0;
var data = "";

function flushToDB() {
    db.write(data);
    data = "";
    count = 0;
    lastWriteTime = Date.now();
}

exports.append = function(message) {
    data += message + "\n";
    count += 1;

    var duration = Date.now() - lastWriteTime;
    if (count >= batchSize && duration > 1000) {
        flushToDB();
    }
};
