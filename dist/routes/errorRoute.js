"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("*", (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(`<meta charset="UTF-8">`);
    res.write(`
        <style>
            * {
                direction: rtl;
                text-align: center;
                color: red;
            }
            img {
                width: 500px;
                height: auto;
            }
        </style>
    `);
    res.write("<h1>שגיאה 404</h1>");
    res.write("<h2>הדף המבוקש לא נמצא</h2>");
    res.write('<img src="/404error.png" alt="Error 404 Image">');
    res.end();
});
exports.default = router;
//# sourceMappingURL=errorRoute.js.map