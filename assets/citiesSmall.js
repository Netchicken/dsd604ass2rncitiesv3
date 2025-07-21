//https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-react-js
//https://stackoverflow.com/questions/71581036/map-data-in-react-to-array-of-objects ME
//we have to remap the city data into an object of value city because the stupid select can't read a simple list of cities

//city data. the Select  needs to be in the array object of
//value and label have to map the city data to this object
// const [selectData, setSelectData] = useState([{ value: "1", label: "city" }]);
export function dropdownCitiesData() {
  const getSelectDataList = countryDataSmall.map((item) => item.CapitalName);
  //https://stackoverflow.com/questions/43572436/sort-an-array-of-objects-in-react-and-render-them
  getSelectDataList.sort();

  // console.log("createCities in citiesSmall.js selectData ", getSelectDataList);
  return getSelectDataList;

  // const data = allData.flatMap((item) => item.CapitalName).sort();
}

export const countryDataSmall = [
  {
    CountryName: "French Polynesia",
    CapitalName: "Papeete",
    CapitalLatitude: -17.53333333,
    CapitalLongitude: -149.566667,
    ContinentName: "Australia",
  },
  {
    CountryName: "Gabon",
    CapitalName: "Libreville",
    CapitalLatitude: 0.383333333,
    CapitalLongitude: 9.45,
    ContinentName: "Africa",
  },
  {
    CountryName: "The Gambia",
    CapitalName: "Banjul",
    CapitalLatitude: 13.45,
    CapitalLongitude: -16.566667,
    ContinentName: "Africa",
  },
  {
    CountryName: "Georgia",
    CapitalName: "Tbilisi",
    CapitalLatitude: 41.68333333,
    CapitalLongitude: 44.833333,
    ContinentName: "Europe",
  },
  {
    CountryName: "Germany",
    CapitalName: "Berlin",
    CapitalLatitude: 52.51666667,
    CapitalLongitude: 13.4,
    ContinentName: "Europe",
  },
  {
    CountryName: "Ghana",
    CapitalName: "Accra",
    CapitalLatitude: 5.55,
    CapitalLongitude: -0.216667,
    ContinentName: "Africa",
  },
  {
    CountryName: "Gibraltar",
    CapitalName: "Gibraltar",
    CapitalLatitude: 36.13333333,
    CapitalLongitude: -5.35,
    ContinentName: "Europe",
  },
  {
    CountryName: "Greece",
    CapitalName: "Athens",
    CapitalLatitude: 37.98333333,
    CapitalLongitude: 23.733333,
    ContinentName: "Europe",
  },
  {
    CountryName: "Greenland",
    CapitalName: "Nuuk",
    CapitalLatitude: 64.18333333,
    CapitalLongitude: -51.75,
    ContinentName: "Central America",
  },
  {
    CountryName: "Grenada",
    CapitalName: "Saint George's",
    CapitalLatitude: 12.05,
    CapitalLongitude: -61.75,
    ContinentName: "North America",
  },
  {
    CountryName: "Guam",
    CapitalName: "Hagatna",
    CapitalLatitude: 13.46666667,
    CapitalLongitude: 144.733333,
    ContinentName: "Australia",
  },
  {
    CountryName: "Guatemala",
    CapitalName: "Guatemala City",
    CapitalLatitude: 14.61666667,
    CapitalLongitude: -90.516667,
    ContinentName: "Central America",
  },
  {
    CountryName: "Guernsey",
    CapitalName: "Saint Peter Port",
    CapitalLatitude: 49.45,
    CapitalLongitude: -2.533333,
    ContinentName: "Europe",
  },
  {
    CountryName: "Guinea",
    CapitalName: "Conakry",
    CapitalLatitude: 9.5,
    CapitalLongitude: -13.7,
    ContinentName: "Africa",
  },
  {
    CountryName: "Guinea-Bissau",
    CapitalName: "Bissau",
    CapitalLatitude: 11.85,
    CapitalLongitude: -15.583333,
    ContinentName: "Africa",
  },
  {
    CountryName: "British Indian Ocean Territory",
    CapitalName: "Diego Garcia",
    CapitalLatitude: -7.3,
    CapitalLongitude: 72.4,
    ContinentName: "Africa",
  },
  {
    CountryName: "Macau",
    CapitalName: "Macau",
    CapitalLatitude: 0,
    CapitalLongitude: 0,
    ContinentName: "Asia",
  },
];
