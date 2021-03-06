import get from '../../services/api/get';
import promiseJSON from '../../services/api/promiseJSON';
import pipe from '../../services/pipe';

export default function(userId, language) {
  return pipe(
    get,
    promiseJSON
  )(
    '/oldapi/users/' + userId + '/trips?language=' + language
  );
};
  