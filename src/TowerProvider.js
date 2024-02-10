import React, { createContext, useState } from 'react'

export const TowerContext = createContext({})

const TowerProvider = ({ children }) => {

  const [level, setLevel] = useState("medium")
  const [gameActive, setGameActive] = useState({
    active: false,
    index: 0
  })
  const [tower, setTower] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [disableBackground, setDisableBackground] = useState(true)

  return (
    <TowerContext.Provider
      value={{ level, setLevel, gameActive, setGameActive, tower, setTower, showModal, setShowModal, disableBackground, setDisableBackground }}
    >
      {children}
    </TowerContext.Provider>
  )
}

export default TowerProvider