import React, { useContext } from 'react'
import { TowerContext } from '../TowerProvider';
// import { easyLevel, mediumLevel, hardLevel } from "../constants"
import cashoutFile from '../assets/Cashout.wav';
import playFile from '../assets/Play.wav';

const ConfigurationPanel = ({ setGameOver }) => {

  const { level, setLevel, gameActive, setGameActive, tower, setShowModal, setTower, setDisableBackground, gameWon, setGameWon, stakePrize, setStakePrize } = useContext(TowerContext)

  const cashoutAudio = new Audio(cashoutFile);
  const playAudio = new Audio(playFile);

  const gameActiveHandler = () => {
    playAudio.play()
    setGameWon(false)
    setTower([])
    setGameActive({
      ...gameActive,
      active: true
    })
    setShowModal(false)
    setGameOver(false)
    setDisableBackground(true)
  }

  const cashoutHandler = () => {
    cashoutAudio.play()
    setShowModal(true)
    setGameOver(true)
    setGameActive({
      ...gameActive,
      active: false
    })
    setDisableBackground(false)
  }

  const handleDecrement = () => {
    if (stakePrize / 2 >= 0.000001) {
      setStakePrize(stakePrize / 2)
    }
  }
  const handleIncrement = () => {
    if (stakePrize * 2 <= 0.000016) {
      setStakePrize(stakePrize * 2)
    }
  }

  return (
    <div className='control-container'>
      <div className="level">
        <button disabled={gameActive?.active} title="hard mode" onClick={() => setLevel("hard")} className={level === "hard" ? "active" : ""}>Hard</button>
        <button disabled={gameActive?.active} title="medium mode" onClick={() => setLevel("medium")} className={level === "medium" ? "active" : ""}>Medium</button>
        <button disabled={gameActive?.active} title="easy mode" onClick={() => setLevel("easy")} className={level === "easy" ? "active" : ""}>Easy</button>
      </div>
      {(tower?.length > 0 || !gameActive?.active) ? (
        (gameActive?.active && !gameWon) ? (
          <button className="cashout" onClick={cashoutHandler}>CASHOUT 0.00000019</button>
        ) : (
          <button id="play-btn" disabled={gameActive?.active && !gameWon} className="play" onClick={gameActiveHandler}>PLAY</button>
        )
      ) : (
        <button id="play-btn" disabled className="pick-tile" onClick={gameActiveHandler}>Pick A Tile</button>
      )}
      <div className="stake">
        <div className="min-max">
          <span onClick={handleDecrement}>-</span>
          <span onClick={() => setStakePrize(0.000001)}>MIN</span>
        </div>
        <div className="stake-input">
          <input type="number" inputMode='decimal' value={stakePrize} onChange={(e) => setStakePrize(e.target.value)} />
          <span>$0.00 STAKE</span>
        </div>
        <div className="min-max">
          <span onClick={handleIncrement}>+</span>
          <span onClick={() => setStakePrize(0.000016)}>MAX</span>
        </div>
      </div>
    </div>
  )
}

export default ConfigurationPanel