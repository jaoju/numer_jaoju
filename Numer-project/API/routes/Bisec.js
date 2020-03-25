const express = require('express');
const router = express.Router();
const math = require('mathjs');

router.get('/Bisec',(req,res)=> {
    res.send('testget')
});

router.post('/Bisec',(req,res)=>{
        var xl = req.body.xl;
        xl = parseFloat(xl);
        var xr = req.body.xr;
        xr = parseFloat(xr);
        var xo = xr;
        var check = parseFloat(0.000000);
        const code = math.compile(req.body.equation);
        let scopel = { x: xl };
        let scoper = { x: xr };
        var result1 = [];
        var i = 1;
        if (code.eval(scopel) * code.eval(scoper) < 0) {
            do {
                var xm = (xl + xr) / 2;
                let scopem = { x: xm };

                if (code.eval(scopel) * code.eval(scopem) < 0) {
                    xr = xm;
                }
                else {
                    xl = xm;
                }
                check = math.abs((xm - xo) / xm) * 100;
                result1.push({
                    'iteration': i,
                    'xl': xl,
                    'xr': xr,
                    'xm': xm,
                    'Error': check,
                });
                xo = xm;
                i++;
                console.log(check)
            } while (check > 0.000001);
        }
       res.json({result:result1})
});
module.exports = router;