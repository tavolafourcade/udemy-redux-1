// data inicial
const dataInicial = {
    loading: false,
    activo: false
}
// types
const LOADING = 'LOADING'

// reducer
export default function usuarioReducer (state = dataInicial, action){
    switch(action.type){
        case LOADING;
            return {...state, loading: true}
        default:
            return {...state}
    }
}

// action
// async porque es una solicitud a BD
export const ingresoUsuarioAccion = () => (dispatch) => {
    dispatch({
        type: LOADING,

    })
    try {

    } catch(errror){

    }
}