
import NoImg from '../assets/img/no-image.png'

const ImageProduct = ({ image, smallImages }) => {
  const { small } = smallImages
  const defaultImage = NoImg
  
  return (
    <div className="flex-1 container">
      <div className="grid grid-cols-1 gap-7">
        <div>
          <img src={image? `http://localhost:8888/uploads/products/${image}` : defaultImage} alt="Large Image" className="w-full h-auto" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {small.map((smallImage, index) => (
            <img key={index} src={smallImage} alt={`Small Image ${index + 1}`} className="w-full h-auto" />
          ))}
        </div>
      </div>
    </div>
  )
}
  
export default ImageProduct
