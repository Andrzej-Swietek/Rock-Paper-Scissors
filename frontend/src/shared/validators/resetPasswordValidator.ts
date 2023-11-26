import * as yup from 'yup';
export const resetPasswordValidation = yup.object({
    newPassword: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password must contain at least one capital letter and one digit')
        .required('Password is required'),
    repeatedNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), ''], 'Passwords must match')
        .required('Confirm Password is required'),
});
