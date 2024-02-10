import React, { useContext } from 'react'
import skull from "../assets/skull-svgrepo-com.svg"
import coin from "../assets/coin-svgrepo-com.svg"
// import coin from "../assets/btc_coin.png"
import { TowerContext } from "../TowerProvider"
import gameOverFile from '../assets/GameOver.wav';
import coinClickFile from '../assets/CoinClick.wav';
import cashoutFile from '../assets/Cashout.wav';
import { winningLength } from "../constants"

const TowerRow = ({ item, appendTowerRow, disabled, shuffle, disableBackground, setDisableBackground, className, setGameOver, setGameWon }) => {

  const { gameActive, setGameActive, tower } = useContext(TowerContext)

  const shuffleArray = (array) => {
    for (let i = array?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const gameOverAudio = new Audio(gameOverFile);
  const coinClickAudio = new Audio(coinClickFile);
  const cashoutAudio = new Audio(cashoutFile);

  console.log("gameActive =", gameActive)

  const shuffledTowerRow = shuffle ? shuffleArray(item) : item;

  const selectBoxHandler = (item, index) => {
    const updatedItem = { ...item, selected: true }

    const updatedTower = [...shuffledTowerRow]
    updatedTower.splice(index, 1, updatedItem)

    if (disabled) {
      const element = document.getElementById("play-btn")
      if (element) {
        element.classList.add("play-animation")
        setTimeout(() => {
          element.classList.remove("play-animation")
        }, 500);
      }
      return;
    }
    if (item.label !== "skull") {
      console.log("tower =", tower)
      if (tower?.length === winningLength - 1) {
        cashoutAudio.play()
        setGameActive({
          ...gameActive,
          active: false
        })
        setDisableBackground(false)
        setGameOver(true)
        setGameWon(true)
      } else {
        coinClickAudio.play()
      }
      appendTowerRow(updatedTower)
    } else {
      gameOverAudio.play();
      appendTowerRow(updatedTower)
      setGameActive({
        ...gameActive,
        active: false
      })
      setDisableBackground(false)
      setGameOver(true)
    }
  }

  if (shuffle) {
    return (
      <div className="tower-row">
        {shuffledTowerRow?.map((item, index) => {
          return (
            <button key={index} className={className} onClick={() => selectBoxHandler(item, index)}>
              {((disabled && !shuffle) || !disableBackground) && (
                <img src={item.label === "skull" ? skull : coin} alt="" />
              )}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="tower-row">
      {shuffledTowerRow?.map((item, index) => {
        return (
          <button key={index} className={item.label === "skull" ? `${className} skull ${item.selected ? "active-skull" : ""}` : `${className} coin ${item.selected ? "active-coin" : ""}`} onClick={() => selectBoxHandler(item, index)}>
            {(disabled && !shuffle) ? (
              <img src={item.label === "skull" ? skull : coin} alt="" />
            ) : item.label}
          </button>
        )
      })}
    </div>
  )
}

export default TowerRow