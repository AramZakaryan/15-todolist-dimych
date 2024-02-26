const initialState: InitialStateType = {
    status: "idle",
    // status: "loading",
    error: null
    // error: "vay vay"

}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType)
    : InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS": {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}


// actions
export const setStatusAC = (status: StatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setErrorAC = (error: ErrorType) => ({type: "APP/SET-ERROR", error} as const)

// types

export type StatusType = "idle" | "success" | "loading" | "faild"
export type ErrorType = string | null

export type InitialStateType = {
    status: StatusType
    error: ErrorType
}

export type SetStatusActionType = ReturnType<typeof setStatusAC>;
export type SetErrorActionType = ReturnType<typeof setErrorAC>;
export type AppActionsType = SetStatusActionType
    | SetErrorActionType

