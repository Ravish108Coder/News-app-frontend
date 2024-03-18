import { Audio } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className='main w-screen h-screen flex items-center justify-center'>
            <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass="pb-32"
            />
        </div>
    )
}

export default Loading