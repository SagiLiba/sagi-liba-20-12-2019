// In Real Production app i would git ignore this file
const config = {
  apiKey: '0EzYVrNLuExDOciAMn8nulVn21AhARkP',
  baseUrl: 'http://dataservice.accuweather.com',
  defaultLocationKey: 215854,
  mockData: {
    localAutocomplete: 'http://sagi-herolo-mock.herokuapp.com/mockdata/autocomplete.json',
    localCurrentCondition: 'http://sagi-herolo-mock.herokuapp.com/mockdata/currentconditions.json',
    localFiveDayForcast: 'http://sagi-herolo-mock.herokuapp.com/mockdata/fivedayforcast.json'
  },
  useMock: false
};

export default config;
