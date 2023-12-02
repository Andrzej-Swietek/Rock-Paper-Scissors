import * as yup from 'yup';

export const registerValidation = yup.object({
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    nickname: yup
        .string()
        .required('Nickname is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password must contain at least one capital letter and one digit')
        .required('Password is required'),
    repeatedPassword: yup
        .string()
        .oneOf([yup.ref('password'), ''], 'Passwords must match')
        .required('Confirm Password is required'),
});