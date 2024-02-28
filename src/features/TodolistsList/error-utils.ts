import {ResponseType, TaskType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {ActionsType} from "./tasks-reducer";

export function handleAppError(messages: ResponseType["messages"], dispatch: Dispatch<AppActionsType>) {
    if (messages.length) {
        dispatch(setAppErrorAC(messages[0]))
    } else {
        (dispatch(setAppErrorAC("unknown error occurred"))
        )
    }
    dispatch(setAppStatusAC("failed"))
}

export function handleNetError(message: string, dispatch: Dispatch) {
    dispatch(setAppErrorAC(message ??= "Some error occurred."))
    dispatch(setAppStatusAC("failed"))

}
