export function T7ApiCaller(apiKey) {

    var myHeaders = new Headers();
    myHeaders.append("apikey", `${apiKey}`);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    console.log("Api key in apicaller: " + apiKey);

    fetch(`https://api.apilayer.com/exchangerates_data/latest`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data from api: status code ${response.status} ${response.statusText}`)
            }
            return response.json();
        })
        .then(result => {
            console.log("Result of api call:", result)
            return result;
        })
        .catch(error => {
            console.log('Non HTML related error in api call', error)
            throw error
        });
}