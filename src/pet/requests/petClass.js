import http from 'k6/http';
import { check, sleep } from 'k6';
import { getUrlByKey } from '../../utils/urlProperties.js';
import { SharedArray } from 'k6/data';

const dataNewPets = new SharedArray('Leitura do json', function() {
    return JSON.parse(open('../../data/json/pets.json')).pets;
});

export default class Pets {
    createAddPets(){
        const sentHeadersAddPets = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }

        const csvAddPet = {
            id: dataNewPets[Math.floor(Math.random() * dataNewPets.length)].id,
            name:  dataNewPets[Math.floor(Math.random() * dataNewPets.length)].name

            
        }

        const bodyAddPet = JSON.stringify(
            {
                "id": csvAddPet.id,
                "name": csvAddPet.name,
                "category": {
                    "id": csvAddPet.id,
                    "name": csvAddPet.name
                },
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                    "id": csvAddPet.id,
                    "name": "string"
                    }
                ],
                "status": "available"
                }
        )

        const responseAddPets = http.post(`${getUrlByKey('petstore')}/api/v3/pet`, bodyAddPet, { headers: sentHeadersAddPets }  );
        console.log(bodyAddPet);
        console.log(responseAddPets);

        check(responseAddPets, {
            'Status code 200': (resp) => resp.status === 200,
        });
    };

    getPetByStatus(){
        const sentHeadersGetPets = {
            'accept': 'application/json'
        }

        const responseGetPetByStatus = http.get(`${getUrlByKey('petstore')}/api/v3/pet/findByStatus?status=available`, {headers: sentHeadersGetPets});

        check(responseGetPetByStatus, {
            'Status code 200': (resp) => resp.status === 200,
        });

    };    
    
    getPetById(){
        const sentHeadersGetPets = {
            'accept': 'application/json'
        }

        const bodyGetPetById = {
            id: dataNewPets[Math.floor(Math.random() * dataNewPets.length)].id
        }

        const responseGetPetById = http.get(`${getUrlByKey('petstore')}/api/v3/pet/`, bodyGetPetById, {headers: sentHeadersGetPets});

        check(responseGetPetById, {
            'Status code 200': (resp) => resp.status === 200,
        });

    }

     }


    
