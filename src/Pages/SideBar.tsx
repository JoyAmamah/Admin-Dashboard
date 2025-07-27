import { BsGridFill, BsPeopleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { usePersistedState } from '../Hooks/usePersistedState';
import { BiSolidLogOut } from 'react-icons/bi';
import DarkModeToggle from '../Hooks/DarkModeToggle';

const SideBar = () => {
  const [isSignedIn, setIsSignedIn] = usePersistedState("isSignedIn", false);
  const [firstname] = usePersistedState("firstname", "");
  const [lastname] = usePersistedState("lastname", "");

  const navigate = useNavigate();

  const handleSignout = () => {
    setIsSignedIn(false); 
    alert("Logout successful!");
    navigate("/signin");
  };

  return (
    <section className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Hi {firstname} {lastname}</h1>

      <a href='/admin-dashboard' className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded">
        <BsGridFill className="text-lg" />
        Dashboard
      </a>

      <a href="/employeetable" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded">
        <BsPeopleFill className="text-lg" />
        Employee
      </a>

      <a href="/department" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded">
        <BsPeopleFill className="text-lg" />
        Department
      </a>

      <DarkModeToggle />

      <button
        onClick={handleSignout}
        className="flex items-center gap-3 text-gray-300 bg-red-700 hover:text-white hover:bg-red-400 p-2 rounded"
      >
        <BiSolidLogOut className="text-lg" />
        SignOut
      </button>
    </section>
  );
};

export default SideBar;
