import { logo } from "../assets"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { useState, useContext } from "react"
import { IoMdClose } from "react-icons/io"
import { AiOutlineMenu } from "react-icons/ai"
import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast"
import { AppContext } from "../context/Provider"

// const mobileNav = [
//     {
//         name: 'Profile',
//         url: '/profile'
//     },
//     {
//         name: 'My Team',
//         url: '/teams'
//     },
//     {
//         name: 'Home',
//         url: '/'
//     },
//     {
//         name: 'Event',
//         url: '/event'
//     },
//     {
//         name: 'Partner',
//         url: '/partner'
//     },
//     {
//         name: 'Find Team',
//         url: '/find-team'
//     },
// ]

const navItem = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Event',
        url: '/event'
    },
    {
        name: 'Partner',
        url: '/partner'
    },
    {
        name: 'Mentor',
        url: '/mentor'
    },
    {
        name: 'Find Team',
        url: '/find-team'
    },
]

const dropdown = [
    {
        name: 'Profile',
        url: '/profile'
    },
    {
        name: 'My Team',
        url: '/teams'
    },
]

const Navbar = () => {
    const { repository, userData } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    function handleLogout() {
        repository.userLogout(
            () => {
                toast.dismiss()
                toast.success("Berhasil logout, tunggu beberapa detik")
                localStorage.removeItem('uid')
                navigate("/login")
            },
            (err) => {
                toast.dismiss()
                toast.error(err.message)
            }
        )
    }
    return (
        <div>
            <Toaster />
            <nav className='w-full p-4 border-b border-primary3 sm:flex justify-between flex-row items-center hidden'>
                <NavLink to={'/'}>
                    <img src={logo} alt="logo" className="h-20 w-auto" />
                </NavLink>
                <div className="flex flex-row gap-10 font-semibold text-2xl text-gray-text">
                    {navItem.map(data => (
                        <NavLink key={data.name} className={`hover:text-primary3 ${location.pathname == data.url ? 'text-primary3' : "text-gray-text"}`} to={data.url}>{data.name}</NavLink>
                    ))}
                </div>
                {userData ?
                    <div className="relative">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {userData?.photoURL ? 
                            <img referrerPolicy="no-referrer" src={userData.photoURL} alt="user-photo" className="w-16 h-16 rounded-full" />
                            :
                            <CgProfile className="h-16 w-auto text-primary3 rounded-full" />
                            }
                        </button>
                        <div className={`${isOpen ? 'flex flex-col gap-3' : 'hidden'} px-3 py-4 absolute right-0 bg-white min-w-[14.5rem] z-50 border-[1px] rounded-lg border-primary3`}>
                            {dropdown.map((item) => (
                                <NavLink onClick={() => setIsOpen(false)} to={item.url} key={item.name} className="text-xl font-semibold text-primary3 bg-primary2 hover:bg-primary3 hover:text-primary2 px-4 py-2 rounded-lg">
                                    {item.name}
                                </NavLink>
                            ))}
                            <button onClick={handleLogout} className="text-start text-xl font-semibold text-primary3 bg-primary2 hover:bg-primary3 hover:text-primary2 px-4 py-2 rounded-lg">Logout</button>
                        </div>
                    </div>
                    :
                    <NavLink to={'/login'} className="text-xl bg-primary2 font-semibold text-primary3 px-4 py-2 rounded-lg">
                        Login
                    </NavLink>
                }
            </nav>
            <nav className='block sm:hidden'>
                <div className='flex justify-between w-full py-5 px-4 bg-white'>
                    <NavLink to={'/'}>
                        <img src={logo} alt="logo" className="h-16 w-auto" />
                    </NavLink>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-3xl">
                        {isOpen ?
                            <IoMdClose />
                            :
                            <AiOutlineMenu />
                        }
                    </button>
                </div>
                <div className="flex justify-between">
                    <div className={`${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[100%]"} z-50 fixed pt-16 pb-40 flex flex-col items-center justify-between font-semibold w-full bg-white h-full transition-all`}>
                        <div className='flex flex-col items-center gap-12 text-2xl font-bold text-system-white text-primary3'>
                            {userData ? dropdown.map(data => (
                                <NavLink key={data.name} onClick={() => setIsOpen(false)} to={data.url}>{data.name}</NavLink>
                            )) : null}
                            {navItem.map(data => (
                                <NavLink key={data.name} onClick={() => setIsOpen(false)} to={data.url}>{data.name}</NavLink>
                            ))}
                        </div>
                        {userData ?
                            <button onClick={handleLogout} className="text-start text-xl font-semibold text-primary3 bg-primary2 hover:bg-primary3 hover:text-primary2 px-4 py-2 rounded-lg">Logout</button>
                            :
                            <NavLink to={'/login'} className="text-xl bg-primary2 font-semibold text-primary3 px-4 py-2 rounded-lg">
                                Login
                            </NavLink>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar