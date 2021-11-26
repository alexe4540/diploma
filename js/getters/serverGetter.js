async function apiRequest(funcName, router, data) {
    let url = `../../router/${router}.php?func=${funcName}`;
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    let res = await response.text(); // читаем ответ в формате JSON

    return res;
}