import {RegisterForm} from "@/app/auth/register/RegisterForm";
import {PrimaryButton} from "@core/buttons";

const Register = async () => {
    return (
        <>
            <RegisterForm />
            <div className="w-full text-center flex flex-row flex-nowrap gap-4 items-center justify-center">
                <span> Already have account ? </span>
                <PrimaryButton href={'/auth/login'} text={'Sign In'}  variant={'text'}/>
            </div>
        </>
    )
}

export default Register;