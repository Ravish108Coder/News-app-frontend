import React, { useEffect } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    Bars4Icon,
    GlobeAmericasIcon,
    NewspaperIcon,
    PhoneIcon,
    RectangleGroupIcon,
    SquaresPlusIcon,
    SunIcon,
    TagIcon,
    UserGroupIcon,

    BriefcaseIcon,
    FilmIcon,
    HomeIcon,
    HeartIcon,
    BeakerIcon,
    TrophyIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// redux & useSelector or useeffect backend call response check status check set user logged in info in state variable

const navListMenuItems = [
    // business entertainment general health science sports technology
    {
        title: "Business",
        description: "Find the perfect solution for your needs.",
        icon: BriefcaseIcon,
    },
    {
        title: "Entertainment",
        description: "Meet and learn about our dedication",
        icon: FilmIcon,
    },
    {
        title: "General",
        description: "Find the perfect solution for your needs.",
        icon: HomeIcon,
    },
    {
        title: "Health",
        description: "Learn how we can help you achieve your goals.",
        icon: HeartIcon,
    },
    {
        title: "Science",
        description: "Reach out to us for assistance or inquiries",
        icon: BeakerIcon,
    },
    {
        title: "Sports",
        description: "Find the perfect solution for your needs.",
        icon: TrophyIcon,
    },
    {
        title: "Technology",
        description: "Read insightful articles, tips, and expert opinions.",
        icon: TrophyIcon,
    }
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    const renderItems = navListMenuItems.map(
        ({ icon, title, description }, key) => (
            // <div onClick={() => {
            //     const currentPath = window.location.pathname;
            //     const sectionRoot = currentPath.split('/')[1]; // Get the root of the current section
            //     console.log(sectionRoot);
            //     const newPath = currentPath.endsWith(sectionRoot) ? `/${String(title).toLowerCase()}` : `/${sectionRoot}/${String(title).toLowerCase()}`;
            //     console.log(newPath);
            //     navigate(String(newPath));
            // }} key={key}>
            <Link to={"/" + String(title).toLowerCase()} key={key}>
            {/* <Link to={"/hello"}> */}
                <MenuItem className="flex items-center gap-3 rounded-lg">
                    <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                        {" "}
                        {React.createElement(icon, {
                            strokeWidth: 2,
                            className: "h-6 text-gray-900 w-6",
                        })}
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="flex items-center text-sm font-bold"
                        >
                            {title}
                        </Typography>
                    </div>
                </MenuItem>
                {/* </div> */}
                </Link>
            
        ),
    );

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography as="div" variant="small" className="font-medium">
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            Categories
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                    <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </React.Fragment>
    );
}

function NavList() {
    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            <Link to="/" className="text-blue-gray font-medium">
                <ListItem className="flex items-center gap-2 py-2 pr-4" component="div">
                    <Typography variant="small" color="blue-gray">
                        Home
                    </Typography>
                </ListItem>
            </Link>
            <NavListMenu />
            

            <Link to="/contact" className="text-blue-gray font-medium">
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    <Typography variant="small" color="blue-gray">
                        Contact Us
                    </Typography>
                </ListItem>
            </Link>

        </List>
    );
}

export default function NavbarWithMegaMenu() {
    const [openNav, setOpenNav] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3333/api/auth/verify", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                if (data?.status) {
                    setIsLoggedIn(true);
                    toast.success(data?.message || "Success Notification !");
                } else {
                    toast.error(data?.message || "Something went wrong !");
                }
            } catch (error) {
                toast.error(error?.message || "Something went wrong !");
            }
        }
        fetchData();
    }, []);

    const handleLogout = () => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3333/api/auth/logout", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                if (data?.status) {
                    setIsLoggedIn(false);
                    navigate('/signin');
                    toast.success(data?.message || "Success Notification !");
                } else {
                    toast.error(data?.message || "Something went wrong !");
                }
            } catch (error) {
                toast.error(error?.message || "Something went wrong !");
            }
        }
        fetchData();
    }

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <Navbar className="sticky top-0 z-10 mx-auto max-w-screen-xl px-4 py-2">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link to="/" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
                    <Typography variant="h6">
                        News App
                    </Typography>
                </Link>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div className="hidden gap-2 lg:flex">
                    {/* either redux or prop drilling store user logged in info */}
                    {
                        isLoggedIn ?
                            <Button onClick={handleLogout} variant="outlined" size="sm" color="amber">
                                Log Out
                            </Button>
                            :
                            <Link to={"/signin"}>
                                <Button variant="text" size="sm" color="blue-gray">
                                    Log In
                                </Button>
                            </Link>
                    }
                    {
                        isLoggedIn ? null :
                            <Link to={"/signup"}>
                                <Button variant="gradient" size="sm">
                                    Register
                                </Button>
                            </Link>
                    }
                    {/* <Link to={"/signup"}>
                        <Button variant="gradient" size="sm">
                            Register
                        </Button>
                    </Link> */}
                </div>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
                <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                    <Link to={"/signin"}>
                        <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
                            Log In
                        </Button>
                    </Link>
                    <Link to={"/signup"}>
                        <Button variant="gradient" size="sm" fullWidth>
                            Register
                        </Button>
                    </Link>
                </div>
            </Collapse>
        </Navbar>
    );
}