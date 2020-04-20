const axios = require('axios');

module.exports = {
  runGet,
  runPost
};


async function runGet(urls) {
  try {
    // se envían en paralelo las solicitudes y luego se recopilan todas
    const responses = await axios.all(urls.map( url => axios.get(url)));
    //obtenemos una lista de listas
    const results = responses.map(r => r.data)
    //ponemos todos los resultados en una lista
    return flat(results);

  } catch (error) {
    console.log(error.response.body);
  }
}

async function runPost(urls, body) {
  try {
    // se envían en paralelo las solicitudes y luego se recopilan todas
    const responses = await axios.all(urls.map( url => axios.post(url, body)));
    //obtenemos una lista de listas
    const results = responses.map(r => r.data)
    //ponemos todos los resultados en una lista
    return flat(results);

  } catch (error) {
    console.log(error.response.body);
  }
}


function flat(listaDeListas){
  let rflat = []

  for (const lista of listaDeListas) {
    for (const item of lista){
      rflat.push(item)
    }
  }
  return rflat;
}