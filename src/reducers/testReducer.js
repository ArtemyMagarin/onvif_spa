const initialState = {
  tests: [],
  currIndex: 0,
  done: false,
  testInProgress: false,
}


export default function testReducer(state=initialState, action) {
  switch (action.type) {
    case "INIT_TESTS": {
      if (action.data) {
        const tests = action.data.map(item => ({
          ...item, 
          pending: false, 
          error: false,
          data: {},
        }))
        const currIndex = 0;
        return { ...state, tests, done: false, currIndex, testInProgress: true }
      }
      return state
    }

    case "CLOSE_TEST":
      return {...state, currIndex: 0, done: false, testInProgress: false}

    case "NEXT_TEST":
      return {...state, currIndex: state.currIndex+1}

    case "RUN_TEST": {
      if (action.data) {
        let tests = [...state.tests]
        const updated_test = {
          ...tests[state.currIndex],
          pending: false,
          error: false,
          data: {...action.data.response}
        }
        tests[state.currIndex] = updated_test
        // if interactive, go next test manually
        const currIndex = ~updated_test.name.indexOf('Interactive') ? state.currIndex : state.currIndex+1
        return {...state, tests, currIndex, done: state.currIndex >= tests.length-1 }
      }
      return state
    }

    case "RUN_TEST__PENDING": {
      let tests = [...state.tests]
      const updated_test = {
        ...state.tests[state.currIndex],
        pending: true,
      }
      tests.splice(state.currIndex, 1, updated_test)
      return {...state, tests }
    }

    case "RUN_TEST__ERROR": {
      let tests = [...state.tests]
      const updated_test = {
        ...state.tests[state.currIndex],
        pending: false,
        error: true,
        data: {...action.data.response}
      }
      tests.splice(state.currIndex, 1, updated_test)
      // if interactive, go next test manually
      const currIndex = ~updated_test.name.indexOf('Interactive') ? state.currIndex : state.currIndex+1
      return {...state, tests, currIndex, done: state.currIndex >= tests.length-1 }
    }

    case 'RESOLVE_TEST_MANUALLY': {
      if (!state.tests[action.data.index].pending) {
        let tests = [...state.tests]
        const result = {...state.tests[action.data.index].data.result, supported: action.data.resolution}
        
        const updated_test = {
          ...state.tests[action.data.index],
          pending: false,
          error: false,
          data: {...state.tests[action.data.index].data, result}
        }
        tests.splice(action.data.index, 1, updated_test)
        return {...state, tests }
      }
      return state
    }

    default: {
      return state
    }
  }
}
