import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../graphql/queries/index';

/**
 * Subscription client still needs setup for this to work.
 * i.e a websocket connection over ws
 */
const useCurrentUser = props => {
    const { data, error, loading } = useQuery(CURRENT_USER_QUERY);
    console.log("data for useCurrentUser => ", data)
    console.log("error for useCurrentUser => ", error)
    console.log("loading for useCurrentUser => ", loading)
    return {
      data,
      error,
      loading,
    };
  };
export default useCurrentUser
export {  useCurrentUser };