import { useState } from "react";
import Plot from "react-plotly.js";

function Secant() {
  const [funcS, setFuncS] = useState("x**3 - 7"); // ตัวอย่างฟังก์ชัน
  const [x0S, setX0S] = useState(1.5);
  const [x1S, setX1S] = useState(2.0);
  const [tolS, setTolS] = useState(0.000001);
  const [resultsS, setResultsS] = useState([]);
  const [finalXS, setFinalXS] = useState(null);
  const [iterS, setIterS] = useState(0);
  const [plotDataS, setPlotDataS] = useState({ x: [], y: [] });

  const calculateS = () => {
    let fS;
    try {
      fS = new Function("x", `return ${funcS}`);
    } catch {
      alert("Function invalid!!");
      return;
    }

    let xPrevS = x0S;
    let xCurrS = x1S;
    let xNextS = 0;
    let errS = 1.0;
    let iterCountS = 0;
    let tolValS = tolS;
    let dataS = [];

    while (errS > tolValS && iterCountS < 100) {
      const fPrev = fS(xPrevS);
      const fCurr = fS(xCurrS);

      if (fCurr - fPrev === 0) {
        alert("Divide by zero occurred!");
        break;
      }

      xNextS = xCurrS - fCurr * ((xCurrS - xPrevS) / (fCurr - fPrev));
      errS = Math.abs(xNextS - xCurrS);

      dataS.push({
        iter: iterCountS + 1,
        xPrevS,
        xCurrS,
        xNextS,
        errS,
      });

      xPrevS = xCurrS;
      xCurrS = xNextS;
      iterCountS++;
    }

    // เตรียมข้อมูลสำหรับกราฟ f(x)
    let xValsS = [];
    let yValsS = [];
    let stepS = 0.01;
    for (let x = x0S - 2; x <= x1S + 2; x += stepS) {
      try {
        xValsS.push(x);
        yValsS.push(fS(x));
      } catch {
        yValsS.push(NaN);
      }
    }

    setResultsS(dataS);
    setFinalXS(xCurrS);
    setIterS(iterCountS);
    setPlotDataS({ x: xValsS, y: yValsS });
  };

  return (
    <>
      <h1>Secant Method</h1>

      {/* ส่วนรับข้อมูล */}
      <div className="input-section">
        <label>
          f(x):
          <input
            value={funcS}
            onChange={(e) => setFuncS(e.target.value)}
            placeholder="x**3 - 7"
          />
        </label>
        <label>
          x₀:
          <input
            type="number"
            value={x0S}
            onChange={(e) => setX0S(Number(e.target.value))}
          />
        </label>
        <label>
          x₁:
          <input
            type="number"
            value={x1S}
            onChange={(e) => setX1S(Number(e.target.value))}
          />
        </label>
        <label>
          Tolerance:
          <input
            type="number"
            value={tolS}
            onChange={(e) => setTolS(Number(e.target.value))}
          />
        </label>
        <button onClick={calculateS}>Calculate</button>
      </div>

      {/* กราฟแสดง f(x) และ Error ต่อ Iteration */}
      {plotDataS.x.length > 0 && (
        <Plot
          data={[
            {
              x: plotDataS.x,
              y: plotDataS.y,
              type: "scatter",
              mode: "lines",
              name: "f(x)",
              line: { color: "blue" },
            },
            {
              x: resultsS.map((row) => row.iter),
              y: resultsS.map((row) => row.errS),
              type: "scatter",
              mode: "markers+lines",
              marker: { color: "red", size: 8 },
              line: { dash: "dot", color: "red" },
              name: "Error per Iteration",
              yaxis: "y2",
            },
            {
              x: [finalXS],
              y: [0],
              mode: "markers",
              marker: { color: "green", size: 12, symbol: "star" },
              name: "Final Root",
            },
          ]}
          layout={{
            title: "Secant Method - f(x) & Error Plot",
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
      {resultsS.length > 0 && (
        <div className="table-section">
          <h2>Iterations:</h2>
          <table>
            <thead>
              <tr>
                <th>Iteration</th>
                <th>x₍i-1₎</th>
                <th>xᵢ</th>
                <th>xᵢ₊₁</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {resultsS.map((row) => (
                <tr key={row.iter}>
                  <td>{row.iter}</td>
                  <td>{row.xPrevS.toFixed(6)}</td>
                  <td>{row.xCurrS.toFixed(6)}</td>
                  <td>{row.xNextS.toFixed(6)}</td>
                  <td>{row.errS.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* แสดงผลลัพธ์สุดท้าย */}
      {finalXS != null && (
        <h2>
          Final Root ≈ {finalXS.toFixed(6)} (Iterations: {iterS})
        </h2>
      )}
    </>
  );
}

export default Secant;