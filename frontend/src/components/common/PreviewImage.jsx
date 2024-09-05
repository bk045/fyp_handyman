import React from "react";
import { useState } from "react";

const PreviewImage = ({file}) => {
    const [preview, setPreview] = useState()
    
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onload = () =>{
        setPreview(reader.result)
    }
    return ( 

        <div className="image-preview">
            {preview?<img src={preview} alt="Preview Image" width="100px" height="100px"/>:"Uploading..."}
        </div>
     );
}
 
export default PreviewImage;