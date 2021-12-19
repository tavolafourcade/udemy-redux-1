// constantes
import axios from 'axios'
const dataInicial = {
    array: []
}

// types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
// reducer
export default function pokeReducer(state =dataInicial, action){
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
        // Sending the list of pokemons to the State using the reducer
            return {...state, action.payload}
            break;
    
        default:
            return state
    }
}
// actions
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
    dispatch({
        type: OBTENER_POKEMONES_EXITO,
        payload: res.data.results
    })
)
} catch (error) {
    console.log(error)
}
}