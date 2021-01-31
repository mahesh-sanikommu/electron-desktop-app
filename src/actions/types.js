const requestTypes = [
  "ABORT",
  "FAILURE",
  "SUCCESS",
  "REQUEST",
  "SUCCESSMESSAGE",
  "FAILUREMESSAGE",
  "INTERNALLOADING"
];

function createRequestTypes(base) {
  let res = {};
  requestTypes.forEach(type => (res[type] = `${base}_${type}`));
  return res;
}

export const SET_DNS = createRequestTypes("SET_DNS");
export const SET_MENU_SELECTION = "SET_MENU_SELECTION";
