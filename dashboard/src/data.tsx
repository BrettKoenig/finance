import React, { useEffect, useState } from 'react'
import './App.css'

export default (props: DataProps): JSX.Element => {
  const { name } = props
  const [data, setData] = useState()
  const [dataAggregate, setDataAggregate] = useState()

  useEffect(() => {
    const getData = async (): Promise<any> => {
      const res = await fetch(`http://localhost:3000/${name}`)
      const data = await res.json()
      setData(data)
    }
    
    const getDataAggregate = async (): Promise<any> => {
      const res = await fetch(`http://localhost:3000/${name}Aggregate`)
      const data = await res.json()
      setDataAggregate(data)
    }

    getData()
    getDataAggregate()
  }, [name])

  return (
    <div>
      <h2>{name}</h2>
      {data && JSON.stringify(data, null, 2)}
      {dataAggregate && JSON.stringify(dataAggregate, null, 2)}
    </div>
  )
}

interface DataProps {
  readonly name: string
}
