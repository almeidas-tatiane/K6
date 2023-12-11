import http from 'k6'
import { check } from 'k6'
import { getUrlByKey } from '../../utils/urlProperties.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';

