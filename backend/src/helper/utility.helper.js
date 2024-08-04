export const getEnumValues = (schema, path) => {
    const field = schema.path(path);
    if (field && field.options && field.options.enum) {
        return field.options.enum;
    }
    return [];
};