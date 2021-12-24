import React from 'react'

//hooks react redux
//useDispatch: allows us to consume the action
//useSelector: allows us to read the array of dataInicial
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAccion, siguientePokemonAccion, anteriorPokemonAccion } from '../redux/pokeDucks'

const Pokemones = () => {
    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)
    console.log(pokemones)
    return (
        <div>
            Lista de Pokemones
            {
                pokemones.length === 0 &&
                <button onClick={()=> dispatch(obtenerPokemonesAccion())}>Get Pokemones</button>
            }
            {
                previous &&
                <button onClick={()=> dispatch(anteriorPokemonAccion())}>Anterior</button>
            }
            {   
                next &&
                <button onClick={()=> dispatch(siguientePokemonAccion())}>Siguiente</button>
            }
            <ul>
                {
                    pokemones.map(pokemon => <li key={pokemon.name}>{pokemon.name}</li>)
                }
            </ul>
        </div>
    )
}

export default Pokemones
