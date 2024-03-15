import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";

// TODO: pagination krna hai aur category wise news show krna hai routes ke through shayad optional
// TODO: strong authentication plus pagination
// TODO: infinite scroll, lazy loading shaayad, progress, firebase shayad google auth, nodemailer for gmail 

const NewsItem = ({ article, loading }) => {
    const { title, description, snippet, image_url, url } = article
    const urlToImage = image_url;
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageLoaded(false);
    };
    const noImageUrl = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-21.png";
    return (
        loading ?
            <>
                <div style={{ width: '384px', height: '480px', minWidth:'355px', minHeight:'441px' }} className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 animate-pulse">
                    <div
                        className="relative grid h-56 mx-4 mt-4 overflow-hidden text-gray-700 bg-gray-300 bg-clip-border rounded-xl place-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                            className="w-12 h-12 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z">
                            </path>
                        </svg>
                    </div>
                    <div className="p-6">
                        <div
                            className="block w-56 h-3 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
                            &nbsp;
                        </div>
                        <div
                            className="block w-full h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">
                            &nbsp;
                        </div>
                        <div
                            className="block w-full h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">
                            &nbsp;
                        </div>
                        <div
                            className="block w-full h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">
                            &nbsp;
                        </div>
                        <div
                            className="block w-full h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">
                            &nbsp;
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        <button disabled="" tabIndex="-1"
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none h-8 w-20 bg-gray-300 shadow-none hover:shadow-none"
                            type="button">
                            &nbsp;
                        </button>
                    </div>
                </div>
            </>
            :


            <Card className="mt-6 w-96 relative" style={{ width: '384px', height: '480px', minWidth:'355px', minHeight:'441px' }}>
                <CardHeader color="blue-gray" className="relative h-56">
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
                                String(title).length > 50 ? String(title).slice(0, 47) + "..." : title
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
                <CardFooter className="pt-0 absolute bottom-0" style={{ bottom: '-12px' }}>
                    <a href={url} target="_blank">
                        <Button>Read More</Button>
                    </a>
                </CardFooter>
            </Card>
    )
}

export default NewsItem