var https = require ('https');

async function getCountries(name, population) {
    var countries = 0;
    https.get('https://jsonmock.hackerrank.com/api/countries/search?name=' + name, res =>{
        
        res.setEncoding("utf8");    
        let data = '';
        res.on('data', chunk => {
            data += chunk;
        });
        res.on('end', () =>{
            const parseData = JSON.parse(data);
            for (let country of parseData.data){
                if(country.population >= population){   
                    countries++;
                }
            }
            
        });
        res.on('close', ()=>{
            console.log(countries); 
        });  
    });
    return await countries;
    
}
getCountries("un", 400)
    .then(console.log)

