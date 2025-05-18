import ForgotPasswordForm from "../../components/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-96 bg-[url(../assets/img/bg-forgot-pass.webp)] h-screen bg-cover bg-no-repeat bg-left hidden lg:block"></div>
        <div className="flex flex-1 flex-col my-10 items-center justify-center">
          <ForgotPasswordForm />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
