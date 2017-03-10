import { asyncActionNames, buildAsyncActions} from '../services/actionCreator';
import { Actions } from 'react-native-router-flux';


const actionNames = asyncActionNames('FORM');
const actionCreators = buildAsyncActions(actionNames);


export function AddField(field){
  return function(dispatch){
    dispatch(actionCreators.success(field));
  }
}
