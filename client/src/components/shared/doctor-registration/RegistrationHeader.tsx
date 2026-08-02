
export const RegistrationHeader = () => {
  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl shadow-lg mb-4">
          <span className="text-2xl">🏥</span>
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">
          Register Doctor
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Join {import.meta.env.VITE_WEBSITE_NAME.toLowerCase()} and connect with patients
        </p>
      </div>
    </>
  );
};

export default RegistrationHeader;