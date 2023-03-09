import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AdoptedPetContext from './AdoptedPetContext';
import Details from './Details';
import SearchParams from './SearchParams';

// (1/4) react query is used instead of effects
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
const App = () => {
  const adoptedPetHook = useState(null);
  return (
    // Basic client side routing (react router)
    <BrowserRouter>
      {/* (2/4) react query */}
      <QueryClientProvider client={queryClient}>
        {/* Details and SearchParams have availability to context.
        we are passing read and write, the whole hook.
        Because of that we can use setAdoptedPet in Details for example */}
        <AdoptedPetContext.Provider value={adoptedPetHook}>
          <header>
            <Link to={'/'}>Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
