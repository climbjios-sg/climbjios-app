export const CLEAR_STATE = 'CLEAR_STATE';

// The CLEAR_STATE action will completely reset the redux state to its initial value.
// This should only be called once the user has been redirected to a page which do not use the
// state such as the login page.
export const clearState = () => ({
  type: CLEAR_STATE,
});
