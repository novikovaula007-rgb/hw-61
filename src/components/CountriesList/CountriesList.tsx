import {useCallback, useEffect, useState} from 'react';
import type {CountryInterface} from "../../types";
import axiosAPI from "../../axiosAPI.ts";
import CountryInfo from "../CountryInfo/CountryInfo.tsx";

const USERS_URL = 'all?fields=alpha3Code,name'

const CountriesList = () => {
    const [countries, setCountries] = useState<CountryInterface[]>([]);
    const [selectCountryCode, setSelectCountryCode] = useState<null | string>(null);

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
        <div className='container-lg mt-5'>
            <div className='row g-0'>
                <div className='col-md-2' style={{
                    overflowY: 'auto',
                    height: '500px',
                    border: '2px solid gray',
                    padding: '10px',
                }}>
                    <div>
                        {countries.map(country => {
                            return <div key={country.alpha3Code} style={{
                                border: '1px solid gray',
                                padding: '3px',
                                marginBottom: '5px',
                                borderRadius: '3px',
                                cursor: 'pointer'
                            }} onClick={() => setSelectCountryCode(country.alpha3Code)}
                            >{country.name}</div>
                        })}
                    </div>
                </div>
                <div className='col-md-4' style={{
                    height: '500px',
                    border: '2px solid gray',
                    padding: '10px',
                }}><CountryInfo alpha3Code={selectCountryCode}/></div>
            </div>
        </div>

    );
};

export default CountriesList;