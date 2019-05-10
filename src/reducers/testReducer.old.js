const initialState = {
    currentTest: {
        testInProgress: false,
        tests: [
            // {
            //   name: "",
            //   service: "",
            //   pending: false,
            //   error: false,
            //   data: {}
            // }
        ]
    },
    currIndex: 0,
}

export default function testReducer(state = initialState, action) {

    switch (action.type) {
      
      case "SINGLE_TEST__PENDING": 
        if (action.api) {
            const api_name = action.api.data.test_name.toLowerCase();
            const api_service = action.api.data.test_type.toLowerCase();
            let delIndex;

            const tests = state.currentTest.tests;
            console.log(tests)

            const prevTests = tests.filter((item, index) => {
              const item_name = item.name.toLowerCase();
              const item_service = item.service.toLowerCase();
              const res = !(api_name === item_name && api_service === item_service);
              return res;
            })

            const curr_test = tests.filter((item, index) => {
              const item_name = item.name.toLowerCase();
              const item_service = item.service.toLowerCase();
              const res = (api_name === item_name && api_service === item_service);
              return res;
            })[0]

            const updated_curr_test = {
              ...curr_test,
              pending: true,
              error: false,
              data: ({})
            }

            return { ...state, currentTest: { ...state.currentTest, 
              tests: ([ ...prevTests, updated_curr_test ]).sort((a, b) => (a.pk < b.pk ? 1 : -1) ) }}
        }
        break;


      case "SINGLE_TEST__ERROR": 
        if (action.api) {
            const api_name = action.api.data.test_name.toLowerCase();
            const api_service = action.api.data.test_type.toLowerCase();
            let delIndex;

            const tests = state.currentTest.tests;
            console.log(tests)

            const prevTests = tests.filter((item, index) => {
              const item_name = item.name.toLowerCase();
              const item_service = item.service.toLowerCase();
              const res = !(api_name === item_name && api_service === item_service);
              return res;
            })

            const curr_test = tests.filter((item, index) => {
              const item_name = item.name.toLowerCase();
              const item_service = item.service.toLowerCase();
              const res = (api_name === item_name && api_service === item_service);
              return res;
            })[0]

            const updated_curr_test = {
              ...curr_test,
              pending: false,
              error: true,
              data: ({})
            }

            return { ...state, currentTest: { ...state.currentTest, 
              tests: ([ ...prevTests, updated_curr_test ]).sort((a, b) => (a.pk < b.pk ? 1 : -1) ) }}
        }
        break;



      case "SINGLE_TEST": 
        if (action.data) {
            const api_name = action.data.response.name.toLowerCase();
            const api_service = action.data.response.service.toLowerCase();

            const tests = state.currentTest.tests;
            console.log(tests)

            const prevTests = tests.filter((item, index) => {
              const item_name = item.name.toLowerCase();
              const item_service = item.service.toLowerCase();
              const res = !(api_name === item_name && api_service === item_service);
              return res;
            })

            const curr_test = tests.filter((item, index) => {
              const item_name = item.name.toLowerCase();
              const item_service = item.service.toLowerCase();
              const res = (api_name === item_name && api_service === item_service);
              return res;
            })[0]

            const updated_curr_test = {
              ...curr_test,
              pending: false,
              error: false,
              data: {...action.data.response}
            }

            return { ...state, currentTest: { ...state.currentTest, 
              tests: ([ ...prevTests, updated_curr_test ]).sort((a, b) => (a.pk < b.pk ? 1 : -1) ) }}
        }
        break;
      

      case "START_TEST": 
        if (action.data) {
            return {
              ...state, 
              currentTest: { 
                testInProgress: true,
                tests: action.data.map((item, index) => {
                  return {
                    pk: index+1,
                    name: item.name,
                    service: item.service,
                    pending: false,
                    error: false,
                    data: {}
                  }})
                }
            }

        }
        break;
          

      case "CLOSE_TEST":
        const currentTest = { ...state.currentTest, testInProgress: false};
        return {...state, currentTest}
      
      default: 
        break;
    }

    return state;
}