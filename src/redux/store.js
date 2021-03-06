// Always required in the Store
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
 // Always call the reducer of all files created using Ducks
import pokeReducer from './pokeDucks'
import usuarioReducer, {leerUsuarioActivoAccion} from './usuarioDucks'

 // List all the reducer we have in pokeDucks.js
const rootReducer = combineReducers({
    pokemones: pokeReducer,
    usuario: usuarioReducer
})

export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    //Each time the store is refreshed will check if usuario exist.
    leerUsuarioActivoAccion()(store.dispatch)
    return store
}