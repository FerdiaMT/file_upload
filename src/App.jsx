import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [file, setFile] = useState(null); // where im storing the selected file
    const [fromLang, setFromLang] = useState("");
    const [toLang , setToLang] = useState("");

    const handleFileChange = (e) => {

      const selectedFile = e.target.files[0];// .files[0] is required here
      if (!selectedFile.name.endsWith('.vtt')) {
        alert("file must end with .vtt");
        return; 
      }
      setFile(selectedFile);

      // this will also be some api work
      // for now its going to default to english
      // axios.post("detectLang"); <- for later
      setFromLang("English");
    };

    const handleOptionChange = (direction) => (e) => {
      if(direction === 'from'){
        setFromLang(e.target.value); // Update state with the selected dropdown option
      }else{
        setToLang(e.target.value)
      }
    };



    const handleUpload = () => {

        if (!file){
          alert("No file has been selected");
          return; // give up here if no file present
        }

        if(!file.name.endsWith('.vtt')){
          alert("File must end with .vtt");
          return; // add more to here later
        }


        const formData = new FormData(); // formData object
        formData.append("myFile", file, file.name); 
        formData.append("fromLang", fromLang); 
        formData.append("toLang", toLang); 

        axios.post("yuwenapi/upload", formData) // send to yuwen api
        alert("File uploaded sucesfully");
    };

    return (
        <div>
            <h1>Deliverable 1.2</h1>
            <input type="file" onChange={handleFileChange} /> 
            <button onClick={handleUpload}>Translate</button> 

            <select value={fromLang} onChange={handleOptionChange('from')}>
                <option value="">From</option>
                <option value="option1">English</option>
                <option value="option2">Irish</option>
                <option value="option3">French</option>
                <option value="option4">German</option>
            </select>

            <select value={toLang} onChange={handleOptionChange('to')}>
                <option value="">To</option>
                <option value="option1">English</option>
                <option value="option2">Irish</option>
                <option value="option3">French</option>
                <option value="option4">German</option>
            </select>


            {file&& <p>{file.name}</p>}
        </div>
    );
};

export default App;