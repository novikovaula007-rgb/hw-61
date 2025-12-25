export interface CountryInterface {
    alpha3Code: string;
    name: string;
}

export interface CountryInfoInterface {
    name: string;
    capital: string;
    borders: string[];
    flag: string;
    population: number;
    subregion: string;
}