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
    firstName: yup.string().required("Please specify a first name."),
    lastName: yup.string().required("Please specify a last name."),

    dateOfBirth: yup.date().required().max(new Date(), "Date of birth must be in the past."),

    email: yup.string().email("Invalid email!").required("An email address is required."),
    phone: yup.string().required("Phone number is required."),

    member: yup.bool(),
    student: yup.bool()
})