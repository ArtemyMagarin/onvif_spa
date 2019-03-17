export function runSingleTestAction({ service, name, ip, port }) {
    let test_type = service;
    let test_name = name;

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
        data: [...listItems] 
    };
}

export function closeTestAction() {
    return {
        type: 'CLOSE_TEST',
    };
}

