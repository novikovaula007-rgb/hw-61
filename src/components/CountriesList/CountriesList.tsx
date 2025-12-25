import {useCallback, useEffect, useState} from 'react';
import type {CountryInterface} from "../../types";
import axiosAPI from "../../axiosAPI.ts";

const USERS_URL = 'all?fields=alpha3Code,name'

const CountriesList = () => {
    const [countries, setCountries] = useState<CountryInterface[]>([])

    const fetchData = useCallback(async () => {
        try {
            const response = await axiosAPI.get<CountryInterface[]>(USERS_URL)
            const users = response.data
            setCountries(users)
        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        void fetchData()
    }, [fetchData])

    return (
        <div>
            {countries.map(country => {
                return <div key={country.alpha3Code} style={{
                    border: '1px solid gray',
                    padding: '3px',
                    marginBottom: '5px',
                    borderRadius: '3px',
                    cursor: 'pointer'
                }}>{country.name}</div>
            })}
        </div>
    );
};

export default CountriesList;