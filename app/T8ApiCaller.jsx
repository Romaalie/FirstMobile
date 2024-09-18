export default function T8ApiCaller(address, apikey) {

    let url = `https://geocode.maps.co/search?q=${address}&api_key=${apikey}`;
    console.log("Api Caller address: ", address, "Api caller apikey: ", apikey)

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data from api: status code ${response.status} ${response.statusText}`)
            }
            return response.json();
        })
        .then(data => {
            console.log("Api Caller response data: ", data);
            return data;
        })
        .catch(error => {
            console.log("Api Caller Non HTML related error: ", error)
            throw error
        });
}