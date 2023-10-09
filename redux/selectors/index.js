const selectIsAuth = (state) => Boolean(state.auth.userData);
const selectIsLoading = (state) => state.auth.status;
const selectUser = (state) => state.auth.userData;

export { selectIsAuth, selectIsLoading, selectUser };
