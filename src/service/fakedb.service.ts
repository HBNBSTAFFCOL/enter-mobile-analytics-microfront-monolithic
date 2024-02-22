import { mobiles, type Mobile } from "../test/api/v1/dataset";

// Interfaz que define los criterios de filtrado para buscar teléfonos móviles.
// Cada propiedad es opcional y representa un criterio de filtrado diferente.
export interface FilterOptions {
    priceMin?: number;
    priceMax?: number;
    screenType?: string;
    screenResolution?: string;
    ram?: string;
    storage?: string;
    os?: string;
}


// Obtiene el movil por el id proporcionado
// Retorna el objeto Mobile correspondiente al ID proporcionado,
// o undefined si no se encuentra.
export const getMobileById = (id: string): Mobile | undefined => {
    return mobiles.find(mobile => mobile.id === id);
};



// Busca teléfonos móviles que coincidan con el término de búsqueda especificado.
// Retorna una lista de móviles que contienen el término de búsqueda en cualquier propiedad o característica.
export const searchMobiles = async (searchTerm: string): Promise<Mobile[]> => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    return mobiles.filter(mobile =>
        Object.values(mobile).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(normalizedSearchTerm)
        ) || mobile.features.some(feature => feature.toLowerCase().includes(normalizedSearchTerm))
    );
};




// Filtra la lista de teléfonos móviles según los criterios especificados en el objeto FilterOptions.
// Retorna una lista de móviles que cumplen con todos los criterios de filtrado.
export const filterMobiles = async (filterOptions: FilterOptions): Promise<Mobile[]> => {
    return mobiles.filter(mobile => {
        return (
            (filterOptions.priceMin === undefined || mobile.price >= filterOptions.priceMin) &&
            (filterOptions.priceMax === undefined || mobile.price <= filterOptions.priceMax) &&
            (filterOptions.screenType === undefined || mobile.screenType.toLowerCase() === filterOptions.screenType.toLowerCase()) &&
            (filterOptions.screenResolution === undefined || mobile.screenResolution.toLowerCase() === filterOptions.screenResolution.toLowerCase()) &&
            (filterOptions.ram === undefined || mobile.ram.toLowerCase() === filterOptions.ram.toLowerCase()) &&
            (filterOptions.storage === undefined || mobile.storage.toLowerCase() === filterOptions.storage.toLowerCase()) &&
            (filterOptions.os === undefined || mobile.os.toLowerCase() === filterOptions.os.toLowerCase())
        );
    });
};
