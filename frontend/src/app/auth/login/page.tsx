import {Heading} from "@core/typography";
import {LoginForm} from "@/app/auth/login/LoginForm";
import {PrimaryButton} from "@core/buttons";

const Login = async () => {
    return (
        <>
            <LoginForm />
            <div className="w-full text-center flex flex-row flex-nowrap gap-4 items-center justify-center">
               <span> Don't have account ? </span>
                <PrimaryButton href={'/auth/register'} text={'Sign Up'}  variant={'text'}/>
            </div>
        </>
    )
}

export default Login;