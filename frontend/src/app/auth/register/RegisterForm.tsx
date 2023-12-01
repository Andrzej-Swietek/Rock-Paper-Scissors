"use client"

import {FC} from "react";
import {Form, Formik, FormikValues} from "formik";

// Components
import {FormTextItem} from "@core/forms/TextInputBox";
import {Heading} from "@core/typography";

import {registerValidation} from "@shared/validators";

export const RegisterForm : FC<{}> = ({}) => {
    return (
        <Formik
            initialValues={{
                email : '',
                nickname: '',
                password: '',
                repeatedPassword: ''
            }}
            onSubmit={ async (values: FormikValues, formikHelpers)=>{
                // const data = await UserService.loginUser(values.email, values.password)
                // console.log(data);
                //
                // if (data.accessToken) {
                //     // setAccessToken( data.accessToken )
                //     toast.success('Authenticated Successfully', TOASTIFY.defaultOptions );
                // } else
                //     toast.error('Incorrect Credentials',  TOASTIFY.defaultOptions);

            }}
            validationSchema={registerValidation}
        >
            {
                ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Form noValidate className={'w-full flex-center my-8 border-2 py-8 rounded-[10px]'}>
                        <Heading className={'w-full px-16'} variant="h3">Register</Heading>

                        <FormTextItem
                            placeholder={'Email 🙈 ...'}
                            name={'email'}
                            label={'Email'}
                        />
                        <FormTextItem
                            placeholder={'Nickname 🙈 ...'}
                            name={'nickname'}
                            label={'Nickname'}
                        />
                        <FormTextItem
                            placeholder={'Password 🔒 ... '}
                            name={'password'}
                            type={'password'}
                            label={'Password'}
                        />
                        <FormTextItem
                            placeholder={'Repeat Password 🔒 ... '}
                            name={'repeatedPassword'}
                            type={'password'}
                            label={'Repeat Password'}
                        />

                        <button
                            className={'bg-primary rounded-[70px] px-8 py-4 mt-8 text-white text-[14px] leading-[16px]'}
                            type={'submit'}>
                            Sign Up
                        </button>
                    </Form>
                )
            }
        </Formik>
    )
}