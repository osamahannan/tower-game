import React, { useContext } from 'react'
import TowerRow from './TowerRow'
import { easyLevel, mediumLevel, hardLevel } from "../constants"
import { TowerContext } from "../TowerProvider"

const TowerPanel = ({ gameOver, setGameOver }) => {

  const { level, gameActive, setGameActive, tower, setTower, showModal, setShowModal, disableBackground, setDisableBackground, setGameWon, gameWon, stakePrize } = useContext(TowerContext)


  const getInitalTower = () => {
    if (level === "easy") {
      return easyLevel;
    } else if (level === "hard") {
      return hardLevel;
    } else {
      return mediumLevel
    }
  }

  const rowToAppend = getInitalTower()

  const appendTowerRow = (towerRow) => {
    setTower([[...towerRow], ...tower])
    setGameActive({
      ...gameActive,
      index: gameActive.index + 1
    })
  }

  return (
    <div className='tower-container'>
      <h4>MAX PAYOUT x73.33</h4>
      <div className={gameOver ? "tower-box gameOver" : "tower-box"}>
        <div className="shadow-top"></div>
        <div className="tower-box-container">
          {!gameWon && (
            <>
              <TowerRow
                item={rowToAppend}
                appendTowerRow={(shuffledTowerRow) => appendTowerRow(shuffledTowerRow)}
                shuffle
                disabled
                disableBackground={disableBackground}
                setDisableBackground={setDisableBackground}
                className="box disable"
              />
              <TowerRow
                item={rowToAppend}
                appendTowerRow={(shuffledTowerRow) => appendTowerRow(shuffledTowerRow)}
                shuffle
                disabled
                disableBackground={disableBackground}
                setDisableBackground={setDisableBackground}
                className="box disable"
              />
            </>
          )}
          {!gameOver && (
            <TowerRow
              item={rowToAppend}
              appendTowerRow={(shuffledTowerRow) => appendTowerRow(shuffledTowerRow)}
              shuffle
              disabled={!gameActive?.active}
              disableBackground={disableBackground}
              setDisableBackground={setDisableBackground}
              className={gameActive?.active ? "box" : "box disable-bg-active"}
              setGameOver={setGameOver}
              setGameWon={setGameWon}
              gameWon={gameWon}
            />
          )}
          {tower?.length > 0 && tower?.map((item, idx) => {
            return (
              <TowerRow key={idx} item={item} appendTowerRow={(shuffledTowerRow) => appendTowerRow(shuffledTowerRow)} disabled className="box" />
            )
          })}
        </div>
        <div className="shadow-bottom"></div>
        {gameOver && !showModal && !gameWon && (
          <div className="Game-over">
            <span>GAME OVER. TRY AGAIN.</span>
          </div>
        )}
        <i className="arrow arrow-right"></i>
        <i className="arrow arrow-left"></i>
        {showModal && (
          <div className="modal" onClick={() => setShowModal(false)}>
            <span>+{stakePrize}</span>
            <span>+$0.00</span>
            <span>x2.3230</span>
          </div>
        )}
        {gameWon && (
          <div className="modal" onClick={() => setGameWon(false)}>
            <span>YOU WON</span>
            <span>+{stakePrize}</span>
            <span>+$0.00</span>
            <span>x73.33</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TowerPanel