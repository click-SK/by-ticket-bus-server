export const createAdministrationDto = (model) => {
    const { login, _id } = model;

    return {
        login,
        id: _id.toString()
    };
}