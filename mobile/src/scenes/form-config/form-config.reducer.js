import { asyncActionNames } from '../services/actionCreator';
const actionNames = asyncActionNames('FORM');

const INITIAL_STATE = {
  formFields: [],
  requestPayload: null,
  responsePayoload: null
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
       case actionNames.success:
          return {formFields: [...state.formFields, action.payload]}
	}
	return state;
};
