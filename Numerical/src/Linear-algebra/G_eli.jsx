import { useState } from "react";

function G_eli() {
  const [size, setSize] = useState(3); // ขนาดเมทริกซ์
  const [matrix, setMatrix] = useState(Array.from({ length: 3 }, () => Array(3).fill(0)));
  const [rhsVector, setRhsVector] = useState(Array(3).fill(0));
  const [solutionVec, setSolutionVec] = useState(Array(3).fill(null));
  const [computed, setComputed] = useState(false);

  // ฟังก์ชันช่วยอัปเดต matrix
  const updateMatrixCell = (rowIdx, colIdx, value) => {
    const valNum = parseFloat(value);
    const newMatrix = matrix.map((r) => [...r]);
    newMatrix[rowIdx][colIdx] = isNaN(valNum) ? 0 : valNum;
    setMatrix(newMatrix);
  };

  // ฟังก์ชันช่วยอัปเดต rhs vector
  const updateRhsCell = (rowIdx, value) => {
    const valNum = parseFloat(value);
    const newRhs = [...rhsVector];
    newRhs[rowIdx] = isNaN(valNum) ? 0 : valNum;
    setRhsVector(newRhs);
  };

  // Gauss Elimination
  const calculateGauss = () => {
    const mat = matrix.map((r) => [...r]); // copy matrix
    const rhs = [...rhsVector]; // copy vector
    const n = size;

    // Forward elimination
    for (let pivotIdx = 0; pivotIdx < n; pivotIdx++) {
      if (mat[pivotIdx][pivotIdx] === 0) {
        alert("Pivot element is zero! Cannot proceed.");
        return;
      }
      for (let row = pivotIdx + 1; row < n; row++) {
        const factor = mat[row][pivotIdx] / mat[pivotIdx][pivotIdx];
        for (let col = pivotIdx; col < n; col++) {
          mat[row][col] -= factor * mat[pivotIdx][col];
        }
        rhs[row] -= factor * rhs[pivotIdx];
      }
    }

    // Back substitution
    const sol = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) {
        sum += mat[i][j] * sol[j];
      }
      sol[i] = (rhs[i] - sum) / mat[i][i];
    }

    setSolutionVec(sol);
    setComputed(true);
  };

  return (
    <>
      <h1>Gauss Elimination Method</h1>

      <label>
        Matrix Size (2-5):
        <input
          type="number"
          value={size}
          onChange={(e) => {
            let newSize = Number(e.target.value);
            if (newSize < 2) newSize = 2;
            if (newSize > 5) newSize = 5;
            setSize(newSize);
            setMatrix(Array.from({ length: newSize }, () => Array(newSize).fill(0)));
            setRhsVector(Array(newSize).fill(0));
            setSolutionVec(Array(newSize).fill(null));
            setComputed(false);
          }}
        />
      </label>

      <h2>Coefficient Matrix:</h2>
      {matrix.map((row, rIdx) => (
        <div key={rIdx}>
          {row.map((val, cIdx) => (
            <input
              key={cIdx}
              type="number"
              value={val}
              onChange={(e) => updateMatrixCell(rIdx, cIdx, e.target.value)}
              style={{ width: "60px", margin: "2px" }}
            />
          ))}
        </div>
      ))}

      <h2>RHS Vector:</h2>
      {rhsVector.map((val, rIdx) => (
        <input
          key={rIdx}
          type="number"
          value={val}
          onChange={(e) => updateRhsCell(rIdx, e.target.value)}
          style={{ width: "60px", margin: "2px" }}
        />
      ))}

      <br />
      <button onClick={calculateGauss}>Calculate</button>

      {computed && (
        <>
          <h2>Solution:</h2>
          <ul>
            {solutionVec.map((val, idx) => (
              <li key={idx}>
                x{idx + 1} = {val.toFixed(6)}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default G_eli;
