const importFunction = (r) => r.keys().map(r);
export const dummyAvatar = importFunction(
    require.context('@/assets/avatar', false, /.(png|jpe?g|svg)$/)
);
