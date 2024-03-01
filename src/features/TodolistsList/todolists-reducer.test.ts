import {
    TodolistsActionsType,
    changeTodolistEntityStatusAC,
    EntityStatusType,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";

let initialState: TodolistDomainType[]
beforeEach(() => {
    initialState = [
        {
            id: "tl1",
            title: "ddd",
            addedDate: "2024-02-27T11:30:28.7",
            order: -7,
            filter: "all",
            entityStatus: "idle"
        },
        {
            id: "tl2",
            title: "tdl111",
            addedDate: "2024-02-05T09:37:25.323",
            order: -6,
            filter: "all",
            entityStatus: "idle"
        }
    ]
})

test("Correct todolist's entityStatus should be set", () => {

    // DATA
    const todolistId:string = initialState[1].id
    const newEntityStatus: EntityStatusType ="loading"
    const action: TodolistsActionsType = changeTodolistEntityStatusAC(todolistId,newEntityStatus)

    // ACTIONS
    const finalState = todolistsReducer(initialState, action)

    // EXPECTATIONS
    expect(finalState[0].entityStatus).toBe(initialState[0].entityStatus)
    expect(finalState[1].entityStatus).toBe(newEntityStatus)


})