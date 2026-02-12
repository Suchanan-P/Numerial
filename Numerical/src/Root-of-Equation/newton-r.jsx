import { useState } from "react";
import Plot from "react-plotly.js";

function Newton() {
  const [funcN, setFuncN] = useState("x**2-7");
  const [diffN, setDiffN] = useState("2*x");
  const [x0N, setX0N] = useState(2.0);
  const [tolN, setTolN] = useState(0.000001);
  const [resultsN, setResultsN] = useState([]);
  const [finalXN, setFinalXN] = useState(null);
  const [iterationN, setIterationN] = useState(0);
  const [plotDataN, setPlotDataN] = useState({ x: [], y: [] });

  const calculateN = () => {
    let f, df;
    try {
      f = new Function("x", `return ${funcN}`);
      df = new Function("x", `return ${diffN}`);
    } catch {
      alert("Invalid function or derivative!");
      return;
    }

    let xN = x0N;
    let xOldN = 0;
    let errN = 1.0;
    let iterN = 0;
    let tolVal = tolN;
    let dataN = [];

    while (errN > tolVal && iterN < 100) {
      xOldN = xN;
      let fx = f(xOldN);
      let dfx = df(xOldN);

      if (dfx === 0) {
        alert("Derivative is zero. Method fails.");
        return;
      }

      xN = xOldN - fx / dfx;
      errN = Math.abs(xN - xOldN);

      dataN.push({
        iter: iterN + 1,
        xOldN,
        fx,
        dfx,
        xN,
        errN,
      });

      iterN++;
    }

    // สร้างข้อมูลสำหรับกราฟ f(x)
    let xValsN = [];
    let yValsN = [];
    let stepN = 0.01;
    for (let x = xN - 3; x <= xN + 3; x += stepN) {
      xValsN.push(x);
      yValsN.push(f(x));
    }

    setResultsN(dataN);
    setFinalXN(xN);
    setIterationN(iterN);
    setPlotDataN({ x: xValsN, y: yValsN });
  };

  return (
    <>
      <h1>Newton-Raphson Method</h1>

      <div className="input-section">
        <label>
          Function f(x):
          <input
            value={funcN}
            onChange={(e) => setFuncN(e.target.value)}
            placeholder="x**4 - 13"
          />
        </label>
        <label>
          f'(x):
          <input
            value={diffN}
            onChange={(e) => setDiffN(e.target.value)}
            placeholder="4*x**3"
          />
        </label>
        <label>
          Initial guess (x₀):
          <input
            type="number"
            value={x0N}
            onChange={(e) => setX0N(Number(e.target.value))}
          />
        </label>
        <label>
          Tolerance:
          <input
            type="number"
            value={tolN}
            onChange={(e) => setTolN(Number(e.target.value))}
          />
        </label>
        <button onClick={calculateN}>Calculate</button>
      </div>

      {/* กราฟแสดง f(x) และ Error ต่อ Iteration */}
      {plotDataN.x.length > 0 && (
        <Plot
          data={[
            {
              x: plotDataN.x,
              y: plotDataN.y,
              type: "scatter",
              mode: "lines",
              name: "f(x)",
              line: { color: "blue" },
            },
            {
              x: resultsN.map((row) => row.iter),
              y: resultsN.map((row) => row.errN),
              type: "scatter",
              mode: "markers+lines",
              marker: { color: "red", size: 8 },
              line: { dash: "dot", color: "red" },
              name: "Error per Iteration",
              yaxis: "y2",
            },
            {
              x: [finalXN],
              y: [0],
              mode: "markers",
              marker: { color: "green", size: 12, symbol: "star" },
              name: "Final Root",
            },
          ]}
          layout={{
            title: "Newton-Raphson Method - f(x) & Error Plot",
            xaxis: { title: "x / Iteration" },
            yaxis: { title: "f(x)" },
            yaxis2: {
              title: "Error",
              overlaying: "y",
              side: "right",
              type: "log",
            },
            legend: { x: 0.1, y: 1.1, orientation: "h" },
          }}
          style={{ width: "100%", height: "500px" }}
        />
      )}

      {/* ตาราง Iteration */}
      {resultsN.length > 0 && (
        <div className="table-section">
          <h2>Iterations:</h2>
          <table>
            <thead>
              <tr>
                <th>Iteration</th>
                <th>x(old)</th>
                <th>f(x)</th>
                <th>f'(x)</th>
                <th>x(new)</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {resultsN.map((row) => (
                <tr key={row.iter}>
                  <td>{row.iter}</td>
                  <td>{row.xOldN.toFixed(6)}</td>
                  <td>{row.fx.toFixed(6)}</td>
                  <td>{row.dfx.toFixed(6)}</td>
                  <td>{row.xN.toFixed(6)}</td>
                  <td>{row.errN.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* แสดงผลลัพธ์สุดท้าย */}
      {finalXN != null && (
        <h2>
          Final Root = {finalXN.toFixed(6)} (Iterations: {iterationN})
        </h2>
      )}
    </>
  );
}

export default Newton;
