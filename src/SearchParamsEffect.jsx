import { useState, useEffect } from 'react';
import Results from './Results';
import useBreedList from './useBreedList';

const ANIMALS = ['dog', 'bird', 'cat', 'rabbit', 'reptile'];

// render function
const SearchParams = () => {
  // set locations default value with "useState()" hook
  // "use" => hook
  // it runs only once! Every time after that is ignored
  // it is forbidden to place hooks inside if statements or loops
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  // effect is used to call/fetch something outside of component (API request, local storage)
  // this runs always (if there is no empty array)! Which we don't want. We want to run only on submit
  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // empty array means it will be called only once
  // if it needs to be called on location or animal change, we would put: [location, animal]

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // it is getting pets on submitting the form
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            // here we are updating location state, based on users input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            // here we are updating animal state, based on users select
            // also breed is set to be empty when we choose animal
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed('');
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
          <select
            // here we are updating breed state, based on users select
            onChange={(e) => setBreed(e.target.value)}
            disabled={breeds.length === 0}
            id="breed"
            value={breed}
          >
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
