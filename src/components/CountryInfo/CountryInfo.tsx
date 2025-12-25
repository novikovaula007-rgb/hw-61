import React, {useCallback, useEffect, useState} from 'react';
import type {CountryInfoInterface} from "../../types";
import axiosAPI from "../../axiosAPI.ts";

interface Props {
    alpha3Code: string | null;
}

const COUNTRY_URL = 'alpha/';

const CountryInfo: React.FC<Props> = ({alpha3Code}) => {
    const [country, setCountry] = useState<CountryInfoInterface | null>(null);

    const fetchCountry = useCallback(async () => {
        if (alpha3Code !== null) {
            const countryResponse = await axiosAPI.get(COUNTRY_URL + alpha3Code);
            setCountry(countryResponse.data);
        }
    }, [alpha3Code]);

    useEffect(() => {
        fetchCountry().catch(console.error);
    }, [fetchCountry]);

    if (country) {
        return (<div>
            <h1>{country.name}</h1>
            <p>{country.capital}</p>
        </div>)
    } else {
        return ('Select country to see more information')
    }
};

export default CountryInfo;