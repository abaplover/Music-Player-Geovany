import React, {useState} from 'react';
import '../Style.css';


function FileUploadPage () {

	const [selectedFile, setSelectedFile] = useState();
	


	const changeHandler = (event) => {

		setSelectedFile(event.target.files[0]);


	};

const handleSubmission = () => {
var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic RGV2VXNlcjpEZXZlbG9wZXJzMTIzJA==");

var formdata = new FormData();
formdata.append("Title", document.getElementById('Name').value);
formdata.append("Genre", document.getElementById('Genre').value);
formdata.append("Artist", document.getElementById('Artist').value);
formdata.append("Duration", "300");
formdata.append("Src", selectedFile.files[0], "[PROXY]");
formdata.append("SongImg", selectedFile.files[0], "[PROXY]");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://mcqueeninc.net/api/song", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}
  
	return(

   <div>

			
			<form action="#" id="myForm">
        <fieldset>
          <div className="formbox">
          <input type="file" id="Name" name="Name" onChange={changeHandler} />
          </div>
           <div className="formBox">
            <label htmlFor="Genre">Genero</label
            ><input
              type="text"
              id="Genre"
              name="Genre"
            />
          </div>
          <div className="formBox">
            <label htmlFor="Artist">Artista</label>
            <input
              type="text"
              id="Artist"
              name="Artist"
              required
            />
          </div>
          <div className="formBox">
            <label htmlFor="IsYoutube">Youtube?:</label>
            <input type="checkbox" id="IsYoutube" name="IsYoutube"  />
          </div>
          <div className="formBox">
            <label htmlFor="IsBlocked">Bloqueado?:</label>
            <input type="checkbox" id="IsYoutube" name="IsBlocked"  />
          </div>
          
        </fieldset>
      </form>
			
      

			<div>

				<button onClick={handleSubmission}>Submit</button>

			</div>

		</div>

	)

  


}


export default FileUploadPage;