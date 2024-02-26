import {AppActionsType, appReducer, setErrorAC, InitialStateType, setStatusAC, ErrorType, StatusType} from "./app-reducer";


let initialState: InitialStateType

beforeEach(() => {

    initialState = {
        status: "idle",
        error: null
    }

})

test("Correct error message should be set", () => {

    // DATA


    // ACTIONS
    const errorMessage: ErrorType = "some error"
    const action: AppActionsType = setErrorAC(errorMessage)
    const endState = appReducer(initialState, action)

    // EXPECTATIONS
    expect(endState.error).toBe(errorMessage)

})


test("Correct status state should be set", () => {

    // DATA


    // ACTIONS
    const statusState: StatusType = "success"
    const action: AppActionsType = setStatusAC(statusState)
    const endState = appReducer(initialState, action)

    // EXPECTATIONS
    expect(endState.status).toBe(statusState)

})