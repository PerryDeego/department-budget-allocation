
export const loadInitialState = (key, defaultValue = {}) => {
    try {
      return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : defaultValue;
    } catch (err) {
      return undefined;
    }
};

export const saveState = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch(err) {
        console.log(err);
    }
};


