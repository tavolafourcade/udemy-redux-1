import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { pokeDetalleAccion } from '../redux/pokeDucks'
const Detalle = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = () => {
            dispatch(pokeDetalleAccion())
        }
        fetchData()
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemones.detallePokemon)
    console.log('POKEMON DE detalle.jsx',pokemon)
    return pokemon ? (
        <div className='card mt-4 text-center'>
            <div className="card-body">
                <img src={pokemon.foto} className='img-fluid' alt='pokemon'/>
                <div className="card-title text-uppercase">{pokemon.nombre}</div>
                <p className='card-text'>Alto: {pokemon.alto} | Peso: {pokemon.peso}</p>
            </div>
        </div>
    ) : null
}

export default Detalle
