const initialState = {
    status: "idle" as StatusType,
    // status: "loading",
    error: null as string | null
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

export type  InitialStateType = typeof initialState
export type StatusType = "idle" | "success" | "loading" | "failed"
export type ErrorType = string | null

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type AppActionsType = SetAppStatusActionType
    | SetAppErrorActionType

