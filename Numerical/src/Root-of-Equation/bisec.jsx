import { useState } from "react";
import Plot from "react-plotly.js";

function Bisec() {
  const [funcB, setFuncB] = useState("x**4 - 13");
  const [xlb, setXLB] = useState(1.5);
  const [xrb, setXRB] = useState(2.0);
  const [errorb, setErrorB] = useState(0.000001);
  const [tolB, setTolB] = useState([]);
  const [finalxm, setFinalXm] = useState(null);
  const [iteration, setIteration] = useState(0);
  const [plotDataB, setPlotDataB] = useState({ x: [], y: [] });
  const [xmPoints, setXmPoints] = useState([]);

  const calculateB = () => {
    let f;
    try {
      f = new Function("x", `return ${funcB}`);
    } catch {
      alert("Function invalid!!");
      return;
    }

    let xl = xlb;
    let xr = xrb;
    let xm = 0;
    let xm_old = 0;
    let error = 1.0;
    let tol = errorb;
    let iter = 0;
    let results = [];
    let xmList = [];

    while (error > tol) {
      xm_old = xm;
      xm = (xl + xr) / 2.0;

      if (iter > 0) {
        error = Math.abs(xm - xm_old);
        results.push({
          inter: iter,
          xl,
          xr,
          xm,
          error1: error,
        });
        xmList.push(xm); 
      }

      if (f(xl) * f(xm) < 0) {
        xr = xm;
      } else {
        xl = xm;
      }

      iter++;
    }

   
    let xVals = [];
    let yVals = [];
    let step = (xrb - xlb) / 200; 
    for (let x = xlb - 1; x <= xrb + 1; x += step) {
      xVals.push(x);
      yVals.push(f(x));
    }

    setTolB(results);
    setFinalXm(xm);
    setIteration(iter);
    setPlotDataB({ x: xVals, y: yVals });
    setXmPoints(xmList);
  };

  return (
    <>
      <h1>Bisection Method</h1>
      <div className="input-section">
        <label>
          Function f(x):
          <input value={funcB} onChange={(e) => setFuncB(e.target.value)} />
        </label>
        <label>
          xl:
          <input
            type="number"
            value={xlb}
            onChange={(e) => setXLB(Number(e.target.value))}
          />
        </label>
        <label>
          xr:
          <input
            type="number"
            value={xrb}
            onChange={(e) => setXRB(Number(e.target.value))}
          />
        </label>
        <label>
          Tolerance (errorb):
          <input
            type="number"
            value={errorb}
            onChange={(e) => setErrorB(Number(e.target.value))}
          />
        </label>
        <button onClick={calculateB}>Calculate</button>
      </div>

      {plotDataB.x.length > 0 && (
        <Plot
          data={[
            {
              x: plotDataB.x,
              y: plotDataB.y,
              type: "scatter",
              mode: "lines",
              name: "f(x)",
            },
            {
              x: xmPoints,
              y: xmPoints.map(() => 0),
              mode: "markers+lines",
              marker: { color: "red", size: 8 },
              line: { dash: "dot", color: "red" },
              name: "xm (iterations)",
            },
            {
              x: [finalxm],
              y: [0],
              mode: "markers",
              marker: { color: "green", size: 12, symbol: "star" },
              name: "Final Root",
            },
          ]}
          layout={{
            title: "Bisection Method - Graph of f(x)",
            xaxis: { title: "x" },
            yaxis: { title: "f(x)" },
          }}
          style={{ width: "100%", height: "500px" }}
        />
      )}

      {tolB.length > 0 && (
        <div className="tol-section">
          <h2>Iterations:</h2>
          <table>
            <thead>
              <tr>
                <th>Iteration</th>
                <th>xl</th>
                <th>xr</th>
                <th>xm</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {tolB.map((row) => (
                <tr key={row.inter}>
                  <td>{row.inter}</td>
                  <td>{row.xl.toFixed(6)}</td>
                  <td>{row.xr.toFixed(6)}</td>
                  <td>{row.xm.toFixed(6)}</td>
                  <td>{row.error1.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {finalxm != null && (
        <h2>
          Final xm = {finalxm.toFixed(6)} (Iterations: {iteration - 1})
        </h2>
      )}
    </>
  );
}

export default Bisec;
