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
            const countryResponse = await axiosAPI.get<CountryInfoInterface>(COUNTRY_URL + alpha3Code);
            const country = countryResponse.data
            if (country.borders) {
                const response = country.borders.map(async border => {
                    return (await axiosAPI.get<CountryInfoInterface>(COUNTRY_URL + border)).data.name
                })
                const bordersName = await Promise.all(response)
                setCountry({...country, borders: bordersName})
            } else {
                setCountry(country)
            }
        }
    }, [alpha3Code]);
    console.log(country)
    useEffect(() => {
        fetchCountry().catch(console.error);
    }, [fetchCountry]);

    if (country) {
        return (<div>
            <img src={country.flag} alt={country.name} style={{
                border: '1px solid gray',
                width: '150px',
                height: 'auto',
            }}/>
            <h1>{country.name}</h1>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Population:</strong> {country.population}</p>
            <p><strong>Capital:</strong> {country.capital}</p>
            {country.borders ? <><strong>Borders:</strong>
                <li style={{listStyle: 'none'}}>
                    {country.borders.map(border => {
                        return <ul key={border} style={{marginBottom: '0'}}>{border}</ul>
                    })}
                </li>
            </>: <p>Country doesn't have borders.</p>}

        </div>)
    } else {
        return ('Select country to see more information')
    }
};

export default CountryInfo;