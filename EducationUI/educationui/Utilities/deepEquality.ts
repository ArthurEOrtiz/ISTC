export function deepEquals(a : any, b: any) : boolean {
    if (a === b) {
        return true;
    }

    // if (a instanceof Date && b instanceof Date) {
    //     return a.getTime() === b.getTime();
    // }

    if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
        return false;
    }

    let keysA = Object.keys(a), keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let key of keysA) {
        if (!keysB.includes(key)) {
            return false;
        }

        if (key === 'scheduleStart' || key === 'scheduleEnd') {
            console.log("Comparing dates", a[key], b[key]);
            const dateA = new Date(typeof a[key] === 'string' && !a[key].endsWith('Z') ? a[key] + 'Z' : a[key]);
            const dateB = new Date(typeof b[key] === 'string' && !b[key].endsWith('Z') ? b[key] + 'Z' : b[key]);

            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime()) || dateA.getTime() !== dateB.getTime()) {
                return false;
            }
        } else if (!deepEquals(a[key], b[key])) {
            return false;
        }
    }


    return true;
}