import { group } from 'k6';
import Pets from '../requests/petClass.js';

export const options = {
    vus: 10,
    iterations: 100,
    // Configuration to Grafana Cloud
    cloud: {
    projectID: '3671111', // Test runs with the same name groups test runs together, default project id
    name: 'Pets'
  }
};

export default function () {
  const pets = new Pets();

  group('createAddPets', () => {
    pets.createAddPets();
    
  }
  );
  group ('getPetByStatus', () => {
    pets.getPetByStatus();
  });

 group ('getPetById', () => {
    pets.getPetById();
  });

}