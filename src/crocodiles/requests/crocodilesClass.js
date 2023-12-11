import http from 'k6/http';
import { check } from 'k6';
import { getUrlByKey } from '../../utils/urlProperties.js';
import { SharedArray } from "k6/data";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export default class Crocodiles {

    getAllCrocodiles() {

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

        const sentHeadersById = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const csvData = new SharedArray('Leitura do csv', function(){
            return papaparse.parse(open('../../data/csv/crocodilesById.csv'), {header: true}).data;
        });

        const id = csvData[Math.floor(Math.random() * csvData.length)].id;


        const response = http.get(`${getUrlByKey('api')}/public/crocodiles/${id}`, sentHeadersById);

        check(response, {
            'Status code 200': (resp) => resp.status === 200,
        });
    }
}