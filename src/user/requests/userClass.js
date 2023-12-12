import http from 'k6/http'
import { check } from 'k6'
import { getUrlByKey } from '../../utils/urlProperties.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';

const csvData = new SharedArray('Reading csv file', function () {
    return papaparse.parse(open('../../data/csv/users.csv'), { header: true }).data;
});

export default class Users {
    createNewUser() {
        const sentHeadersUsers = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const USER = csvData[Math.floor(Math.random() * csvData.length)].username;
        const FIRST_NAME = csvData[Math.floor(Math.random() * csvData.length)].first_name;
        const LAST_NAME = csvData[Math.floor(Math.random() * csvData.length)].last_name;
        const EMAIL = csvData[Math.floor(Math.random() * csvData.length)].email;
        const PASSWORD = csvData[Math.floor(Math.random() * csvData.length)].password;



        const response = http.post(`${getUrlByKey('api')}/user/register/`, sentHeadersUsers, {
            username: USER,
            first_name: FIRST_NAME,
            last_name: LAST_NAME,
            email: EMAIL,
            password: PASSWORD
        });
        console.log(USER, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD);
        
        check(response, {
            'Status code 201': (resp) => resp.status === 201,
        });

    };
}

