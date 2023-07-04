import { PropsWithChildren } from 'react';

const Title: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <h1 className='text-2xl pb-2'>
            {children}
        </h1>
    );
}

export default Title;
