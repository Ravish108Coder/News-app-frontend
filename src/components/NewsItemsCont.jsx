import React from "react";
import { useEffect, useState } from "react"
import NewsItem from "./NewsItem"
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Loading from "./Loading";

// TODO: - add loading spinner

const NewsItemsCont = ({ category = "general", setProgress }) => {
    const [loading, setLoading] = useState(false)
    const [active, setActive] = React.useState(1);
    const pagSize = 6
    const [articlesLength, setArticlesLength] = useState(1)
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)

    const fetchData = async () => {
        setLoading(true); // Move setLoading inside the fetchData function to ensure it's always executed
        try {
            const apiKey = import.meta.env.VITE_NEWS_API_KEY;
            const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=in&apiKey=${apiKey}&page=${page}&pageSize=${pagSize}`;
            console.log(url);
            setProgress(30);
            const response = await fetch(url);
            setProgress(70);
            const data = await response.json();
            setArticles(data.articles);
            setArticlesLength(data.totalResults);
            setProgress(100);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false); // Move setLoading inside the finally block to ensure it's always executed
        }
    };
    const [categoryChanged, setCategoryChanged] = useState(false);
    useEffect(() => {
        if (page === 1) {
            fetchData();
        } else {
            setActive(1);
            setPage(1);
        }
        setCategoryChanged(true)
        console.log('category wala')
    }, [category]); // Include category in the dependency array

    useEffect(() => {
        if (!categoryChanged) return;
        // console.log('active = ', active);
        fetchData(); // Fetch data when category changes
        console.log('active wala');
    }, [active]); // Include active, page, and categoryChanged in the dependency array




    {/* style={{paddingTop: '350px'}} in loading div */}

    return (
        <div>
            <div className="news-item-cont flex w-full px-12 py-10 items-center justify-center flex-wrap
                space-x-4 gap-y-8"
                >
                {
                    // News Items
                    loading ?
                        <div className="flex items-center justify-center" style={{height: "1656px"}}><Loading /></div>
                        :
                        articles?
                        articles?.map((article, index) => {
                            return (
                                <NewsItem key={index} article={article} />
                            )
                        })
                        :
                        <h2>No articles found</h2>
                }
            </div>
            <div className="news-item-cont flex w-full px-12 py-10 items-center justify-center">
                <DefaultPagination pagSize={pagSize} articlesLength={articlesLength} setPage={setPage} fetchData={fetchData} setActive={setActive} active={active} />
            </div>
        </div>
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
        <div className="flex items-center gap-4">
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
                disabled={active === 5}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}