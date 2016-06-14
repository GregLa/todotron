var linvoDB = require("linvodb3");

//// The following two lines are very important
//// Initialize the default store to level-js - which is a JS-only store which will work without recompiling in NW.js / Electron
linvoDB.defaults.store = { db: require("level-js") }; // Comment out to use LevelDB instead of level-js
//// Set dbPath - this should be done explicitly and will be the dir where each model's store is saved
linvoDB.dbPath = process.cwd();

var Todos = new linvoDB('todos',{
    text : String,
    done : false,
    archived : false
});

