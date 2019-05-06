import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'

export default function handleMovement(player) {

    function getNewPosition(direction, oldPos) {
        switch (direction) {
            case 'WEST':
                return [oldPos[0] - SPRITE_SIZE, oldPos[1]]
            case 'EAST':
                return [oldPos[0] + SPRITE_SIZE, oldPos[1]]
            case 'NORTH':
                return [oldPos[0], oldPos[1] - SPRITE_SIZE]
            default:
                return [oldPos[0], oldPos[1] + SPRITE_SIZE]

        }

    }

    function observeBoundaries(oldPos, newPos) {
        return (newPos[0] >= 0 && newPos[0] < MAP_WIDTH) &&
            (newPos[1] >= 0 && newPos[1] < MAP_HEIGHT)
    }

    function observeSolidObjects(oldPos, newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        const nextTile = tiles[y][x]

        return nextTile < 6;
    }

    function dispatchMove(newPos) {

        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos
            }
        })
    }

    function attemptMove(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(direction, oldPos);

        if (observeBoundaries(oldPos, newPos) && observeSolidObjects(oldPos, newPos)) {
            dispatchMove(newPos)
        }
    }

    function handleKeyDown(e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 37:
                return attemptMove('WEST');
            case 38:
                return attemptMove('NORTH')
            case 39:
                return attemptMove('EAST');
            case 40:
                return attemptMove('SOUTH')
            default:
                console.log(e.keyCode);
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    return player;
}