import React, { useState } from "react";
import ProgressBar from './progressBar';

function UploadForm (){

  const [File, setFile] = useState(null);
  // types of image formats allowed
  const types = ['image/png', 'image/jpeg'];
  const [Error, setError] = useState(null);

  function changeHandler(e){
   let selected = e.target.files[0];

   // check if we actually have a file selected and the type of file is jpeg or png
   if(selected && types.includes(selected.type)) {
     setFile(selected);
     setError('');
   } else {
     setFile(null);
     setError('Please select an image file [png or jpeg]');
   }
 }

  return(
    <form>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>
      <div className="output">
      {/*If we get error then display error, else show the filename*/}
        { Error && <div className="error">{ Error }</div> }
        { File && <div>{ File.name }</div> }
        {File && <ProgressBar file = {File} setFile = {setFile} />}
      </div>
    </form>
  )
};

export default UploadForm;
