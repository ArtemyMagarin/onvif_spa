export function singleTestAction(test_type, test_name, ip, port) {
    return {
        type: 'SINGLE_TEST',
        api: {
            url: `/api/${test_type}_test/${test_name}?ip=${ip}&port=${port}`,
            method: 'POST',
            data : { test_type, test_name, ip, port }
        },
    };
}

export function startTestAction(listItems) {
    return {
        type: 'START_TEST',
        data : listItems 
    };
}

export function stopTestAction() {
    return {
        type: 'STOP_TEST',
     };
}

