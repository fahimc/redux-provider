function people(state = {
    peopleList: [],
}, action) {
    switch (action.type) {
        case 'CREATE_PERSON':
            return {
                ...state,
                peopleList: [...state.peopleList, action.person]
            }
        case 'UPDATE_PERSON':
            let peopleList = state.peopleList.filter(item => item.email !== action.person.email);
            peopleList.push(action.person)
            return {
                ...state,
                peopleList
            }
        default:
            return state
    }
}

window.store = Redux.createStore(people);