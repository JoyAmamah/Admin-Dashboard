import { BsGridFill, BsPeopleFill } from 'react-icons/bs';
import { BiSolidLogOut } from 'react-icons/bi';
import { useNavigate, Link } from 'react-router-dom';
import { usePersistedState } from '../Hooks/usePersistedState';

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
    <aside className="h-screen w-64 min-w-64 flex flex-col justify-between bg-gray-900 text-white p-4 shadow-lg">
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-semibold">
            Hi {firstname || "User"} {lastname}
          </h1>
        </div>

        <nav className="flex flex-col gap-2">
          <Link
            to="/admin-dashboard"
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded transition-colors"
          >
            <BsGridFill className="text-lg" />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            to="/employeetable"
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded transition-colors"
          >
            <BsPeopleFill className="text-lg" />
            <span className="font-medium">Employee</span>
          </Link>

          <Link
            to="/department"
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded transition-colors"
          >
            <BsPeopleFill className="text-lg" />
            <span className="font-medium">Department</span>
          </Link>
        </nav>
      </div>

      <div>
        <button
          onClick={handleSignout}
          className="flex items-center gap-2 w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition duration-200 shadow"
          aria-label="Sign out"
        >
          <BiSolidLogOut className="text-lg" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
