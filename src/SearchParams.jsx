import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import AdoptedPetContext from './AdoptedPetContext';
import fetchSearch from './fetchSearch';
import Results from './Results';
import useBreedList from './useBreedList';

const ANIMALS = ['dog', 'bird', 'cat', 'rabbit', 'reptile'];

const SearchParams = () => {
  // location and breed is not controlled by react anymore
  // uncontrolled form
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: '',
  });
  // animal is controlled because we have dependency for it. It is used in useBreedList
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);
  // eslint-disable-next-line no-unused-vars
  const [adoptedPet, _] = useContext(AdoptedPetContext);

  const results = useQuery(['search', requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get('animal') ?? '',
            breed: formData.get('breed') ?? '',
            location: formData.get('location') ?? '',
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image_container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input name="Location" id="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            id="animal"
            value={animal}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select disabled={breeds.length === 0} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
