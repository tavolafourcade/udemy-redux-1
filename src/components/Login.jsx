import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ingresoUsuarioAccion } from '../redux/usuarioDucks'

const Login = () => {
    const dispatch = useDispatch()
    const loading = useSelector(store => store.usuario.loading)
    return (
        <div className='mt-5 text-center'>
            <h3>Ingreso con Google</h3>
            <hr />
            <button 
                className='btn btn-dark' 
                onClick={()=> dispatch(ingresoUsuarioAccion())}
                disabled={loading}>
                    Acceder
            </button>
        </div>
    )
}

export default Login
