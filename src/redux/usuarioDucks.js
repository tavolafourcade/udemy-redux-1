import { auth, firebase } from '../firebase'
// data inicial
const dataInicial = {
    loading: false,
    activo: false
}
// types
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'

// reducer
export default function usuarioReducer (state = dataInicial, action){
    switch(action.type) {
        case LOADING:
            return {...state, loading: true}
        case USUARIO_ERROR:
            return {...dataInicial}
        case USUARIO_EXITO:
            return {...state, loading:false, user: action.payload}
        default:
            return {...state}
    }
}

// action
// async porque es una solicitud a BD
export const ingresoUsuarioAccion = () => async(dispatch) => {
    dispatch({
        type: LOADING,

    })
    try {
        //Using gmail to auth
        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await auth.signInWithPopup(provider)
        console.log('INGRESO USUARIO ACCION ', res)

        dispatch({
            type: USUARIO_EXITO,
            payload: {
                uid: res.user.uid,
                email: res.user.email
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            uid: res.user.uid,
            email: res.user.email
        }))

    } catch(errror){
        dispatch({
            type: USUARIO_ERROR
        })
    }
}