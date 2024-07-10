import axios from "axios";


//https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a
//https://viacep.com.br/ws/01310930/json/ 

const api = axios.create ({
    baseURL:"https://www.thecocktaildb.com/api/json/v1/1/"
});

export default api;