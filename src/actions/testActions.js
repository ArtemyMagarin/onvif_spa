import store from '../store'


export function runTest() {
    const {tests, currIndex} = store.getState().testReducer;
    const {ip, port} = store.getState().dashboardReducer.currentDevice.data

    const test = tests[currIndex];
    
    return {
        type: 'RUN_TEST',
        api: {
            url: `/api/${test.service}_test/${test.name}?ip=${ip}&port=${port}`,
            method: 'POST',
            data: { test_type: test.service, test_name: test.name, ip, port }
        }
    } 
}

export function startTestAction(listItems) {
    return {
        type: 'INIT_TESTS',
        data: [...listItems]
    };
}

export function nextTest() {
    return {
        type: 'NEXT_TEST',
    };
}

export function closeTestAction() {
    return {
        type: 'CLOSE_TEST',
    };
}

export function resolveTestManually(resolution, index) {
    return {
        type: 'RESOLVE_TEST_MANUALLY',
        data: { resolution, index }
    }
}


