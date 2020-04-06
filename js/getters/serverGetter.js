async function getDataFromDB(funcName, data) {
    let url = `../../router/dbrouter.php?func=${funcName}`;
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