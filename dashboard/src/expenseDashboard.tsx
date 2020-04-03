import React, { useState } from 'react'
// import React, { useEffect, useState } from 'react'
import './App.css'

export default (): JSX.Element => {
  // const [data, setData] = useState()
  // const [dataAggregate, setDataAggregate] = useState()
  const [refreshData, setRefreshData] = useState(0)

  // useEffect(() => {
  //   // const getData = async (): Promise<any> => {
  //   //   const res = await fetch(`http://localhost:3000/expense`)
  //   //   const data = await res.json()
  //   //   setData(data)
  //   // }

  //   const getDataAggregate = async (): Promise<any> => {
  //     const res = await fetch(`http://localhost:3000/expenseAggregate`)
  //     const data = await res.json()
  //     setDataAggregate(data)
  //   }

  //   getDataAggregate()
  // }, [refreshData])

  const getExpensesForMonth = async (): Promise<any> => {
    // const res = await fetch(`http://localhost:3000/expensesByMonth/${new Date().toISOString()}`)
    const res = await fetch(`http://localhost:3000/a`)
    const data = await res.json()
    console.log('here they are')
    console.log(data)
  }

  return (
    <div>
      <h2>Expenses</h2>
      <button onClick={() => setRefreshData(refreshData + 1)}> Refresh Data</button>
      {/* {data && JSON.stringify(data, null, 2)} */}
      {/* {dataAggregate && JSON.stringify(dataAggregate, null, 2)} */}

      <button onClick={() => getExpensesForMonth()}> Expenses for Month</button>
    </div>
  )
}
