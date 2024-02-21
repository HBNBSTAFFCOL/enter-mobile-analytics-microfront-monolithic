import { mobiles, type Mobile } from "../test/api/v1/dataset";


export const getMobileById = (id: string): Mobile | undefined => {
    return mobiles.find(mobile => mobile.id === id);
};



export const searchMobiles = async (searchTerm: string): Promise<Mobile[]> => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    return mobiles.filter(mobile =>
        Object.values(mobile).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(normalizedSearchTerm)
        ) || mobile.features.some(feature => feature.toLowerCase().includes(normalizedSearchTerm))
    );
};
