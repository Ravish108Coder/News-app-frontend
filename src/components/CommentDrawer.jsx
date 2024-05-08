import React, { useEffect, useRef, useState } from "react";
import {
    Dialog,
    Card,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import {
    Avatar,
    CardHeader,
    Drawer,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography,
} from "@material-tailwind/react";
import { Input, Button } from "@material-tailwind/react";
import { useDrawer } from "../context/DrawerContext";
import { EllipsisVertical } from "lucide-react";

export function CommentDrawer({ articleID, closeDrawerRight, openRight, setOpenRight, article, setSelectedArticle }) {
    // console.log(article)
    
    const [comments, setComments] = useState([])
    const DialogRef = useRef(null)
    const fetchArticleComments = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/api/comment/all/${articleID}`)
        const data = await response.json();
        // console.log(data.data)
        setComments(data.data)
    }
    useEffect(() => {
        if(!openRight) return
        DialogRef?.current?.click()
        fetchArticleComments()
    }, [articleID, openRight])

    const [size, setSize] = React.useState(null);

    const handleOpen = (value) => setSize(value);

    const handleCloseRight = async() => {
        await setOpenRight(false)
       setSize(null)
    //    setSelectedArticle("no article id")
    }


    return (
        <div>
            <Drawer
                placement="right"
                open={openRight}
                onClose={closeDrawerRight}
                className="p-4 z-[19999]"
                size={450}
                overlay={false}
                dismiss={
                    {
                        outsidePress: false
                    }
                }
            >
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Comment Section
                    </Typography>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={handleCloseRight}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                {/* <Typography color="gray" className="mb-8 pr-4 font-normal">
                    {articleID || "no id"}
                </Typography> */}
                <InputWithButton articleID={articleID} fetchArticleComments={fetchArticleComments} />
                <div className="overflow-y-auto max-h-[80%] min-w-[103%] mb-10">
                    {
                        comments.length > 0
                            ?
                            comments.map((item) => {
                                {/* console.log(item) */}
                                return (
                                    <SimpleCard key={item._id} item={item} fetchArticleComments={fetchArticleComments} />
                                )
                            })
                            :
                            'No Comments'
                    }
                </div>
            </Drawer>
            <DialogSizes DialogRef={DialogRef} article={article} handleOpen={handleOpen} size={size} />
        </div>
    );
}

function InputWithButton({ articleID, fetchArticleComments }) {
    const [commentMessage, setCommentMessage] = React.useState("");
    const onChange = ({ target }) =>{
        setCommentMessage(target.value);
    } 
    const { user } = useDrawer()

    const handleAddComment = async (e) => {
        e.preventDefault()
        // console.log(user)
        const formData = {}
        const userID = user._id;
        formData.message = commentMessage;
        formData.userID = userID;
        formData.articleID = articleID;
        const response = await fetch(`${import.meta.env.VITE_SERVER}/api/comment/new`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        const data = await response.json()
        setCommentMessage('')
        fetchArticleComments()
    }

    return (
        <form onSubmit={(e)=>handleAddComment(e)} className="relative flex w-full max-w-[24rem] my-10">
            <Input
                type="text"
                label="Comment"
                value={commentMessage}
                onChange={onChange}
                className="pr-20"
                placeholder="Add Comment..."
                containerProps={{
                    className: "min-w-0",
                }}
            />
            <Button
                type="submit"
                size="sm"
                color={commentMessage ? "gray" : "blue-gray"}
                disabled={commentMessage.length < 3 ? true : false}
                className="!absolute right-1 top-1 rounded"
                // onClick={handleAddComment}
            >
                Send
            </Button>
        </form>
    );
}

function SimpleCard({ item, fetchArticleComments }) {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        if (userData) return
        setLoading(true)
        const fetchUserDetailsFromComments = async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/api/comment/user/${item.userID}`)
            const data = await response.json()
            // console.log(data)
            setUserData(data.data)
            // console.log(data.data)
        }
        fetchUserDetailsFromComments()
        setLoading(false)
    }, [])
    const { user } = useDrawer()
    const handleDeleteComment = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/api/comment/${item._id}`, {
            method: 'DELETE'
        })
        const data = await response.json();
        fetchArticleComments()
    }
    return (<>
        {
            loading ?
                "loading..."
                :
                <div className={`mb-4 ${item.userID !== user._id ? 'bg-blue-500' : 'bg-green-600'} rounded-lg p-3 px-5 text-md relative
                    `}>
                    <div className="mb-2 flex gap-4 items-center">
                        <Avatar
                            size="sm"
                            alt="avatar"
                            src={userData?.avatar}
                            className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
                        />
                        {userData?.username}
                    </div>
                    <div>
                        {item?.message}
                    </div>
                    <div className={`${item.userID !== user._id ? 'hidden' : 'block'} absolute right-3 top-5`} >

                        <Menu placement="left-start" >
                            <MenuHandler >
                                <span className="cursor-pointer"><EllipsisVertical /></span>
                            </MenuHandler>
                            <MenuList className="z-[29998] -p-2 cursor-pointer min-w-0">
                                <div onClick={handleDeleteComment} className="flex gap-4 items-center p-2 px-3">Delete
                                    <IconButton size="md" color="amber">
                                        <i className="fa-solid fa-trash fa-sm"></i>
                                    </IconButton>
                                </div>
                            </MenuList>
                        </Menu>
                    </div>
                </div>

        }
    </>
    );
}

function DialogSizes({ DialogRef, article, handleOpen, size }) {
    

    const [isBookmarked, setIsBookmarked] = useState(false);
    const { title, description, image_url, url } = article
    const urlToImage = image_url;
    const newsImage = "https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"
    const [imageLoaded, setImageLoaded] = useState(false);
    const [addingToFavorite, setAddingToFavorite] = useState(false);
    

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageLoaded(false);
    };
    const noImageUrl = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-21.png";



    return (
        <>
            <Button ref={DialogRef} className="hidden" onClick={() => handleOpen("sm")} variant="gradient">
                Open Dialog SM
            </Button>
            <Dialog
                dismiss={
                    {
                        outsidePress: false
                    }
                }
                open={
                    size !== null
                }
                size={"xs"}
                handler={handleOpen}
                className="mr-[25%] bg-transparent p-4 -ml-[28%] lg:-ml-[5%]"
                // className="bg-transparent"
            >
                <Card className="mt-6 w-96 relative scale-50 md:scale-75 lg:scale-110" style={{ minWidth: '355px', minHeight: '501px' }}>
                    <CardHeader color="blue-gray" style={{ backgroundImage: `url(${newsImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="relative h-56">
                        <img
                            className="w-full h-full"
                            src={urlToImage ? urlToImage : noImageUrl}
                            alt="card-image"
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            style={{
                                display: imageLoaded ? 'block' : 'none',
                            }}
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {
                                !title || title === "[Removed]" ?
                                    "No Title" :
                                    String(title).length > 90 ? String(title).slice(0, 87) + "..." : title
                            }
                        </Typography>
                        <Typography>
                            {
                                !description || description === "[Removed]" ?
                                    "No Description" :
                                    String(description).length > 168 ? String(description).slice(0, 165) + "..." : description
                            }
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0 absolute bottom-0 flex justify-between items-center w-full px-6" style={{ bottom: '-12px' }}>
                        <a href={url} target="_blank">
                            <Button>Read More</Button>
                        </a>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}