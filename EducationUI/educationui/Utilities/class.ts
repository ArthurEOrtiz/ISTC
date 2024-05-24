import { Class } from "@/app/shared/types/sharedTypes";

export const courseHasClasses = (classes: Class [] | undefined | null): boolean => {
        
    if (classes === undefined) {
        return false;
    }
    
    if (classes === null) {
        return false;
    }

    if (classes.length === 0) {
        return false;
    }

    return true
}

export const sortClassesByDate = (classes : Class[]): Class[] => {
    if (!courseHasClasses(classes)) return [];

    const sortedClasses = [...classes].sort((a, b) => {
        return new Date(a.scheduleStart).getTime() - new Date(b.scheduleStart).getTime();
    });
    return sortedClasses;
}

export const areClassesOrderedByDate = (classes: Class[]): boolean => {
    if (!courseHasClasses(classes)) return false;
    
    for (let i = 0; i < classes.length - 1; i++) {
        const currentClass = classes[i];
        const nextClass = classes[i + 1];
        if (new Date(currentClass.scheduleStart).getTime() > new Date(nextClass.scheduleStart).getTime()) {
            return false;
        }
    }
    return true;
}