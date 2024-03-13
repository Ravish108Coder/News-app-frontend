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

const NewsItem = ({ article }) => {
    const {title, description, snippet, image_url, url } = article
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
        <Card className="mt-6 w-96 relative" style={{ width: '384px', height: '480px' }}>
            <CardHeader color="blue-gray" className="relative h-56">
                <img
                    className="w-full h-full"
                    src={urlToImage? urlToImage : noImageUrl }
                    alt="card-image"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ display: imageLoaded ? 'block' : 'none',
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
                            String(description).length > 98 ? String(description).slice(0, 95) + "..." : description
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