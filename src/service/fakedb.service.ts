import { mobiles, type Mobile } from "../test/api/v1/dataset";


// Obtiene el movil por el id proporcionado
// Retorna el objeto Mobile correspondiente al ID proporcionado,
// o undefined si no se encuentra.
export const getMobileById = (id: string): Mobile | undefined => {
    console.log(mobiles);
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

export const filterMobiles = async (filterOptions: Mobile): Promise<Mobile[]> => {
   // console.log('Filtros aplicados:', filterOptions);
    
    const invalidParams = Object.keys(filterOptions).filter(param =>
        !Object.keys(mobiles[0] as Mobile).includes(param)
    );

    console.log(`parametros que son invalidos: ${invalidParams}`);

    if (invalidParams.length > 0) {
       throw new Error(`Parámetros no admitidos: ${invalidParams.join(', ')}`);
    }
    
    const validParams = Object.entries(filterOptions).filter(([param, value]) =>
        value !== undefined
    );

    console.log('Parámetros válidos:', validParams);
        
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

   // console.log('Teléfonos encontrados:', filteredMobiles);
    return filteredMobiles;
};
