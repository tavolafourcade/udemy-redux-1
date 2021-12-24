import React from 'react'

//hooks react redux
//useDispatch: allows us to consume the action
//useSelector: allows us to read the array of dataInicial
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAccion, siguientePokemonAccion } from '../redux/pokeDucks'

const Pokemones = () => {
    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.results)
    console.log(pokemones)
    return (
        <div>
            Lista de Pokemones
            <button onClick={()=> dispatch(obtenerPokemonesAccion())}>Get Pokemones</button>
            <button onClick={()=> dispatch(siguientePokemonAccion())}>Siguiente</button>
            <ul>
                {
                    pokemones.map(pokemon => <li key={pokemon.name}>{pokemon.name}</li>)
                }
            </ul>
        </div>
    )
}

export default Pokemones
