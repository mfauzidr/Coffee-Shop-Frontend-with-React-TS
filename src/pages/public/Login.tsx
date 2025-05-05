import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-96 h-screen bg-[url(../assets/img/bg-login.png)] bg-cover bg-no-repeat bg-center hidden lg:block"></div>
        <div className="flex flex-1 flex-col my-8 items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
