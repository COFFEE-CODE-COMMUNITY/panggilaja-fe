const BASE_URL = 'https://www.emsifa.com/api-wilayah-indonesia/api/';

export const addressService = {
    fetchProvinces: async () => {
        const response = await fetch(`${BASE_URL}provinces.json`);
        if (!response.ok) throw new Error("Failed to fetch provinces");
        return await response.json();
    },

    fetchRegencies: async (provinceId) => {
        const response = await fetch(`${BASE_URL}regencies/${provinceId}.json`);
        if (!response.ok) throw new Error("Failed to fetch regencies");
        return await response.json();
    },

    fetchDistricts: async (regencyId) => {
        const response = await fetch(`${BASE_URL}districts/${regencyId}.json`);
        if (!response.ok) throw new Error("Failed to fetch districts");
        return await response.json();
    }
};
