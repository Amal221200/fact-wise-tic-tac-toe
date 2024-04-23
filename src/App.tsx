import { useCallback, useState } from 'react'
import './App.css'
import Box from './components/Box'
import { chanceType } from './utils/types';
import { blocks, winners } from './utils/constants';



function App() {
  const [chance, setChance] = useState<chanceType>('X')
  const [selected, setSelected] = useState<Record<chanceType, Set<number>>>({ X: new Set(), O: new Set() });
  const [winner, setWinner] = useState<null | { user: chanceType | 'Draw', selectedBoxes?: Set<number> }>(null);

  const checkWinner = useCallback((chance: chanceType, index: number) => {
    if (selected[chance].size < 2) {
      return
    }

    if ((selected.X.size + selected.O.size === 8)) {
      setWinner({ user: 'Draw' })
    }

    const selectedC = Array.from([...selected[chance], index]).sort()

    for (const w of winners) {
      if (w.every((el) => selectedC.includes(el))) {
        setWinner({ user: chance, selectedBoxes: new Set(w) })
        return
      }
    }
  }, [selected])

  const handeClick = useCallback((user: null | chanceType, index: number) => {
    if (user || winner) {
      return user
    }

    checkWinner(chance, index)
    setSelected((current) => ({ ...current, [chance]: new Set([...current[chance], index]) }))
    setChance(current => current === 'X' ? 'O' : 'X')
    return chance === 'X' ? 'X' : 'O'
  }, [chance, checkWinner, winner])


  return (
    <>
      <div className="App">
        {
          blocks.map((_, i) => (
            <Box key={i} onClick={handeClick} index={i} winnerBoxes={winner?.selectedBoxes} />
          ))
        }
      </div>

      {winner && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBlockStart: '10px' }}>
          <h2>{winner.user} {winner.user === "Draw" ? "! no one won this round" : "is the winner"}</h2> <button type="button" onClick={() => location.reload()}>Reset</button>
        </div>
      )}
    </>
  )
}

export default App
