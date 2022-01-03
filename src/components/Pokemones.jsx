import React from 'react'
import Detalle from './Detalle'
//hooks react redux
//useDispatch: allows us to consume the action
//useSelector: allows us to read the array of dataInicial
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAccion, siguientePokemonAccion, anteriorPokemonAccion, pokeDetalleAccion } from '../redux/pokeDucks'

const Pokemones = () => {
    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)
    console.log('POKEMONES',pokemones)
    return (
        <div className='row mt-5'>
            <div className="col-md-6">
                <h3>Lista de Pokemones</h3>
                <ul className='list-group mt-4'>
                    {
                        pokemones.map(pokemon => (
                            <li
                                key={pokemon.name}
                                className='list-group-item text-uppercase'>
                                {pokemon.name}
                                <button className='btn btn-dark btn-sm float-end' 
                                        onClick={()=> dispatch(pokeDetalleAccion(pokemon.url))}>
                                    Info
                                </button>
                            </li>
                            ))
                    }
                </ul>
                <div className='d-flex justify-content-between mt-4 mb-5'>
                    {
                        pokemones.length === 0 &&
                        <button onClick={()=> dispatch(obtenerPokemonesAccion())} className='btn btn-dark'>Get Pokemones</button>
                    }
                    {
                        previous &&
                        <button onClick={()=> dispatch(anteriorPokemonAccion())} className='btn btn-dark'>Anterior</button>
                    }
                    {   
                        next &&
                        <button onClick={()=> dispatch(siguientePokemonAccion())} className='btn btn-dark'>Siguiente</button>
                    }
                </div>
            </div>
            <div className="col-md-6">
                <h3>Detalle Pokemon</h3>
                <Detalle/>
            </div>
            
        </div>
    )
}

export default Pokemones
