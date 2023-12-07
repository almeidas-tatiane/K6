import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Verify buildspec.yml to execute tests at AWS using codebuild.

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
  const BASE_URL = 'https://test-api.k6.io';
  const sentHeaders = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = http.get(`${BASE_URL}/public/crocodiles/`, sentHeaders);


  check(response, {
    'Status code 200': (resp) => resp.status === 200,
  });
}

export function handleSummary(data) {
  return {
    "reports/crocodiles_LoadTestAWS.html": htmlReport(data),
  };
}

