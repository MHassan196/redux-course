import React from 'react'

function Bonus({incrementBonus, points}) {

   

  return (
    <div className='card'>
    <div className="container">
        <h4>
            <b>Bonus Component</b>
        </h4>
        <h3>Total Points : ${points.value}</h3>

        <button onClick={incrementBonus}>Increment +</button>
    </div>
    </div>
  )
}

export default Bonus
