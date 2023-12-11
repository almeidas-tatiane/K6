import { group } from 'k6';
import Crocodiles from '../requests/crocodilesClass.js';
// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages:[
    { duration: '1m', target: 100 }, 
    { duration: '5m', target: 100 }, 
    { duration: '1m', target: 1000 }, // spike
    { duration: '1m', target: 100 }, 
    { duration: '5m', target: 100 },
    { duration: '1m', target: 0 }, 
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
  group ('GetCrocodilesById', () => {
    crocodiles.getCrocodilesbyID();
  })
}

// export function handleSummary(data) {
//   return {
//     "reports/crocodiles_SmokeTest.html": htmlReport(data),
//   };
// }
