import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cerrarSesionAccion } from '../redux/usuarioDucks'
import {withRouter} from 'react-router-dom'

const NavBar = (props) => {
    const dispatch = useDispatch() 
    const cerrarSesion = () => {
        dispatch(cerrarSesionAccion())
        props.history.push('/login')
    }
    return (
        <div className='navbar navbar-dark bg-dark'>
            <Link className='navbar-brand mx-auto' to='/'>APP Poke</Link>
            <div className="d-flex">
                <NavLink className='btn btn-dark mr-2' to='/' exact>Inicio</NavLink> 
                <NavLink className='btn btn-dark mr-2' to='/login'>Login</NavLink> 
                <button 
                    className='btn btn-dark mr-2'
                    onClick={() => cerrarSesion()}>
                        Cerrar Sesión
                </button>

            </div>
        </div>
    )
}

export default withRouter(NavBar)
