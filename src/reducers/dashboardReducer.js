const initialState = {
  list: {
    devices: [],
    pending: false,
    error: false
  },

  currentDevice: {
    data: {},
    pending: false,
    error: false,
    show: false,

    currentSnapshot: {
      url: null,
      pending: false,
      error: false
    }
  },

  snapshotsList: {
    snapshots: [],
    pending: false,
    error: false
  }


}

export default function dashboardReducer(state = initialState, action) {

    switch (action.type) {
      case "GET_DEVICES_LIST": {
        if (action.data) {
          const list = {
            devices: action.data,
            pending: false,
            error: false
          }
          return { ...state, list }
        }
        break
      }
      case "GET_DEVICES_LIST__PENDING": {
      const list = {
        devices: [],
        pending: true,
        error: false
      }
      const currentDevice = {
          data: {},
          pending: false,
          error: false,
          show: false
        }

      return { ...state, currentDevice, list }
      }
      case "GET_DEVICES_LIST__ERROR": {
      const list = {
        devices: [],
        pending: false,
        error: true
      }
      return { ...state, list }
      }


      case "GET_DEVICE": {
        if (action.data) {
          const currentDevice = {
            data: action.data,
            pending: false,
            error: false,
            show: true
          }
          return { ...state, currentDevice }
        }
        break
      }

      case "GET_DEVICE__PENDING": {
      const currentDevice = {
        data: {...action.api.data},
          pending: true,
          error: false,
          show: false
      }
      return { ...state, currentDevice }
      }

      case "GET_DEVICE__ERROR": {
        const currentDevice = {
        data: {},
          pending: false,
          error: true,
          show: false
      }
      return { ...state, currentDevice }
      }

      case "GET_DEVICE_SNAPSHOTS": {
          const snapshotsList = {
            snapshots: action.data,
            pending: false,
            error: false,
          }
          return { ...state, snapshotsList }
      }

      case "GET_DEVICE_SNAPSHOTS__PENDING": {
      const snapshotsList = {
        data: {...action.api.data},
          pending: true,
          error: false,
      }
      return { ...state, snapshotsList }
      }

      case "GET_DEVICE_SNAPSHOTS__ERROR": {
        const snapshotsList = {
        data: {},
          pending: false,
          error: true,
      }
      return { ...state, snapshotsList }
      }

      case "HIDE_CURRENT_DEVICE": {
        const currentDevice = { ...state.currentDevice, show: false }
        return { ...state,  ...currentDevice }
      }

      case "REFRESH_SNAPSHOT_IMAGE": {
        const currentSnapshot = {
          url: action.data.url,
          pending: false,
          error: false
        }
        const currentDevice = { 
          ...state.currentDevice, 
          currentSnapshot 
        }
        const snapshots = [...state.snapshotsList.snapshots, {...action.data}]
        const snapshotsList = {...state.snapshotsList, snapshots}
        return { ...state,  currentDevice, snapshotsList }
      } 
      case "REFRESH_SNAPSHOT_IMAGE__PENDING": {
       const currentSnapshot = {
          url: null,
          pending: true,
          error: false
        }
        const currentDevice = { 
          ...state.currentDevice, 
          currentSnapshot 
        }
        return { ...state,  currentDevice }
        
      } 
      case "REFRESH_SNAPSHOT_IMAGE__ERROR": {
        const currentSnapshot = {
          url: null,
          pending: false,
          error: true
        }
        const currentDevice = { 
          ...state.currentDevice, 
          currentSnapshot 
        }
        return { ...state,  currentDevice }

      } 


      default: {
        break
      }
    }
    return state
}