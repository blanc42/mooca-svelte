export interface Institute {
    id: number;
    name: string;
    description: string;
    location: string;
    foundedYear: number;
    website: string;
    departments: string[];
}

export interface Teacher {
    id: number;
    name: string;
    email?: string;
    bio?: string;
    specialization?: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Course {
    id: number;
    name: string;
    description: string;
    duration: number;
    credits: number;
    level: string;
    institutes: PartialInstitute[];
    teachers: Teacher[];
    tags: Tag[];
}

export interface PartialInstitute {
    id: number;
    name: string;
    location?: string;
    foundedYear?: number;
    website?: string;
}