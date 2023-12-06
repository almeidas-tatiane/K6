import http from 'k6/http';
import {check} from 'k6';
import utils from "../utils/UrlProperties.js";

export default class Crocodiles {

    getCrocodilesRequest() {

        const sentHeaders = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        http("Get All crocodiles -> /public/crocodiles/")
        const response = http.get(`${utils.urls("api")}/public/crocodiles/`,sentHeaders)        

        check(response, {
            'Status code 200': (resp) => resp.status === 200,
        });

    }

}