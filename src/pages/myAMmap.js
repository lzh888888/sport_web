const axios = require('axios');

function myAMap(){
    let httpUrl = 'https://webapi.amap.com/maps?v=1.4.15&key=8addedaf2d0748ca1a3626cdbaa806a2&plugin=AMap';
    // axios.get(httpUrl,{responseType:'streamapplication/javascript'}).then((res)=>{
    //     console.log(res.data);
    //     return res.data;
    // })
}

module.exports = { myAMap };