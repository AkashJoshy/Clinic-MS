import { useCallback, useState } from "react";
import {
  Country,
  State,
  City,
  type ICountry,
  type IState,
  type ICity,
} from "country-state-city";

export const useLocationOptions = () => {
  const [countries] = useState<ICountry[]>(() => Country.getAllCountries());

  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  const handleCountryChange = useCallback(
    (countryName: string) => {
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
    },
    [countries],
  );

  const handleStateChange = useCallback(
    (countryName: string, stateName: string) => {
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
        City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode),
      );
    },
    [countries],
  );

  return {
    countries,
    states,
    cities,
    handleCountryChange,
    handleStateChange,
  };
};
