import http from 'k6/http';
import { check } from 'k6';
import { getUrlByKey } from '../../utils/urlProperties.js';

export default class Crocodiles {

    getAllCrocodiles() {

        const sentHeaders = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = http.get(`${getUrlByKey('api')}/public/crocodiles/`, sentHeaders);

        check(response, {
            'Status code 200': (resp) => resp.status === 200,
        });
    }
}