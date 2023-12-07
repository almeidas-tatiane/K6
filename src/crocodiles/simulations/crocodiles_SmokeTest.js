import { group } from 'k6';
import Crocodiles from '../requests/crocodilesClass.js';
// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 1,
  duration: '3s',

  thresholds: {
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['p(95) < 900'],
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
