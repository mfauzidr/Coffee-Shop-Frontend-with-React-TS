import NoImg from '../assets/img/no-image.png';

interface ImageProductProps {
  image: string;
  smallImages: {
    small: string[];
  };
}

const ImageProduct = ({ image, smallImages }: ImageProductProps) => {
  const { small } = smallImages;
  const defaultImage = NoImg;

  return (
    <div className="flex-1 container">
      <div className="grid grid-cols-1 gap-5">
        <div>
          <img src={image ? `${image}` : defaultImage} alt="Large Image" className="w-full h-72 md:h-96 object-cover object-center" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {small.map((smallImage, index) => (
            <img key={index} src={smallImage} alt={`Small Image ${index + 1}`} className="w-full h-auto" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageProduct;
