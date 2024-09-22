export default function T9ApiCaller(apikey, lat, lon) {

    let url = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${lon},${lat},1500&bias=proximity:${lon},${lat}&limit=20&apiKey=${apikey}`;

    var requestOptions = {
        method: 'GET',
    };

    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data from api: status code ${response.status} ${response.statusText}`)
            }
            return response.json();
        })
        .then(data => {
            console.log("T9 Api Caller response data: ", JSON.stringify(data));
            return data;
        })
        .catch(error => {
            console.log("T9 Api Caller Non HTML related error: ", error)
            throw error
        });
}