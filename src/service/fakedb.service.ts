import { log } from "console";
import { mobiles, type Mobile } from "../test/api/v1/dataset";


// Obtiene el movil por el id proporcionado
// Retorna el objeto Mobile correspondiente al ID proporcionado,
// o undefined si no se encuentra.
export const getMobileById = (id: string): Mobile | undefined => {
    return mobiles.find(mobile => mobile.id === id);
};



// Busca teléfonos móviles que coincidan con el término de búsqueda especificado.
// Retorna una lista de móviles que contienen el término de búsqueda en cualquier propiedad o característica.
export const searchMobiles = async (searchTerm: string): Promise<Mobile[]> => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim().replace(/\s/g, '');
    return mobiles.filter(mobile =>
        Object.values(mobile).some(value => {
            if (Array.isArray(value)) {
                return value.some(val => typeof val === 'string' && val.toLowerCase().replace(/\s/g, '').includes(normalizedSearchTerm));
            } else if (typeof value === 'string') {
                return value.toLowerCase().replace(/\s/g, '').includes(normalizedSearchTerm);
            }
            return false;
        })
    );
}






// Filtra la lista de teléfonos móviles según los criterios especificados en el objeto FilterOptions.
// Retorna una lista de móviles que cumplen con todos los criterios de filtrado.

export const filterMobiles = (filterOptions: Mobile): Mobile[] => {
    const validParams = Object.entries(filterOptions).filter(([param, value]) =>
        value !== undefined
    );        
    const filteredMobiles = mobiles.filter(mobile => {
        return validParams.every(([param, optionValue]) => {
            if (Array.isArray((mobile as Mobile)[param])) {
                return (mobile as Mobile)[param].includes(optionValue);
            } else {
                const mobileValue = (mobile as Mobile)[param];
                return mobileValue !== undefined && mobileValue.toString().toLowerCase() === optionValue.toString().toLowerCase();
            }
        });
    });
    return filteredMobiles;
};