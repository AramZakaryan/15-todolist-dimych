import {AppActionsType, appReducer, setAppErrorAC, InitialStateType, setAppStatusAC, ErrorType, StatusType} from "./app-reducer";


let initialState: InitialStateType

beforeEach(() => {

    initialState = {
        appStatus: "idle",
        error: null
    }

})

test("Correct error message should be set", () => {

    // DATA


    // ACTIONS
    const errorMessage: ErrorType = "some error"
    const action: AppActionsType = setAppErrorAC(errorMessage)
    const endState = appReducer(initialState, action)

    // EXPECTATIONS
    expect(endState.error).toBe(errorMessage)

})


test("Correct status state should be set", () => {

    // DATA


    // ACTIONS
    const statusState: StatusType = "success"
    const action: AppActionsType = setAppStatusAC(statusState)
    const endState = appReducer(initialState, action)

    // EXPECTATIONS
    expect(endState.appStatus).toBe(statusState)

})