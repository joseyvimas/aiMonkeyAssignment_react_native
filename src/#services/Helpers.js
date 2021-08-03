import uuid from 'uuidv4';

export const getRandomId = () => {
    return uuid();
}

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}
