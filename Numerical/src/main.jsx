// src/main.jsx (หรือ index.jsx)

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import App from './App.jsx';
import RootE from './Root-of-Equation/Root.jsx'; 
import Bisec from './Root-of-Equation/bisec.jsx';
import Graph from './Root-of-Equation/graph.jsx';
import False from './Root-of-Equation/false.jsx';
import Newton from './Root-of-Equation/newton-r.jsx';
import One from './Root-of-Equation/one-point.jsx';
import Secant from './Root-of-Equation/secant.jsx';

import Linear from './Linear-algebra/Linear.jsx';
import Cramer from './Linear-algebra/Cramer.jsx';
import G_eli from './Linear-algebra/G_eli.jsx';
import G_jor from './Linear-algebra/G_jor.jsx';
import Matrix from './Linear-algebra/Matrix.jsx';
import Lu from './Linear-algebra/Matrix.jsx';
import Jacobi from './Linear-algebra/Jacobi.jsx';
import Conju from './Linear-algebra/Conju.jsx';



import Interpolation from './Interpolation/Interpolation.jsx'
import Lagrange from './Interpolation/Lagrange.jsx'
import Newtondiff from './Interpolation/Newtondiff.jsx'
import Spline from './Interpolation/Spline.jsx'

import Exterpolation from './Exterpolation/Exterpolation.jsx';
import Multi from './Exterpolation/Multi.jsx';
import Simple from './Exterpolation/Simple.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Root-of-Equation/Root" element={<RootE />} />
        <Route path="/Root-of-Equation/bisec" element={<Bisec />} />
        <Route path="/Root-of-Equation/graph" element={<Graph />} />
        <Route path="/Root-of-Equation/false" element={<False />} />
        <Route path="/Root-of-Equation/newton-r" element={<Newton />} />
        <Route path="/Root-of-Equation/one-point" element={<One />} />
        <Route path="/Root-of-Equation/secant" element={<Secant />} />

        <Route path="/Linear-algebra/Linear" element={<Linear />} />
        <Route path="/Linear-algebra/cramer" element={<Cramer />} />
        <Route path="/Linear-algebra/g_eli" element={<G_eli />} />
        <Route path="/Linear-algebra/g_jor" element={<G_jor />} />
        <Route path="/Linear-algebra/matrix" element={<Matrix />} />
        <Route path="/Linear-algebra/lu" element={<Lu />} />
        <Route path="/Linear-algebra/jacobi" element={<Jacobi />} />
        <Route path="/Linear-algebra/conju" element={<Conju />} />

        <Route path="/Interpolation/Interpolation" element={<Interpolation />} />
        <Route path="/Interpolation/Newtondiff" element={<Newtondiff />} />
        <Route path="/Interpolation/Lagrange" element={<Lagrange />} />
        <Route path="/Interpolation/Spline" element={<Spline />} />


        <Route path="/Exterpolation/Exterpolation" element={<Exterpolation />} />


      </Routes>
    </BrowserRouter>
  </StrictMode>
);
