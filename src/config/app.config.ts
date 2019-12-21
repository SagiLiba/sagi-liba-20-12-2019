// In Real Production app i would git ignore this file
const config = {
  apiKey: '0EzYVrNLuExDOciAMn8nulVn21AhARkP',
  baseUrl: 'http://dataservice.accuweather.com',
  defaultLocationKey: 215854,
  mockData: {
    autocomplete: 'http://localhost:3000/mockdata/autocomplete.json',
    currentCondition: 'http://localhost:3000/mockdata/currentconditions.json',
    fiveDayForcast: 'http://localhost:3000/mockdata/fivedayforcast.json'
  },
  useMock: false
};

export default config;
