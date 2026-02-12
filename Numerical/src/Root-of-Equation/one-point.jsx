import { useState } from "react";
import Plot from "react-plotly.js";

function OneP() {
  const [funcO, setFuncO] = useState("0.5 * (x + 7/x)"); // ฟังก์ชันที่เสถียรกว่า
  const [x0O, setX0O] = useState(0.5); // เริ่มจากค่าใกล้ 0 (ถ้าเริ่ม 0 จะหารศูนย์ไม่ได้)
  const [tolO, setTolO] = useState(0.000001);
  const [resultsO, setResultsO] = useState([]);
  const [finalXO, setFinalXO] = useState(null);
  const [iterO, setIterO] = useState(0);
  const [plotDataO, setPlotDataO] = useState({ x: [], y: [] });

  const calculateO = () => {
    let g;
    try {
      g = new Function("x", `return ${funcO}`);
    } catch {
      alert("Function invalid!!");
      return;
    }

    let xOldO = x0O;
    let xNewO = 0;
    let errO = 1.0;
    let iterCount = 0;
    let tolVal = tolO;
    let dataO = [];

    while (errO > tolVal && iterCount < 100) {
      xNewO = g(xOldO);
      errO = Math.abs(xNewO - xOldO);

      dataO.push({
        iter: iterCount + 1,
        xOldO,
        xNewO,
        errO,
      });

      xOldO = xNewO;
      iterCount++;
    }

    // เตรียมข้อมูลสำหรับกราฟ g(x)
    let xValsO = [];
    let yValsO = [];
    let stepO = 0.01;
    for (let x = 0; x <= 4; x += stepO) {
      try {
        xValsO.push(x);
        yValsO.push(g(x));
      } catch {
        yValsO.push(NaN);
      }
    }

    setResultsO(dataO);
    setFinalXO(xNewO);
    setIterO(iterCount);
    setPlotDataO({ x: xValsO, y: yValsO });
  };

  return (
    <>
      <h1>One-Point Iteration Method (Find √7)</h1>

      {/* ส่วนรับข้อมูล */}
      <div className="input-section">
        <label>
          g(x):
          <input
            value={funcO}
            onChange={(e) => setFuncO(e.target.value)}
            placeholder="0.5 * (x + 7/x)"
          />
        </label>
        <label>
          Initial guess (x₀):
          <input
            type="number"
            value={x0O}
            onChange={(e) => setX0O(Number(e.target.value))}
          />
        </label>
        <label>
          Tolerance:
          <input
            type="number"
            value={tolO}
            onChange={(e) => setTolO(Number(e.target.value))}
          />
        </label>
        <button onClick={calculateO}>Calculate</button>
      </div>

      {/* กราฟแสดง g(x) และ Error */}
      {plotDataO.x.length > 0 && (
        <Plot
          data={[
            {
              x: plotDataO.x,
              y: plotDataO.y,
              type: "scatter",
              mode: "lines",
              name: "g(x)",
              line: { color: "blue" },
            },
            {
              x: resultsO.map((row) => row.iter),
              y: resultsO.map((row) => row.errO),
              type: "scatter",
              mode: "markers+lines",
              marker: { color: "red", size: 8 },
              line: { dash: "dot", color: "red" },
              name: "Error per Iteration",
              yaxis: "y2",
            },
            {
              x: [finalXO],
              y: [finalXO],
              mode: "markers",
              marker: { color: "green", size: 12, symbol: "star" },
              name: "Final Root (√7)",
            },
          ]}
          layout={{
            title: "One-Point Iteration Method - g(x) & Error Plot",
            xaxis: { title: "x / Iteration" },
            yaxis: { title: "g(x)" },
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

      {/* ตารางแสดงผลการคำนวณ */}
      {resultsO.length > 0 && (
        <div className="table-section">
          <h2>Iterations:</h2>
          <table>
            <thead>
              <tr>
                <th>Iteration</th>
                <th>x(old)</th>
                <th>x(new)</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {resultsO.map((row) => (
                <tr key={row.iter}>
                  <td>{row.iter}</td>
                  <td>{row.xOldO.toFixed(6)}</td>
                  <td>{row.xNewO.toFixed(6)}</td>
                  <td>{row.errO.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* แสดงผลลัพธ์สุดท้าย */}
      {finalXO != null && (
        <h2>
          Final √7 ≈ {finalXO.toFixed(6)} (Iterations: {iterO})
        </h2>
      )}
    </>
  );
}

export default OneP;
