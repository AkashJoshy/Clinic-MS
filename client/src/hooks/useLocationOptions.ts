import { useEffect, useState } from "react";
import {
  Country,
  State,
  City,
  type ICountry,
  type IState,
  type ICity,
} from "country-state-city";

export const useLocationOptions = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleCountryChange = (countryName: string) => {
    const selectedCountry = countries.find(
      (country) => country.name === countryName,
    );

    if (!selectedCountry) {
      setStates([]);
      setCities([]);
      return;
    }

    setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    setCities([]);
  };

  const handleStateChange = (
    
    countryName: string,
    stateName: string,
  ) => {
    const selectedCountry = countries.find(
      (country) => country.name === countryName,
    );

    if (!selectedCountry) {
      setCities([]);
      return;
    }

    const selectedState = State.getStatesOfCountry(
      selectedCountry.isoCode,
    ).find((state) => state.name === stateName);

    if (!selectedState) {
      setCities([]);
      return;
    }

    setCities(
      City.getCitiesOfState(
        selectedCountry.isoCode,
        selectedState.isoCode,
      ),
    );
  };

  return {
    countries,
    states,
    cities,
    handleCountryChange,
    handleStateChange,
  };
};