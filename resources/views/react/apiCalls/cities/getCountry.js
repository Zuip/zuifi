import get from '../../services/api/get';
import promiseJSON from '../../services/api/promiseJSON';
import pipe from '../../services/pipe';

export default function(countryUrlName, language) {
  return fetch(
    '/oldapi/countries/' + countryUrlName
    + '?language=' + language
  );
};
