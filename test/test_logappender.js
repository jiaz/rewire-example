var rewire = require('rewire');
var assert = require('assert');

describe("LogAppender", function() {
    var logappender = rewire('../lib/logappender');
    it('should not flush when append less than batchSize times', function() {
        var batchSize = logappender.__get__('batchSize');
        var flushCalled = false;
        logappender.__set__('flushToDB', function() {
            flushCalled = true;
        })
        for (var i = 0; i < batchSize - 1; i++) {
            logappender.append("hello");
        }
        assert.strictEqual(flushCalled, false);
    });

    it('should flush when append more than batchSize times', function() {
        var batchSize = logappender.__get__('batchSize');
        var flushCalled = false;
        logappender.__set__('flushToDB', function() {
            flushCalled = true;
        })
        for (var i = 0; i < batchSize + 1; i++) {
            logappender.append("hello");
        }
        assert.strictEqual(flushCalled, true);
    });

    it('should not flush when duration less than 1 second', function() {
        var batchSize = logappender.__get__('batchSize');
        var flushCalled = false;
        logappender.__set__('flushToDB', function() {
            flushCalled = true;
        })
        logappender.__set__('lastWriteTime', Date.now() - 500);
        for (var i = 0; i < batchSize + 1; i++) {
            logappender.append("hello");
        }
        assert.strictEqual(flushCalled, false);
    });
});
