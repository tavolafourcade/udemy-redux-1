import React from 'react'

//hooks react redux
//useDispatch: allows us to consume the action
//useSelector: allows us to read the array of dataInicial
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAccion } from '../redux/pokeDucks'

const Pokemones = () => {
    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.array)
    console.log(pokemones)
    return (
        <div>
            Lista de Pokemones
            <button onClick={()=> dispatch(obtenerPokemonesAccion())}>Get Pokemones</button>
            <ul>
                {
                    pokemones.map(pokemon => <li key={pokemon.name}>{pokemon.name}</li>)
                }
            </ul>
        </div>
    )
}

export default Pokemones
