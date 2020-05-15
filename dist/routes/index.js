"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
    // @ts-ignore
    console.log("Corre 4");
    res.render('index', { title: 'Express 4' });
});
module.exports = router;
//# sourceMappingURL=index.js.map