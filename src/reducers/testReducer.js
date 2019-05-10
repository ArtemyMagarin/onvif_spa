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
        return { ...state, tests, currIndex, testInProgress: true }
      }
      return state
    }

    case "CLOSE_TEST":
      return {...state, currIndex: 0, testInProgress: false}

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

    default: {
      return state
    }
  }
}
