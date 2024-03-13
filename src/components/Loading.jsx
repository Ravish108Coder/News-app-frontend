import { Audio } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="flex" style={{height: "80vh"}}>
            <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
            />
        </div>

    )
}

export default Loading