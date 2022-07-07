const lib = require("./lib/prodInvMgmtService");
const repl = require("node:repl");
repl.start({ prompt: "> ", eval: lib.myEval });
