import React from "react";
import { useEffect, useState } from "react"
import NewsItem from "./NewsItem"
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { SavedArticles } from "../../data";
import ContactUs from "./ContactUs";
import { useDrawer } from "../context/DrawerContext";

// TODO: - add loading spinner

const FilterNewsItemCont = ({setProgress}) => {
    const {user} = useDrawer();
    const [loading, setLoading] = useState(false)
    const [active, setActive] = React.useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [articlesLength, setArticlesLength] = useState(1)
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [searchChanged, setSearchChanged] = useState(true)
    const search = window.location.pathname.split('/search/')[1].toLowerCase()

    const fetchMultiplePages = async () => {
        try {
            setLoading(true);
            let Articles = [];
            setProgress(40);
            for (let i = 1; i >= 0; i--) {
                let pages = Math.ceil(articlesLength / pageSize)
                let pageNo = (2*page) - i;
                if(pageNo > 2*pages) break;
                let url = `https://api.thenewsapi.com/v1/news/all?api_token=${import.meta.env.VITE_NEWS_API_KEY}&language=en&page=${(2 * page) - i}&search=${search}`;
                // console.log(url)
                const response = await fetch(url);
                if (i === 1) setProgress(70);
                const data = await response.json();
                // console.log(data?.data);
                Articles = Articles.concat(data?.data);
                let totalPosts = Number(data?.meta?.found);
                console.log('found', totalPosts)
                totalPosts = Math.min(totalPosts, 72);
                let maxpagelen = Math.min(totalPosts, pageSize)
                setPageSize(maxpagelen)
                // console.log(totalPosts);
                setArticlesLength(totalPosts);
            }
            setArticles(Articles);
            setProgress(100);
            setLoading(false);
            // console.log(Articles);
        } catch (error) {
            console.log(error.message);
            setArticles([]);
            setProgress(100)
        } finally {
            setLoading(false);
        }
    }


    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        // setArticles(SavedArticles)
        // setSearchChanged(true)
        if(!user) return;
        console.log(search)
        console.log(page)
        if (page !== 1) {
            setActive(1);
            setPage(1);
            console.log('hi')
        } else { // Only fetch if not initialized
            fetchMultiplePages().then(() => setInitialized(true));
        }
        console.log('hi2')
    }, [search]); // Add 'search' as a dependency
    
    useEffect(() => {
        console.log('hi3')
        // console.log(searchChanged)
        if (!initialized) {
            return;
        }
        console.log('hi4')
        fetchMultiplePages();
    }, [active]);
    
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
                                <DefaultPagination pagSize={pageSize} articlesLength={articlesLength} setPage={setPage} setActive={setActive} active={active} />
                            </div>
                            <div className="md:hidden">
                                <SimplePagination pagSize={pageSize} articlesLength={articlesLength} setPage={setPage} setActive={setActive} active={active} />
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default FilterNewsItemCont

function DefaultPagination({ pagSize, articlesLength, setPage, setActive, active }) {
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

function SimplePagination({ pagSize, articlesLength, setPage, setActive, active }) {
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
