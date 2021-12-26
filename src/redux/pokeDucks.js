// constantes
import axios from 'axios'
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}

// types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO'

// reducer
export default function pokeReducer(state =dataInicial, action){
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
        // Sending the list of pokemons to the State using the reducer
        // With ...action.payload we're getting out the properties of the object
            return {...state, ...action.payload}
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case ANTERIOR_POKEMONES_EXITO:
            return {...state, ...action.payload}
        default:
            return state
    }
}
// actions
// dispatch activates the reducer
// getState obtains initial data
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    //console.log('getState',getState().pokemones.offset)
    //const offset = getState().pokemones.offset
    //another form of doing the same
    //const { offset } = getState().pokemones
    if (localStorage.getItem('offset=0')) {
        console.log('Datos guardados de la API')
        console.log('datos guardados')
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }

    try {
        console.log('datos desde la api')
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
        console.log(res.data)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem('offset=0', JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const siguientePokemonAccion = () => async (dispatch, getState) => {
    // const offset = getState().pokemones.offset
    // const siguiente = offset + 20

    const next = getState().pokemones.next
    // If next exists don't require it to the API
    if (localStorage.getItem(next)) {
        console.log('Datos guardados de la API de NEXT')

        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }
    try {
        console.log('datos desde NEXT')
        const res = await axios.get(next)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(next, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}


export const anteriorPokemonAccion = () => async (dispatch, getState) => {
    // const offset = getState().pokemones.offset
    // const siguiente = offset + 20
    const { previous } = getState().pokemones
    // If previous exists don't require it to the API
    if (localStorage.getItem(previous)) {
        console.log('Datos guardados de la API de PREVIOUS')

        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }

    try {
        const res = await axios.get(previous)
        dispatch({
            type: ANTERIOR_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}