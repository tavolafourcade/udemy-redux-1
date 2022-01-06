import { auth, firebase, db } from '../firebase'
// data inicial
const dataInicial = {
    loading: false,
    activo: false
}
// types
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SESION = 'CERRAR_SESION'

// reducer
export default function usuarioReducer (state = dataInicial, action){
    switch(action.type) {
        case LOADING:
            return {...state, loading: true}
        case USUARIO_ERROR:
            return {...dataInicial}
        case USUARIO_EXITO:
            return {...state, loading:false, user: action.payload, activo: true}
        case CERRAR_SESION:
            return {...dataInicial}
        default:
            return {...state}
    }
}

// action
// async porque es una solicitud a BD
// Hacemos el dispatch con loading, 
// Luego logueamos al usuario con Google,
// Luego hacemos un dispatch de la respuesta del usuario obteniendo su uid y email.
export const ingresoUsuarioAccion = () => async(dispatch) => {
    dispatch({
        type: LOADING,

    })
    try {
        //Using gmail to auth
        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await auth.signInWithPopup(provider)
        console.log('INGRESO USUARIO ACCION ', res)
        console.log('RES.USER', res.user)

        const usuario = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        }

        // Vamos a guardar al usuario nuevo en la BD
        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()
        if(usuarioDB.exists){
            // When user exists in Firestore we don't need to store it, se send the usuarioDB with its data
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
        }else{
            // When user doesn't exist in Firestore
            await db.collection('usuarios').doc(usuario.email).set(usuario)
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: usuario
        })
        // Guardamos al usuario con lo que viene directamente desde Google.
        localStorage.setItem('usuario', JSON.stringify(usuario))

    } catch(errror){
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

//When we refresh the site we want our user to be active
//The user should be deleted when the session is closed
export const leerUsuarioActivoAccion = () => (dispatch) => {
    if(localStorage.getItem('usuario')){
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }
}

export const cerrarSesionAccion = () => (dispatch) => {
    //Sign out using Google
    auth.signOut()
    // Removing the user from local Storage
    localStorage.removeItem('usuario')
    dispatch({
        type: CERRAR_SESION
    })
}