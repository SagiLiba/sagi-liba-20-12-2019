// In Real Production app i would git ignore this file
const config = {
  apiKey: '0EzYVrNLuExDOciAMn8nulVn21AhARkP',
  baseUrl: 'http://dataservice.accuweather.com',
  defaultLocationKey: 215854,
  mockData: {
    localAutocomplete: 'http://herolo-sagi-mock.herokuapp.com/mockdata/autocomplete.json',
    localCurrentCondition: 'http://herolo-sagi-mock.herokuapp.com/mockdata/currentconditions.json',
    localFiveDayForcast: 'http://herolo-sagi-mock.herokuapp.com/mockdata/fivedayforcast.json'
  },
  useMock: true
};

export default config;
