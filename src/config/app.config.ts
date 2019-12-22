// In Real Production app i would git ignore this file
const config = {
  apiKey: '0EzYVrNLuExDOciAMn8nulVn21AhARkP',
  baseUrl: 'http://dataservice.accuweather.com',
  defaultLocationKey: 215854,
  mockData: {
    autocomplete: 'http://herolo-sagi.herokuapp.com/mockdata/autocomplete.json',
    currentCondition: 'http://herolo-sagi.herokuapp.com/mockdata/currentconditions.json',
    fiveDayForcast: 'http://herolo-sagi.herokuapp.com/mockdata/fivedayforcast.json',
    localAutocomplete: 'http://localhost:3000/mockdata/autocomplete.json',
    localCurrentCondition: 'http://localhost:3000/mockdata/currentconditions.json',
    localFiveDayForcast: 'http://localhost:3000/mockdata/fivedayforcast.json'
  },
  useMock: false
};

export default config;
