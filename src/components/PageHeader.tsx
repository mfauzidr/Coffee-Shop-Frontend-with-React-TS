
interface PageHeaderProps {
    pageName: string;
}

const PageHeader = ({ pageName }: PageHeaderProps) => {
    return (
        <div className="flex w-full">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium">{pageName}</h1>
        </div>
    );
};

export default PageHeader;
