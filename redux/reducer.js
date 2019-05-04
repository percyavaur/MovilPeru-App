export function counter(state, action) {
    if (typeof state === "undefined") {
      return 0;
    } else {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
          break;
        case 'DECREMENT':
          return state - 1;
          break;
        default:
          return state;
      }
    }
  };