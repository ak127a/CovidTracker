import React , {useState , useEffect} from 'react'
import {NativeSelect , FormControl} from '@material-ui/core';
import {fetchCountries} from '../../api';

import styles from './CountryPicker.module.css'

function CountryPicker({handleCountryChange}) {
    const [countryarray , setCountryarray] = useState([]);

    useEffect(()=>{
        const fetchAPI = async () => {
            setCountryarray(await fetchCountries());
        }
        fetchAPI();
    }, [setCountryarray]);

    return (
        <FormControl className={styles.formControl}> 
            <NativeSelect defaultValue="" onChange={(e) => {handleCountryChange(e.target.value)}}>
                <option value="global">Global</option>
                {countryarray.map((country , i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
