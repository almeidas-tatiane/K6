import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    scenarios: {
        AddPet: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                {duration: '1m', target: 20},
                {duration: '5m', target: 20},
                {duration: '5m', target: 20},
                {duration: '1m', target: 10},
            ],
            gracefulRampDown: '10s'
        },
    },
    thresholds: {
        http_req_failed: ['rate<0.01'], 
        http_req_duration: ['p(99)<1000'], 
      },
};

export default function () {
    const url = 'https://petstore3.swagger.io/api/v3/pet';
    const payload = JSON.stringify({
        id: 10,
        name: 'dog',
        category: {
            id: 1,
            name:'Dogs'
        },
        photoUrls: [
            'string'
        ],
        tags: [
            {
                id: 0,
                name: 'string'
            }
        ],
        status: 'available'
    });

    const params = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    const res = http.post(url,payload,params);

    check(res, {
        'response code was 200': (res) => res.status === 200,
    });



    
    
}