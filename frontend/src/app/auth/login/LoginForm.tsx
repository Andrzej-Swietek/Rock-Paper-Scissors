"use client"
//
// import {FC} from "react";
// import {Form, Formik, FormikValues} from "formik";
// import {FormTextItem} from "@core/forms/TextInputBox";
//
// export const LoginForm : FC<{}> = ({}) => {
//     return (
//         <Formik
//             initialValues={{
//                 email : '',
//                 password: ''
//             }}
//             onSubmit={ async (values: FormikValues, formikHelpers)=>{
//                 // const data = await UserService.loginUser(values.email, values.password)
//                 // console.log(data);
//                 //
//                 // if (data.accessToken) {
//                 //     // setAccessToken( data.accessToken )
//                 //     toast.success('Authenticated Successfully', TOASTIFY.defaultOptions );
//                 // } else
//                 //     toast.error('Incorrect Credentials',  TOASTIFY.defaultOptions);
//
//             }}
//             // validationSchema={loginSchema}
//         >
//             {
//                 ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
//                     <Form noValidate className={'w-full flex-center my-8'}>
//                         <FormTextItem
//                             placeholder={'Email 🙈 ...'}
//                             name={'email'}
//                             label={'Email'}
//                         />
//                         <FormTextItem
//                             placeholder={'Password 🔒 ... '}
//                             name={'password'}
//                             type={'password'}
//                             label={'Password'}
//                         />
//
//                         <button className={'bg-primary rounded-[70px] px-8 py-4 text-white text-[14px] leading-[16px]'} type={'submit'}> Sign In </button>
//                     </Form>
//                 )
//             }
//         </Formik>
//     )
// }