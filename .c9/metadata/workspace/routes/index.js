{"filter":false,"title":"index.js","tooltip":"/routes/index.js","undoManager":{"mark":7,"position":7,"stack":[[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":33}},"text":"var express = require('express');"},{"action":"insertText","range":{"start":{"row":0,"column":33},"end":{"row":1,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":22,"column":0}},"lines":["exports.setup = function(app) {","    var router = express.Router();","    ","    router.use(function(req, res, next) {","        res.set('Access-Control-Allow-Origin', '*');","        next();","    });","    // Register the routes in order.","    var auth = require('./auth');","    var core = require('./core');","    var stu_route = require('./students');","    var sta_route = require('./staff');","    var error = require('./error');","","    router.use(auth.setup(app));","    router.use(core.setup(app));","    router.use(stu_route.setup(app));","    router.use(sta_route.setup(app));","    router.use(error.setup(app));","","    return router;"]},{"action":"insertText","range":{"start":{"row":22,"column":0},"end":{"row":22,"column":2}},"text":"};"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":7,"column":7},"end":{"row":8,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":8,"column":0},"end":{"row":8,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":10,"column":0},"end":{"row":11,"column":0}},"nl":"\n","lines":["    var auth = require('./auth');"]}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":11,"column":0},"end":{"row":12,"column":0}},"nl":"\n","lines":["    var stu_route = require('./students');"]}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":11,"column":0},"end":{"row":12,"column":0}},"nl":"\n","lines":["    var sta_route = require('./staff');"]}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":13,"column":0},"end":{"row":14,"column":0}},"nl":"\n","lines":["    router.use(auth.setup(app));"]}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":14,"column":0},"end":{"row":15,"column":0}},"nl":"\n","lines":["    router.use(stu_route.setup(app));"]}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":14,"column":0},"end":{"row":15,"column":0}},"nl":"\n","lines":["    router.use(sta_route.setup(app));"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":17,"column":2},"end":{"row":17,"column":2},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1415748652945,"hash":"04a1b55865b5dc7065bac5072dd625042bb7eeda"}