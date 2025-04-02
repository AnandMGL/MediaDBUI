/**
 * With this function you can easly write your state to localstorage. Every change of state.
 * @param {{key: string}} config Object with prop key for localstorage key
 * @param {Function} reducer Redux state reduser
 * @returns Redux reducer function
 */
export function myReducerPersist(config, reducer) {
  return (state, action) => {
    const newState = reducer(state, action);
    if (newState === state) return newState;
    try {
      // if this action is init get state from localstorage
      if (!state && action.type?.startsWith("@@redux/INIT")) {
        const string = localStorage.getItem(config.key);
        if (string) {
          return JSON.parse(string);
        } else {
          localStorage.setItem(config.key, JSON.stringify(newState));
          return newState;
        }
      } else if (state) {
        // different state so write to localStorage
        localStorage.setItem(config.key, JSON.stringify(newState));
      }
      if (!state) {
        const string = localStorage.getItem(config.key);
        return JSON.parse(string);
      } else return newState;
    } catch (error) {
      console.log(
        "ERROR WHILE SAVING DATA TO LOCALSTORAGE",
        action,
        JSON.stringify(action)
      );
      console.error(error);
      return newState;
    }
  };
}
