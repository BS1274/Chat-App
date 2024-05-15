import welcomeImage from "../../utils/Welcome.png";

export default function Welcome() {
  return (
    <div className="lg:col-span-2 lg:block bg-white dark:bg-gray-900">
      <div className="pl-1 py-3">
        <img src={welcomeImage} alt="Welcome User" />
        <div className="text-center py-3">
          <h2 className="text-xl text-gray-800 dark:text-gray-200">
            Select a User to Start Chat 
          </h2>
        </div>
      </div>
    </div>
  );
}
