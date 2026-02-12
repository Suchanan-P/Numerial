const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// API สำหรับ Bisection Method
app.post('/api/bisection', (req, res) => {
  const { func, xl, xr, tol } = req.body;
  let f;
  try {
    f = new Function("x", `return ${func}`);
  } catch {
    return res.status(400).json({ error: "Invalid function" });
  }

  let xm = 0, xm_old = 0;
  let error = 1.0;
  let iter = 0;
  let results = [];
  let xmList = [];
  let Xl = xl, Xr = xr;

  while (error > tol) {
    xm_old = xm;
    xm = (Xl + Xr) / 2.0;

    if (iter > 0) {
      error = Math.abs(xm - xm_old);
      results.push({ inter: iter, xl: Xl, xr: Xr, xm, error1: error });
      xmList.push(xm);
    }

    if (f(Xl) * f(xm) < 0) Xr = xm;
    else Xl = xm;

    iter++;
  }

  res.json({ xm, iterations: iter, table: results, xmPoints: xmList });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
