import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppActionsType, setAppStatusAC} from "../../app/app-reducer";
import {handleAppError, handleNetError} from "../../utils/error-utils";

import {RESULT_CODE} from "../../types/types";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType)
    : Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "TODOLISTS/CHANGE_TODOLIST_STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.todolistStatus} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        default:
            return state
    }
}


// actions

export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id} as const)

export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)

export const changeTodolistEntityStatusAC = (id: string, todolistStatus: EntityStatusType) => ({
    type: 'TODOLISTS/CHANGE_TODOLIST_STATUS',
    id,
    todolistStatus
} as const)

export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)


// thunks

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<TodolistsActionsType | AppActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC("success"))
            })
            .catch(err => handleNetError(err.message, dispatch))

    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<TodolistsActionsType | AppActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setAppStatusAC("success"))
                } else {
                    handleAppError(res.data.messages, dispatch)
                }
            })
            .catch(err => handleNetError(err.message, dispatch))

    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<TodolistsActionsType | AppActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC("success"))
                } else {
                    handleAppError(res.data.messages, dispatch)
                }
            })
            .catch(err => handleNetError(err.message, dispatch))

    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<TodolistsActionsType | AppActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                    dispatch(changeTodolistTitleAC(id, title))
                    dispatch(setAppStatusAC("success"))
                } else {
                    handleAppError(res.data.messages, dispatch)
                }
            })
            .catch(err => handleNetError(err.message, dispatch))

    }
}


let source1: unknown

let result1 = (source1 as string).length




const showMessages = <D>(messages: Array<D>): { firstMessageText: D } => {
    return {firstMessageText: messages[0]}
}

const res = showMessages<string>(["gago", "valo"])


// types

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | SetTodolistsActionType
export type FilterValuesType = 'all' | 'active' | 'completed';
export type EntityStatusType = "idle" | "success" | "loading" | "failed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: EntityStatusType
}
