import { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import "./InputProducts.css";
function InputProducts() {
  const [imgFiles, setImgfiles] = useState([]);
  const [imgFileNames, setImgfileNames] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [videoFileName, setVideoFileName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [desc, setDesc] = useState("");
  const [completeDesc, setCompleteDesc] = useState("");
  const [category, setCategory] = useState([]);
  const handleSelectChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setCategory(selectedValues);
  };
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImgfiles((prevImages) => [...prevImages, ...selectedImages]);
    const imageNames = selectedImages.map((image) => image.name);
    setImgfileNames((prevFileNames) => [...prevFileNames, ...imageNames]);
  };
  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setVideoFile(selectedVideo);
    setVideoFileName(selectedVideo.name);
  };
  const productRef = collection(db, "Necklases");
  const upload = async (e) => {
    e.preventDefault();
    const imageURLs = [];
    let videoDownloadURL = "";
    // get the url of video
    if (videoFile) {
      const storageRef = ref(storage, `necklases/${videoFile.name}`);
      await uploadBytes(storageRef, videoFile);
      videoDownloadURL = await getDownloadURL(storageRef);
    }
    for (const image of imgFiles) {
      const storageRef = ref(storage, `necklases/${image.name}`);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      imageURLs.push(downloadURL);
    }
    if (imageURLs.length === imgFiles.length) {
      await addDoc(productRef, {
        image: imageURLs,
        video: videoDownloadURL,
        productName: productName,
        price: price,
        rating: rating,
        desc: desc,
        completeDesc: completeDesc,
        category: category,
        uniqueId: uuidv4(),
      });
    }
  };
  return (
    <div className="input__products">
      <h3>Enter the product details to be uploaded </h3>
      <form>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="enter product name"
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="enter price"
        />
        <input
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="enter rating"
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="enter one line desc"
        />
        <input
          type="text"
          value={completeDesc}
          onChange={(e) => setCompleteDesc(e.target.value)}
        />
        <select
          multiple
          value={category}
          onChange={handleSelectChange}
          placeholder="Enter category"
        >
          <option value="NewArrivals">NewArrivals</option>
          <option value="Necklases">Necklase</option>
          <option value="Earrings">Earrings</option>
          <option value="Bracelet">Bracelet</option>
          <option value="Ring">Ring</option>
        </select>
        <input type="file" multiple onChange={handleImageChange} />
        <input type="file" onChange={handleVideoChange} />
        <button onClick={upload}>Upload Image</button>
        {/* <button onClick={uploadData}>Upload</button> */}
      </form>
      <div className="image-preview">
        {imgFiles.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Image ${index}`}
            className="preview-image"
            style={{ width: "100px", height: "100px" }}
          />
        ))}
        <video>
          <source src={videoFile} type="video/mp4" />
        </video>
      </div>
      <div className="file-names">
        <strong>Selected File Names:</strong>
        <ul>
          {imgFileNames.map((fileName, index) => (
            <li key={index}>{fileName}</li>
          ))}
        </ul>
        <ul>
          <li>{videoFileName}</li>
        </ul>
      </div>
      <div className="entered-Details">
        <h3>Entered Details</h3>
        <p>Product Name: {productName}</p>
        <p>Price: {price}</p>
        <p>Rating: {rating}</p>
        <p>Desc: {desc}</p>
        <p>Complete Desc: {completeDesc}</p>
        <p>Category: {category}</p>
      </div>
    </div>
  );
}

export default InputProducts;
