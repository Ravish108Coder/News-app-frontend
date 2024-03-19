import React from "react";
import { useEffect, useState } from "react"
import NewsItem from "./NewsItem"
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { SavedArticles } from "../../data";
import ContactUs from "./ContactUs";

// TODO: - add loading spinner

const NewsItemsCont = ({ category = "general", setProgress }) => {
    const [loading, setLoading] = useState(false)
    const [active, setActive] = React.useState(1);
    const pagSize = 6
    const [articlesLength, setArticlesLength] = useState(1)
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [categoryChanged, setCategoryChanged] = useState(false);
    const prodenv = import.meta.env.VITE_PROD_ENV;
    const fetchData = async () => {
        setLoading(true); // Move setLoading inside the fetchData function to ensure it's always executed
        try {
            const apiKey = import.meta.env.VITE_NEWS_API_KEY;
            // const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=in&apiKey=${apiKey}&page=${page}&pageSize=${pagSize}`;
            // const url = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=in&page=${page}$categories=${category}`;
            const url = `https://api.thenewsapi.com/v1/news/all?api_token=${apiKey}&locale=in&language=en&categories=${category}&page=${page}`;
            // console.log(url)
            setProgress(30);
            const response = await fetch(url);
            setProgress(70);
            const data = await response.json();
            // console.log(data?.data);
            setArticles(data?.data);
            // console.log(data?.meta?.found)
            let totalPosts = Number(data?.meta?.found);
            totalPosts = Math.min(totalPosts, 72);
            // console.log(totalPosts);
            setArticlesLength(totalPosts);
            setProgress(100);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false); // Move setLoading inside the finally block to ensure it's always executed
        }
    };
    const fetchMultiplePages = async () => {
        try {
            setLoading(true);
            let Articles = [];
            setProgress(40);
            for (let i = 1; i >= 0; i--) {
                let url = `https://api.thenewsapi.com/v1/news/all?api_token=${import.meta.env.VITE_NEWS_API_KEY}&language=en&categories=${category}&page=${(2 * page) - i}`;
                console.log(url)
                const response = await fetch(url);
                if (i === 1) setProgress(70);
                const data = await response.json();
                console.log(data?.data);
                Articles = Articles.concat(data?.data);
                let totalPosts = Number(data?.meta?.found);
                totalPosts = Math.min(totalPosts, 72);
                console.log(totalPosts);
                setArticlesLength(totalPosts);
            }
            setArticles(Articles);
            setProgress(100);
            setLoading(false);
            console.log(Articles);
        } catch (error) {
            console.log(error.message);
            setArticles([]);
        } finally {
            setLoading(false);
        }
    }

    const ManuallyLoadForSomeTime = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    const OverRequestNewsApiPreSavedArticlesSetCalling = () => {
        const shuffleArray = (array) => {
            // Loop over the array starting from the end
            for (let i = array.length - 1; i > 0; i--) {
                // Generate a random index between 0 and i (inclusive)
                const j = Math.floor(Math.random() * (i + 1));
                // Swap the current element with the randomly selected element
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        const ShuffledSavedArticles = shuffleArray(SavedArticles);
        setProgress(30);
        ManuallyLoadForSomeTime();
        setProgress(70);
        setArticles(ShuffledSavedArticles);
        setArticlesLength(60);
        setProgress(100);
    }
    const offline = (prodenv === "Development"); // TODO: check if offline
    useEffect(() => {
        // console.log('category changed', category)
        setArticles(SavedArticles)
        if (page === 1) {

            // fetchData();
            if (offline) {
                OverRequestNewsApiPreSavedArticlesSetCalling();
            } else {
                fetchMultiplePages();
            }
            // fetchMultiplePages();
            // OverRequestNewsApiPreSavedArticlesSetCalling();
        } else {
            setActive(1);
            setPage(1);
        }
        setCategoryChanged(true)
    }, [category]); // Include category in the dependency array

    useEffect(() => {
        if (!categoryChanged) return;
        // fetchData(); // Fetch data when category changes
        if (offline) {
            OverRequestNewsApiPreSavedArticlesSetCalling();
        } else {
            fetchMultiplePages();
        }
        // fetchMultiplePages();
        // OverRequestNewsApiPreSavedArticlesSetCalling();
    }, [active]); // Include active, page, and categoryChanged in the dependency array

    {/* loading ? <div className="absolute" style={{left: '47%', top: '45%'}}><Loading /></div> :  */ }
    return (
        <>
            {
                <>
                    <div className="h-0">
                        <ContactUs />
                    </div>
                    <div>
                        <div className="news-item-cont flex w-full px-12 py-10 items-center justify-center flex-wrap
                md:space-x-4 gap-y-8"
                        >
                            {
                                // News Items

                                articles ?
                                    articles?.map((article, index) => {
                                        return (
                                            <NewsItem key={article.uuid} article={article} loading={loading} />
                                        )
                                    })
                                    :
                                    <h2>No articles found</h2>
                            }
                        </div>
                        <div className="news-item-cont flex w-full px-12 py-10 items-center justify-center">
                            <div className="hidden md:block">
                                <DefaultPagination pagSize={pagSize} articlesLength={articlesLength} setPage={setPage} fetchData={fetchData} setActive={setActive} active={active} />
                            </div>
                            <div className="md:hidden">
                                <SimplePagination pagSize={pagSize} articlesLength={articlesLength} setPage={setPage} fetchData={fetchData} setActive={setActive} active={active} />
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default NewsItemsCont

function DefaultPagination({ pagSize, articlesLength, setPage, fetchData, setActive, active }) {
    let pages = Math.ceil(articlesLength / pagSize)


    const getItemProps = (index) => {
        if (index === active) {
            return {
                variant: "filled",
                color: "gray",
                onClick: () => {
                    setActive(prev => index);
                    setPage(prev => index);
                }
            };
        } else {
            return {
                variant: "text",
                color: "gray",
                onClick: () => {
                    setActive(prev => index);
                    setPage(prev => index);
                }
            };
        }
    };


    const next = () => {
        if (active === pages) return;

        setActive(active => active + 1);
        setPage(active => active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active => active - 1);
        setPage(active => active - 1);
    };

    return (
        <div className="w-screen flex justify-center">
            <div className="flex items-center gap-4 fixed bottom-2 bg-white rounded-3xl py-2 shadow-[0px_10px_40px_10px_#4a5568]">
                <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">
                    {Array.from({ length: pages }, (_, index) => (
                        <IconButton key={index + 1} {...getItemProps(index + 1)}>
                            {index + 1}
                        </IconButton>
                    ))}
                </div>


                <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={next}
                    disabled={active === pages}
                >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

function SimplePagination({ pagSize, articlesLength, setPage, fetchData, setActive, active }) {
    let pages = Math.ceil(articlesLength / pagSize)
    // const [active, setActive] = React.useState(1);

    const next = () => {
        if (active === pages) return;

        setActive(active => active + 1);
        setPage(active => active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active => active - 1);
        setPage(active => active - 1);
    };

    return (
        <div className="w-screen flex justify-center">
            <div className="flex items-center gap-8 fixed bottom-2 bg-white rounded-3xl py-2 px-4 shadow-[0px_10px_40px_10px_#4a5568]">
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page <strong className="text-gray-900">{active}</strong> of{" "}
                    <strong className="text-gray-900">{pages}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={next}
                    disabled={active === pages}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </div>
        </div>
    );
}
