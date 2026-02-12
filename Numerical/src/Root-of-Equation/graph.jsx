import { useState } from "react";
import Plot from "react-plotly.js";

function Graph() {
  const [funcG, setFuncG] = useState("43*x - 180");
  const [XS, setXS] = useState(0);
  const [XE, setXE] = useState(10);
  const [step, setStep] = useState(0.000001);  // ลด step หน่อยเพื่อไม่ให้ loop นานเกินไป
  const [tolG, setTolG] = useState([]);
  const [plotDataG, setPlotDataG] = useState({ x: [], y: [] });

  const calculateG = () => {
    let f;
    try {
      f = new Function("x", `return ${funcG}`);
    } catch {
      alert("Func invalid!!");
      return;
    }

    let xVals = [];
    let yVals = [];
    let found = [];

    for (let x = XS; x <= XE; x += step) {
      let y = f(x);
      xVals.push(x);
      yVals.push(y);

      if (f(x) * f(x + step) <= 0) {
        found.push(x);
      }
    }

    setTolG(found);
    setPlotDataG({ x: xVals, y: yVals });
  };

  return (
    <>
      <h1>Graphical Methods</h1>
      <div className="input-section">
        <label>
          Function f(x):
          <input
            value={funcG}
            onChange={(e) => setFuncG(e.target.value)}
          />
        </label>
        <label>
          X start:
          <input
            type="number"
            value={XS}
            onChange={(e) => setXS(Number(e.target.value))}
          />
        </label>
        <label>
          X end:
          <input
            type="number"
            value={XE}
            onChange={(e) => setXE(Number(e.target.value))}
          />
        </label>
        <label>
          Step:
          <input
            type="number"
            value={step}
            step="0.000001"
            onChange={(e) => setStep(Number(e.target.value))}
          />
        </label>
        <button onClick={calculateG}>Calculate</button>
      </div>

      {plotDataG.x.length > 0 && (
        <Plot
          data={[
            {
              x: plotDataG.x,
              y: plotDataG.y,
              type: "scatter",
              mode: "lines",
              name: "f(x)",
            },
            {
              x: tolG,
              y: tolG.map(() => 0),
              mode: "markers",
              marker: { color: "red", size: 10 },
              name: "Roots",
            },
          ]}
          layout={{
            title: "Graph of f(x)",
            xaxis: { title: "x" },
            yaxis: { title: "f(x)" },
          }}
          style={{ width: "100%", height: "500px" }}
        />
      )}

      {tolG.length > 0 && (
        <div>
          <h2>Roots:</h2>
          <ul>
            {tolG.map((r, idx) => (
              <li key={idx}>{r.toFixed(6)}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Graph;
