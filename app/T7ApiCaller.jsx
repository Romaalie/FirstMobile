export function T7ApiCaller(key, symbols, base) {

    var myHeaders = new Headers();
    myHeaders.append("apikey", `${key}`);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=${base}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data from api: status code ${response.status} ${response.statusText}`)
            }
            return response.json()
        })
        .then(result => console.log("Result of api call:" + result))
        .catch(error => console.log('Non HTML related error in api call', error));
}