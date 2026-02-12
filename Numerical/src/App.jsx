import './App.css'

function App() {
  return (
    <>
      <h1>Numerical Project</h1>
      <h2>Choose one</h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="/Root-of-Equation/Root"> <h2>Root of Equation</h2></a></li>
        <li><a href="/Linear-algebra/linear"> <h2>Linear Algebra Equation</h2></a></li>
        <li><a href="/Interpolation/Interpolation"> <h2>Interpolation</h2></a></li>
        <li><a href="/Exterpolation/Exterpolation"> <h2>Extrapolation</h2></a></li>
      </ul>
    </>
  );
}

export default App;
