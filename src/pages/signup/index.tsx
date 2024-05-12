import SignUpForm from "@/components/Auth/SignUp/SignUpForm";
import Link from "next/link";

const SignUp = () => {
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center px-6 py-12 sm:px-6 lg:px-8">
		<div className="sm:mx-auto sm:w-full sm:max-w-md">
		  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
			Create an account
		  </h2>
		  <p className="mt-2 text-center text-sm text-gray-600 max-w">
			Or{' '}
			<Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
			  sign in
			</Link>
		  </p>
		</div>
			<SignUpForm/>
		</div>
	)
}

export default SignUp;