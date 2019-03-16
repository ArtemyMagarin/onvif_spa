const initialState = {
	list,
    currentDevice,
    currentTest: {
        testInProgress: false,
        tests: [
            {
                name: "",
                service: "",
                pending: false,
                error: false,
                data: {}
            }
        ]
    }
}

export default function testReducer(state = initialState, action) {

  	switch (action.type) {

  		case "SINGLE_TEST": {
  			if (action.data) {

                const curr_test = state.current_test.tests.filter(item => 
                    data.response.name === item.name && data.response.service === item.service
                )

                const updated_test = {
                    ...curr_test,
                    pending: false,
                    error: false,
                    data: action.data
                } 

                const index =  state.current_test.tests.indexOf(curr_test);

                return { ...state, current_test: { ...current_test, tests:
                [ ...state.current_test.tests.slice(0, index), updated_test,
                ...state.current_test.tests.slice(index+1) ] } }
  			}
  			break;
          }
          
  		case "SINGLE_TEST__PENDING": {

  			if (action.data) {

                const curr_test = state.current_test.tests.filter(item => 
                    data.response.name === item.name && data.response.service === item.service
                )
                
                const updated_test = {
                    ...curr_test,
                    pending: true,
                    error: false,
                    data: action.data
                } 

                const index =  state.current_test.tests.indexOf(curr_test);

                return { ...state, current_test: { ...current_test, tests:
                [ ...state.current_test.tests.slice(0, index), updated_test,
                ...state.current_test.tests.slice(index+1) ] } }
  			}
  			break;
          }

  		case "SINGLE_TEST__ERROR": {
              
            if (action.data) {

              const curr_test = state.current_test.tests.filter(item => 
                  data.response.name === item.name && data.response.service === item.service
              )
              
              const updated_test = {
                  ...curr_test,
                  pending: false,
                  error: true,
                  data: action.data
              } 

              const index =  state.current_test.tests.indexOf(curr_test);

              return { ...state, current_test: { ...current_test, tests:
              [ ...state.current_test.tests.slice(0, index), updated_test,
              ...state.current_test.tests.slice(index+1) ] } }
            }
            break;
        }

        case "START_TEST": {
    
            if (action.data) {
                return {...state, currentTest: { 
                    testInProgress: true,
                    tests: action.data.map(item => ({
                        name: item.name,
                        service: item.service,
                        pending: false,
                        error: false,
                        data:{}}))
                    }
                }

            }
            break;
        }
          
  		default: {
  			return state;
  		}
  	}
}