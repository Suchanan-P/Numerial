import { useState } from "react";

function Cramer() {
  // ขนาดเมทริกซ์เริ่มต้น 3x3
  const [matrixSize, setMatrixSize] = useState(3);

  // เมทริกซ์สัมประสิทธิ์
  const [coeffMatrix, setCoeffMatrix] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(0))
  );

  // เวกเตอร์ค่าคงที่
  const [constVector, setConstVector] = useState(Array(3).fill(0));

  // เวกเตอร์คำตอบ
  const [solutionVector, setSolutionVector] = useState(Array(3).fill(null));

  // Iteration / calculation status
  const [calculated, setCalculated] = useState(false);

  // ฟังก์ชัน determinant
  const det = (m) => {
    if (m.length === 1) return m[0][0];
    if (m.length === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    let sum = 0;
    for (let i = 0; i < m.length; i++) {
      const subMatrix = m
        .slice(1)
        .map((row) => row.filter((_, colIdx) => colIdx !== i));
      sum += ((i % 2 === 0 ? 1 : -1) * m[0][i] * det(subMatrix));
    }
    return sum;
  };

  const calculateCramer = () => {
    console.log("Calculating...");
    console.log("Matrix:", coeffMatrix);
    console.log("Vector:", constVector);

    const D = det(coeffMatrix);
    if (!D || isNaN(D)) {
      alert("Invalid matrix! Check your inputs.");
      return;
    }
    if (D === 0) {
      alert("Determinant is zero! No unique solution.");
      return;
    }

    const newSolution = [];
    for (let i = 0; i < matrixSize; i++) {
      const tempMatrix = coeffMatrix.map((row, rowIdx) =>
        row.map((val, colIdx) => (colIdx === i ? constVector[rowIdx] : val))
      );
      newSolution.push(det(tempMatrix) / D);
    }

    setSolutionVector(newSolution);
    setCalculated(true);
  };

  // ฟังก์ชันช่วยอัปเดตค่าในเมทริกซ์
  const updateMatrixValue = (row, col, value) => {
    const num = parseFloat(value);
    const newMatrix = coeffMatrix.map((r) => [...r]);
    newMatrix[row][col] = isNaN(num) ? 0 : num;
    setCoeffMatrix(newMatrix);
  };

  // ฟังก์ชันช่วยอัปเดตเวกเตอร์ค่าคงที่
  const updateConstValue = (row, value) => {
    const num = parseFloat(value);
    const newVector = [...constVector];
    newVector[row] = isNaN(num) ? 0 : num;
    setConstVector(newVector);
  };

  return (
    <>
      <h1>Cramer's Rule Calculator</h1>

      <label>
        Matrix Size (2-5):
        <input
          type="number"
          value={matrixSize}
          onChange={(e) => {
            let newSize = Number(e.target.value);
            if (newSize < 2) newSize = 2;
            if (newSize > 5) newSize = 5;
            setMatrixSize(newSize);
            setCoeffMatrix(Array.from({ length: newSize }, () => Array(newSize).fill(0)));
            setConstVector(Array(newSize).fill(0));
            setSolutionVector(Array(newSize).fill(null));
            setCalculated(false);
          }}
        />
      </label>

      <h2>Coefficient Matrix:</h2>
      {coeffMatrix.map((row, i) => (
        <div key={i}>
          {row.map((val, j) => (
            <input
              key={j}
              type="number"
              value={val}
              onChange={(e) => updateMatrixValue(i, j, e.target.value)}
              style={{ width: "60px", margin: "2px" }}
            />
          ))}
        </div>
      ))}

      <h2>Constants Vector:</h2>
      {constVector.map((val, i) => (
        <input
          key={i}
          type="number"
          value={val}
          onChange={(e) => updateConstValue(i, e.target.value)}
          style={{ width: "60px", margin: "2px" }}
        />
      ))}

      <br />
      <button onClick={calculateCramer}>Calculate</button>

      {calculated && (
        <>
          <h2>Solution:</h2>
          <ul>
            {solutionVector.map((val, i) => (
              <li key={i}>
                x{i + 1} = {val.toFixed(6)}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Cramer;
