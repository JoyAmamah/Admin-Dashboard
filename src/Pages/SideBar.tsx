import { BsGridFill, BsPeopleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { usePersistedState } from '../Hooks/usePersistedState';
import { BiSolidLogOut } from 'react-icons/bi';

const SideBar = () => {
  const [, setIsSignedIn] = usePersistedState("isSignedIn", false);
  const [firstname] = usePersistedState("firstname", "");
  const [lastname] = usePersistedState("lastname", "");

  const navigate = useNavigate();

  const handleSignout = () => {
    setIsSignedIn(false);
    alert("Logout successful!");
    navigate("/signin");
  };

  return (
    <section className="flex flex-col justify-between h-screen w-64 bg-gray-900 text-white p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6">Hi {firstname} {lastname}</h1>

        <nav className="flex flex-col gap-3">
          <a
            href="/admin-dashboard"
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
          >
            <BsGridFill className="text-lg" />
            Dashboard
          </a>

          <a
            href="/employeetable"
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
          >
            <BsPeopleFill className="text-lg" />
            Employee
          </a>

          <a
            href="/department"
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
          >
            <BsPeopleFill className="text-lg" />
            Department
          </a>
        </nav>
      </div>

      <button
        onClick={handleSignout}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 shadow-sm mt-6"
      >
        <BiSolidLogOut className="text-lg" />
        <span className="font-medium">Sign Out</span>
      </button>
    </section>
  );
};

export default SideBar;
