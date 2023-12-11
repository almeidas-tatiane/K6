import http from 'k6/http';
import { check } from 'k6';
import { getUrlByKey } from '../../utils/urlProperties.js';

export default class Crocodiles {

    getAllCrocodiles() {

        const requestNameAll= 'GetAllCrocodiles';

        const sentHeadersAll = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = http.get(`${getUrlByKey('api')}/public/crocodiles/`, sentHeadersAll);


        check(response, {
            'Status code 200': (resp) => resp.status === 200,
        });
    }

    getCrocodilesbyID(){
        const requestNameById = 'GetCrocodilesByID';
        const id = random.id();

        const sentHeadersById = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = http.get(`${getUrlByKey('api')}/public/crocodiles/${id}`, sentHeadersById);

        check(response, {
            'Status code 200': (resp) => resp.status === 200,
        });
    }
}