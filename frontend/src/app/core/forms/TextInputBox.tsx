'use client'
import React, {FC} from 'react';
import { Field, Form, Formik, FormikValues, FieldAttributes, useField } from 'formik';

type FormTextItemProps = FieldAttributes<{}>;

export const FormTextItem: FC<FormTextItemProps&{styles?: string, label: string}> = ({styles, label, placeholder,disabled, ...props}) => {

    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : ''

    return (
        <div className={`w-full flex-center lg:w-1/2 px-3 mb-6 mt-5 md:mb-0 ${styles}`}>
            <label className="w-full text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                   htmlFor={label.split(' ').join('')}>
                {label}
            </label>
            <Field
                {...field}
                {...props}
                className={`leading-[24px] w-full bg-gray-200 text-gray-700 border ${errorText !== ''? 'border-error' : ''} rounded py-4 px-4 mb-3  focus:outline-none focus:bg-white`}
                id={label.split(' ').join('')} placeholder={placeholder} />

            <p className="text-left text-error h-4 text-xs italic"> { errorText } </p>
        </div>
    );
};
