import React, { useState } from "react";
import axios from "axios";
import './App.css'

const App = () => {

    const [file, setFile] = useState(null); // where im storing the selected file
    const [fromLang, setFromLang] = useState("English");
    const [toLang , setToLang] = useState("English");

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
      //setFromLang("English");
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
      formData.append("myFile", file); 
      formData.append("fromLang", fromLang); 
      formData.append("toLang", toLang); 

      console.log(formData.get("myFile"))
      console.log(formData.get("fromLang"));
      console.log(formData.get("toLang"));
      // axios.post("yuwenapi/upload", formData) // send to yuwen api
      alert("File uploaded sucesfully");
    };

    return (
      <div className = "mainBox">
          <h1 class = "b">Deliverable 1.2</h1>
          <input type="file" onChange={handleFileChange} /> 
          <button onClick={handleUpload}>Translate</button> 

          <br></br>
          <label >
          <select value={fromLang} onChange={handleOptionChange('from')}>
              
              <option value="English">English</option>
              <option value="Irish">Irish</option>
              <option value="French">French</option>
              <option value="German">German</option>
          </select>

          </label>

          <select value={toLang} onChange={handleOptionChange('to')}>
              
              <option value="English">English</option>
              <option value="Irish">Irish</option>
              <option value="French">French</option>
              <option value="German">German</option>
          </select>


          {file&& <p>{file.name}</p>}
      </div>
  );
};
export default App;

