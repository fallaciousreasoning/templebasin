import * as yup from 'yup';

export interface Guest {
    firstName: string;
    lastName: string;

    dateOfBirth: string;

    email: string;
    phone: string;

    member: boolean;
    student: boolean;
}

export const guestSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),

    dateOfBirth: yup.date().required().max(new Date()),

    email: yup.string().email().required(),
    phone: yup.string().required(),

    member: yup.bool(),
    student: yup.bool()
})