export const login = (user) => {
    const response = {
        token: user.clientID,
        data: {
            email: user.email,
            name: user.name
        }
    };
    return new Promise(resolve => setTimeout(resolve(response), 1000));
};

export const logout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};