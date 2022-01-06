import React from 'react'
import { useSelector } from 'react-redux'

const Perfil = () => {
    const usuario = useSelector(store => store.usuario.user)
    console.log('Usuario using useSelector', usuario)
    return (
        <div className='mt-5 text-center'>
            <div className='card'>
                <div className="card-body">
                    <img src={usuario.photoURL} alt="" className='img-fluid'/>
                    <h5 className='card-title'>Nombre: {usuario.displayName}</h5>
                    <p className='card-text'>Email: {usuario.email}</p>
                    <button className='btn btn-dark'>
                        Editar nombre
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Perfil
