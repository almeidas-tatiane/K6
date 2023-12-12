import http from 'k6/http';
import { check } from 'k6';
import { getUrlByKey } from '../../utils/urlProperties.js';
import { SharedArray } from "k6/data";
import { login } from '../../../../user/requests/userClass.js';

const data = new SharedArray('Leitura do json', function() {
    return JSON.parse(open('../../data/json/crocodilesById.json')).crocodiles;
});

const dataNewCrocodile = new SharedArray('Leitura do json', function() {
    return JSON.parse(open('../../data/json/newCrocodiles.json')).crocodiles;
});

export default class Crocodiles {

    getAllCrocodiles() {
        const sentHeadersAll = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = http.get(`${getUrlByKey('api')}/public/crocodiles/`, sentHeadersAll, {tags:{name: 'getAllCrocodiles'}});

        check(response, {
            'Status code 200': (resp) => resp.status === 200,
        });
    }

    getCrocodilesbyID() {
        const sentHeadersById = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const id = data[Math.floor(Math.random() * data.length)].id;

        const response = http.get(`${getUrlByKey('api')}/public/crocodiles/${id}`, sentHeadersById, {tags: {name: 'getCrocodilesbyID'}});

        check(response, {
            'Status code 200': (resp) => resp.status === 200,
        });
    };

    createNewCrocodile(){

        const sentHeadersNewCrocodile = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const bodyNewCrocodile = {
            name: dataNewCrocodile[Math.floor(Math.random() * dataNewCrocodile.length)].name,
            sex:  dataNewCrocodile[Math.floor(Math.random() * dataNewCrocodile.length)].sex,
            date_of_birth: dataNewCrocodile[Math.floor(Math.random() * dataNewCrocodile.length)].date_of_birth
        };

        login();
        const responseNewCrocodile = http.post(`${getUrlByKey('api')}/my/crocodiles/`, bodyNewCrocodile, { headers: sentHeadersNewCrocodile }  );
        console.log(bodyNewCrocodile);
        console.log(responseNewCrocodile);
        
        check(responseLogin, {
            'Status code 201': (resp) => resp.status === 201,
        });

    }
}
