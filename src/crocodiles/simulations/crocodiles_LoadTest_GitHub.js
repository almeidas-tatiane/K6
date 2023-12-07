import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Verify load-test.yml in .github\workflows to execute tests at GitHub workflows
// Actions used at load-test.yml available at GitHub Actions Marketplace

export const options = {
  stages:[
    { duration: '1m', target: 100 }, // traffic ramp-up from 1 to 100 users over 1 minutes.
    { duration: '3m', target: 100 }, // stay at 100 users for 5 minutes
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
    "index.html": htmlReport(data),
  };
}

