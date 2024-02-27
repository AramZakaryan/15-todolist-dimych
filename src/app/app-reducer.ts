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
export const setAppStatusAC = (status: StatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: ErrorType) => ({type: "APP/SET-ERROR", error} as const)

// types

export type StatusType = "idle" | "success" | "loading" | "failed"
export type ErrorType = string | null

export type InitialStateType = {
    status: StatusType
    error: ErrorType
}

export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetErrorActionType = ReturnType<typeof setAppErrorAC>;
export type AppActionsType = SetStatusActionType
    | SetErrorActionType

