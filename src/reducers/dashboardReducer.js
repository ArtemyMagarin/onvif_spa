const initialState = {
  devices: [],
  pending: false,
  error: false,
}

export default function dashboardReducer(state = initialState, action) {

  	switch (action.type) {
  		case "GET_DEVICES_LIST": {
  			if (action.data) {
  				return {
  					devices: action.data,
  					pending: false,
  					error: false
  				}
  			}
  			break
  		}
  		case "GET_DEVICES_LIST__PENDING": {
			return {
				devices: [],
				pending: true,
				error: false
			}
  		}
  		case "GET_DEVICES_LIST__ERROR": {
			return {
				devices: [],
				pending: false,
				error: true
			}
  		}
  		default: {
  			break
  		}
  	}
  	return state
}