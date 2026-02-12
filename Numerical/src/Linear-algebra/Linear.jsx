function Linear (){
    return(
        <>
            <h1>Linear algebra equation</h1>
            <h2>Choose Again</h2>
            
            <ul 
                style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/Cramer"> <h2>Cramer's Rule</h2></a></li>
                <li><a href="/g-eli"> <h2>Guass Elimination Methods</h2></a></li>
                <li><a href="/g-jor"> <h2>Guass Jordan Methods</h2></a></li>
                <li><a href="/matrix-i"> <h2>Matrix inversion</h2></a></li>
                <li><a href="/lu"> <h2>LU decomposition method</h2></a></li>
                <li><a href="/jacobi"> <h2>Jacobi iteration method</h2></a></li>
                <li><a href="/conju"> <h2>Conjugate gradient method</h2></a></li>

            </ul>
        </>
        

    )
}
export default Linear;