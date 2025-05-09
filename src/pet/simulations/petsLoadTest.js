import { group } from 'k6';
import Pets from '../requests/petClass.js';

export const options = {
    vus: 1,
    iterations: 4
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