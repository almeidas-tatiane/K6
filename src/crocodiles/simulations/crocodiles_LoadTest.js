import { group } from 'k6';
import Crocodiles from '../requests/crocodiles.js';
// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages:[
    { duration: '1m', target: 100 }, // traffic ramp-up from 1 to 100 users over 1 minutes.
    { duration: '5m', target: 100 }, // stay at 100 users for 5 minutes
    { duration: '1m', target: 0 }, // ramp-down to 0 users

  ],


  thresholds: {
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['p(90) < 900'],
  }
 
};

export default function () {
  const crocodiles = new Crocodiles();

  group('GetAllCrocodiles', () => {
    crocodiles.getAllCrocodiles();
    
  }
  );
}

// export function handleSummary(data) {
//   return {
//     "reports/crocodiles_SmokeTest.html": htmlReport(data),
//   };
// }
