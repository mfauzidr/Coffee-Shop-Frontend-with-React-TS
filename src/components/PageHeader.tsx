import React from 'react';

interface PageHeaderProps {
    pageName: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageName }) => {
    return (
        <div className="flex w-full">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium">{pageName}</h1>
        </div>
    );
};

export default PageHeader;
