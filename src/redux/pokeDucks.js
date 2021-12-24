// constantes
import axios from 'axios'
const dataInicial = {
    array: [],
    offset: 0
}

// types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'

// reducer
export default function pokeReducer(state =dataInicial, action){
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
        // Sending the list of pokemons to the State using the reducer
            return {...state, array: action.payload}
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, array: action.payload.array, offset: action.payload.offset}
        default:
            return state
    }
}
// actions
// dispatch activates the reducer
// getState obtains initial data
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    //console.log('getState',getState().pokemones.offset)
    const offset = getState().pokemones.offset
    //another form of doing the same
    //const { offset } = getState().pokemones

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error)
    }
}

export const siguientePokemonAccion = () => async (dispatch, getState) => {
    const offset = getState().pokemones.offset
    const siguiente = offset + 20
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: {
                array: res.data.results,
                offset: siguiente
            }
        })
    } catch (error) {
        console.log(error)
    }
}