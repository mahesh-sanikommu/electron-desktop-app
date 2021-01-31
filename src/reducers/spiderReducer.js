import * as types from "../actions/types";

const initialState = {
  //CHECK DTR UNIQUE NAME
  setDnsReq: null,
  spiderDns: "lol"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_DNS.REQUEST:
      return {
        ...state,
        setDnsReq: true,
        setDnsReqError: false
      };
    case types.SET_DNS.SUCCESS:
      return {
        ...state,
        setDnsReq: false,
        setDnsReqError: false,
        spiderDns: action.payload
      };
    case types.SET_DNS.FAILURE:
      return {
        ...state,
        setDnsReq: false,
        setDnsReqError: true
      };

    case types.SET_MENU_SELECTION:
      let path = window.location.hash;
      return {
        ...state,
        path: path.split("#")[1]
      };

    default:
      return state;
  }
}
