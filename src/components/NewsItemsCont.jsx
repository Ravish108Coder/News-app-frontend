import React from "react";
import { useEffect, useState } from "react"
import NewsItem from "./NewsItem"
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

// TODO: - add loading spinner

const NewsItemsCont = ({category="general"}) => {
    // const [loading, setLoading] = useState(false)
    const [active, setActive] = React.useState(1);
    const pagSize = 6
    const [articlesLength, setArticlesLength] = useState(0)
    const [articles, setArticles] = useState([])
    // const [Category, setCategory] = useState('hello')
    const [page, setPage] = useState(1)

    const fetchData = async () => {
        try {
            const apiKey = import.meta.env.VITE_NEWS_API_KEY;
            const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=in&apiKey=${apiKey}&page=${page}&pageSize=${pagSize}`;
            console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            setArticles(data.articles);
            setArticlesLength(data.totalResults);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        } finally {
            // setLoading(false); // Move setLoading inside the finally block to ensure it's always executed
        }
    };

    useEffect(() => {
        // setLoading(true);
        // setActive(1);
        console.log('hello')
        const solve = async () => {
            await setPage(1);
            await setActive(1);
            await fetchData();
        }
        solve();
        
    }, [category]); // Include category and page in the dependency array
    

    return (
        <div>
            <div className="news-item-cont flex w-full px-12 py-10 items-center justify-center flex-wrap
                space-x-4 gap-y-8">
                {
                    // News Items
                    articles?.map((article, index) => {
                        return (
                            <NewsItem key={index} article={article}  />
                        )
                    })
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
    

    const getItemProps = (index) =>
    ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => {
            setActive(index),
            setPage(index),
            fetchData()
        },
    });

    const next = () => {
        if (active === pages) return;

        setActive(active + 1);
        setPage(active + 1);
        fetchData()
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
        setPage(active - 1);
        fetchData()
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