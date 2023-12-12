import http from 'k6/http'
import { check } from 'k6'
import { getUrlByKey } from '../../utils/urlProperties.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';
import users_SmokeTest from '../simulations/users_SmokeTest.js';

const csvData = new SharedArray('Reading csv file', function () {
    return papaparse.parse(open('../../data/csv/users.csv'), { header: true }).data;
});

const csvDataLogin = new SharedArray('Reading login csv file', function () {
    return papaparse.parse(open('../../data/csv/login.csv'), { header: true }).data;
});

export default class Users {
    createNewUser() {
        const sentHeadersUsers = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const body = {
            username: csvData[Math.floor(Math.random() * csvData.length)].username,
            first_name: csvData[Math.floor(Math.random() * csvData.length)].first_name,
            last_name: csvData[Math.floor(Math.random() * csvData.length)].last_name,
            email: csvData[Math.floor(Math.random() * csvData.length)].email,
            password: csvData[Math.floor(Math.random() * csvData.length)].password
        };
        
        const response = http.post(`${getUrlByKey('api')}/user/register/`, body, { headers: sentHeadersUsers });
        console.log(body);
        console.log(response);
        
        check(response, {
            'Status code 201': (resp) => resp.status === 201,
        });

    };

    login(){
        const sentHeadersLogin = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const bodyLogin = {
            username: csvDataLogin[Math.floor(Math.random() * csvData.length)].username,
            password: csvDataLogin[Math.floor(Math.random() * csvData.length)].password
        };

        const responseLogin = http.post(`${getUrlByKey('api')}/auth/token/login/`, bodyLogin, { headers: sentHeadersLogin });
        console.log(bodyLogin);
        console.log(responseLogin);
        
        check(responseLogin, {
            'Status code 200': (resp) => resp.status === 200,
        });

        const token = responseLogin.json('access');
        return token;

    }
}

