import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actualizarUsuarioAccion } from '../redux/usuarioDucks'

const Perfil = () => {
    const usuario = useSelector(store => store.usuario.user)
    //We're going to save into the state what the user writes in the input field
    const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = useState(false)

    const dispatch = useDispatch()
    const actualizarUsuario = () => {
        dispatch(actualizarUsuarioAccion('Octaviood'))
    }

    console.log('Usuario using useSelector', usuario)

    return (
        <div className='mt-5 text-center'>
            <div className='card'>
                <div className="card-body">
                    <img src={usuario.photoURL} alt="" className='img-fluid'/>
                    <h5 className='card-title'>Nombre: {usuario.displayName}</h5>
                    <p className='card-text'>Email: {usuario.email}</p>
                    <button className='btn btn-dark' onClick={()=>setActivarFormulario(true)}>
                        Editar nombre
                    </button>
                </div>
                {
                    activarFormulario && (
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-md-5">
                                    <div className="input-group mb-3">
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            value={nombreUsuario} 
                                            onChange={e => setNombreUsuario(e.target.value)}                                    
                                        />
                                        <div className="input-group-append">
                                            <button 
                                                className="btn btn-dark" 
                                                type="button" 
                                                onClick={()=> actualizarUsuario()}
                                            >
                                                Actualizar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Perfil
