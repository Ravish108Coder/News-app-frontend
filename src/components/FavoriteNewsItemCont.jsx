import { useEffect, useState } from "react"
import FavoriteNewsItem from "./FavoriteNewsItem"
import ContactUs from "./ContactUs"

const FavoriteNewsItemCont = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

    const handleDeleteFromFavorite = async (article) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/api/user/deleteFromFavorite`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(article)
                }
            );
            const data = await response.json();
            if (data.success) {
                setArticles((prevArticles) => {
                    return prevArticles.filter((item) => item.uuid !== article.uuid)
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        console.log('fetching favorite articles')
        const fetchFavoriteArticles = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER}/api/user/favoriteArticles`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json()
                if (data.status) {
                    setArticles(data.articles)
                }
                setLoading(false)
            } catch (error) {
                console.log(error.message)
                setLoading(false)
            }
        }
        fetchFavoriteArticles()
    }, [])

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
                                // Favorite News Items

                                articles.length>0 ?
                                    articles?.map((article, index) => {
                                        return (
                                            <FavoriteNewsItem key={article.uuid} article={article} loading={loading} handleDeleteFromFavorite={handleDeleteFromFavorite} />
                                        )
                                    })
                                    :
                                    <h2>No Favorite articles found</h2>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default FavoriteNewsItemCont