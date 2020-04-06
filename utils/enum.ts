export const enumValues = <T>(type: T): (keyof T)[] => Object.values(type).filter(v => isNaN(parseInt(v)));