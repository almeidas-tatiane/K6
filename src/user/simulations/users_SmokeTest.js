import { group } from 'k6';
import Users from '../requests/userClass.js';

export const options = {
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(90) < 900'],
    }
};

export default function () {
    const users = new Users();

    // group('createNewUser', () => {
    //   users.createNewUser();
    // }
    // );

    group('Login', () => {
        users.login();
    }
    );
}

