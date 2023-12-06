import http from 'k6/http';
import { check } from 'k6';
import { urls } from '../../utils/UrlProperties.js';

export default class Crocodiles {

    getAllCrocodiles() {

        const sentHeaders = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = http.get('Get All crocodiles -> /public/crocodiles/', `${urls('api')}/public/crocodiles/`, sentHeaders);

        check(response, {
            'Status code 200': (resp) => resp.status === 200,
        });
    }
}