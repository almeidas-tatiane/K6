import http from 'k6/http';
import { check } from 'k6';
import { getUrlByKey } from '../../utils/urlProperties.js';
import { SharedArray } from "k6/data";

const data = new SharedArray('Leitura do json', function() {
    return JSON.parse(open('../../data/json/crocodilesById.json')).crocodiles;
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
    }
}
