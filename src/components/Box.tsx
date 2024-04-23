import { useCallback, useState } from 'react'
import { chanceType } from '../utils/types'

interface BoxProps {
    onClick: (user: null | chanceType, index: number) => chanceType | null, index: number,
    winnerBoxes: Set<number> | undefined
}

const Box = ({ onClick, index, winnerBoxes }: BoxProps) => {

    const [user, setUser] = useState<null | chanceType>(null)

    const handleClick = () => {
        setUser(onClick(user, index))
    }

    const check = useCallback(() => {
        if (!winnerBoxes) {
            return
        }
        return winnerBoxes.has(index)
    }, [index, winnerBoxes])


    return (
        <div className='box' style={{ background: check() ? 'rgba(205 205 205 / 0.2)' : 'initial', cursor: (winnerBoxes || user) ? 'not-allowed' : 'pointer' }} onClick={handleClick}>
            <span className='user'>{user}</span>
        </div>
    )
}

export default Box