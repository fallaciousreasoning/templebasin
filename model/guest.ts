import * as yup from 'yup';
import { enumValues } from '../utils/enum';

enum DietaryRequirement {
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten Free',
    'Lactose Intolerant'
};
export const dietaryRequirements = enumValues(DietaryRequirement);

export enum AccomodationCategory {
    Under13 = 'Under 13',
    Under18 = 'Under 18',
    Student = 'Student',
    Adult = 'Adult'
};
export const accomodationCategories = enumValues(AccomodationCategory);

export interface Guest {
    name: string;
    category: AccomodationCategory;
    clubMember: boolean;

    dietaryRequirements: DietaryRequirement[];
}

export const guestSchema = yup.object().shape({
    name: yup.string().required("Please specify a name."),
    category: yup.string().oneOf(accomodationCategories),
    member: yup.bool(),
    dietaryRequirements: yup.array()
        .of(yup.string().oneOf(dietaryRequirements))
});

export const newGuest = (): Guest => ({
    name: '',
    category: AccomodationCategory.Adult,
    clubMember: false,
    dietaryRequirements: []
});