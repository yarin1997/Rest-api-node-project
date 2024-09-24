import { Request, Response, Router } from 'express';

const router = Router();

router.get("*", (req: Request, res: Response) => {
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

export default router;
