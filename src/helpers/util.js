export const idGenerator = () => {
    return (
        String(Math.round(Math.random() * 204856 + 100000)) +
        Math.round(Math.random() * 204856 + 100000)
    );
};

export const addToStorage = (key, data) => {
    try {
        const storageData = JSON.parse(localStorage.getItem(key)) ?? [];
        storageData.unshift(data);
        localStorage.setItem(key, JSON.stringify(storageData));
    } catch (error) {
        throw error;
    }
};

export const deleteFromStorage = (key, data) => {
    try {
        const storageData = JSON.parse(localStorage.getItem(key)) ?? [];
        const newStorageData = storageData.filter(
            (value) => value.id !== data.id
        );
        localStorage.setItem(key, JSON.stringify(newStorageData));
    } catch (error) {
        throw error;
    }
};
