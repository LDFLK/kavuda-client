export function appendStateObj(currentState, setStateFunction, key, value) {
  let currentStateObj = {...currentState};
  currentStateObj[key] = value;
  setStateFunction(currentStateObj);
}
