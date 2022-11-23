import axios from 'axios';
import {fetchData, fetchSuccess, fetchError, fetchMultipleSuccess} from './ApiAction';
import config from '../config/config';

const apiGetActionCreator = (url,method,myData) => (dispatch) => {
  dispatch(fetchData()); 
  const headers = { 
    'Accept': 'application/json', 
    'Authorization' : 'Bearer '+ config.auth,
  }
    return new Promise(() => {
      axios({
        method: method,
        url: url,
        data:myData,
        headers:{headers},
      }).then((response) => {
        dispatch(fetchSuccess(response.data)); //passs back-end data to front-end
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(fetchError(error));
        console.log(error);
      });
  });
};

const apiPostActionCreator = (url,data,auth) => (dispatch) => {
  dispatch(fetchData());
  const headers = { 
    'Accept': 'application/json', 
    'Authorization' : 'Bearer '+ auth,
  }
    return new Promise(() => {
      axios.post(url, data, { headers })
      .then(response => {
        dispatch(fetchSuccess(response.data)); //passs back-end data to front-end
        console.log(response.data);
      })    
      .catch((error) => {
        dispatch(fetchError(error));
        console.log(error);
      });
  });
};

const apiPutActionCreator = (url,data) => (dispatch) => {
  dispatch(fetchData());
  const headers = { 
    'Accept': 'application/json', 
    'Authorization' : 'Bearer '+ global.auth,

  }
    return new Promise(() => {
      axios.put(url, data, { headers })
      .then(response => {
        dispatch(fetchSuccess(response.data)); //passs back-end data to front-end
        console.log(response.data);
      })    
      .catch((error) => {
        dispatch(fetchError(error));
        console.log(error);
      });
  });
};

const apiGetAuthActionCreator = (url,auth) => (dispatch) => {
  dispatch(fetchData());
  const headers = { 
    'Accept': 'application/json', 
    'Authorization' : 'Bearer '+ auth,
  }
    return new Promise(() => {
     axios.get(url, { headers })
      .then(response => {
        dispatch(fetchSuccess(response.data.data)); //passs back-end data to front-end
        // console.log('cart list is');
        // console.log(response.data.data);
      })    
      .catch((error) => {
        dispatch(fetchError(error));
        console.log(error);
      });
  });
};

const getDataUsingAsyncAwaitGetCall = async ({url}) => {
  dispatch(fetchData());
  const headers = { 
    'Accept': 'application/json', 
    'Authorization' : 'Bearer '+ config.auth,
  }
  try {
    const response = await axios.get(
      url,{headers}
    );
    alert(JSON.stringify(response.data));
    // dispatch(fetchSuccess(response.data)); //passs back-end data to front-end

  } catch (error) {
    // handle error
    console.log(error.message);
  }
};

const apiGetMultipleActionCreator = (baseUrl,baseUrl2,auth) =>(dispatch) =>{
  dispatch(fetchData()); //pending 
  const headers = { 
    'Accept': 'application/json',
    'Authorization' : 'Bearer '+ auth,
  }
  
  function getCategories(){
    return axios.get(baseUrl,{ headers });
  }

  function getProducts(){
    return axios.get(baseUrl2,{ headers });
  }
  return new Promise(() => {
    axios.all([getCategories(), getProducts()])
    .then(axios.spread(function (categories, products) {
      // all requests are now complete     
      dispatch(fetchMultipleSuccess(categories.data.data,products.data.data)); 
      // console.log(categories.data.data,products.data.data);   
    }))
    .catch((error) => {
      dispatch(fetchError(error));
    });
});
}

const apiGetMultipleActionCreatorProfile = (profile_url,order_url,auth) =>(dispatch) =>{
  dispatch(fetchData()); //pending 
  const headers = { 
    'Accept': 'application/json',
    'Authorization' : 'Bearer '+ auth,
  }
  
  function getProfile(){
    return axios.get(profile_url,{ headers });
  }

  function getOrder(){
    return axios.get(order_url,{ headers });
  }
  return new Promise(() => {
    axios.all([getProfile(), getOrder()])
    .then(axios.spread(function (profile, order) {
      // all requests are now complete     
      dispatch(fetchMultipleSuccess(profile.data.data,order.data.data)); 
      console.log(profile.data.data,order.data.data);
    }))
    .catch((error) => {
      dispatch(fetchError(error));
    });
});
}

const apiGetMultipleActionCreatorWithoutAuth = (baseUrl,baseUrl2) =>(dispatch) =>{
  dispatch(fetchData()); //pending 
  const headers = { 
    'Accept': 'application/json',
  }
  
  function getCategories(){
    return axios.get(baseUrl,{ headers });
  }

  function getProducts(){
    return axios.get(baseUrl2,{ headers });
  }
  return new Promise(() => {
    axios.all([getCategories(), getProducts()])
    .then(axios.spread(function (categories, products) {
      // all requests are now complete     
      dispatch(fetchMultipleSuccess(categories.data.data,products.data.data));   
      console.log('without permission');
      console.log(categories.data.data); 
      console.log(products.data.data); 
    }))
    .catch((error) => {
      dispatch(fetchError(error));
    });
});
}




// const apiGetDeliAndProductsActionCreator = (baseUrl,baseUrl2,auth) =>(dispatch) =>{
//   dispatch(fetchData()); //pending 
//   const headers = { 
//     'Accept': 'application/json',
//     'Authorization' : 'Bearer '+ auth,
//   }
  
//   function getDelivery(){
//     return axios.get(baseUrl,{ headers });
//   }

//   function getProducts(){
//     return axios.get(baseUrl2,{ headers });
//   }
//   return new Promise(() => {
//     axios.all([getDelivery(), getProducts()])
//     .then(axios.spread(function (deliveries, products) {
//       // all requests are now complete     
//       dispatch(fetchMultipleSuccess(deliveries.data.data,products.data.data)); 
//       console.log(deliveries.data.data);
//       console.log('products carts');
//       console.log(products.data.data[0].cart_products);   
//     }))
//     .catch((error) => {
//       dispatch(fetchError(error));
//     });
// });
// }

export {apiGetActionCreator,apiGetAuthActionCreator,apiPostActionCreator,apiPutActionCreator,apiGetMultipleActionCreator,apiGetMultipleActionCreatorWithoutAuth,apiGetMultipleActionCreatorProfile};