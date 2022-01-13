import React, { useState, useRef } from 'react';

import classes from './FileUploadPage.module.css';


function FileUploadPage() {

  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileMp3, setSelectedFileMp3] = useState();



  const nameInputRef = useRef();
  const genreInputRef = useRef();
  const artistInputRef = useRef();
  const durationInputRef = useRef();
  const youtubeInputRef = useRef();
  const blockedInputRef = useRef()

  const changeHandlerImg = (event) => {

    setSelectedFile(event.target.files[0]);

  };
  const changeHandlerMp3 = (event) => {

    setSelectedFileMp3(event.target.files[0]);

  };

  function submitHandler(event) {
    event.preventDefault();
    handleSubmission();
  }

  const handleSubmission = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic RGV2VXNlcjpEZXZlbG9wZXJzMTIzJA==");

    var formdata = new FormData();
    formdata.append("Title", nameInputRef.current.value);
    formdata.append("Genre", genreInputRef.current.value);
    formdata.append("Artist", artistInputRef.current.value);
    formdata.append("Duration", durationInputRef.current.value);
    formdata.append("Src", selectedFileMp3, selectedFileMp3.name);
    formdata.append("SongImg", selectedFile, selectedFile.name);
    formdata.append("IsYoutube", youtubeInputRef.current.checked);
    formdata.append("IsBlocked", blockedInputRef.current.checked);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    // fetch("https://mcqueeninc.net/api/song", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    document.getElementById('songForm').reset();

  }

  return (

    <div>

      <form id='songForm' className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='Name'>Song Name</label>
          <input type='text' required id='name' ref={nameInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor='Genre'>Genre</label>
          <input type='text' ref={genreInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor='Artist'>Artist</label>
          <input type='text' ref={artistInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='Duration'>Duration /sec</label>
          <input type='number' ref={durationInputRef} />
        </div>
        <div className={classes.checkbox}>
          <label htmlFor='youtube'>Is it in Youtube? /sec</label>
          <input type='checkbox' ref={youtubeInputRef} />
        </div>
        <div className={classes.checkbox}>
          <label htmlFor='blocked'>Is it blocked /sec</label>
          <input type='checkbox' ref={blockedInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='Image'>Song Image</label>
          <input type='file' onChange={changeHandlerImg} />
        </div>
        <div className={classes.control}>
          <label htmlFor='Mp3'>Song Mp3 File</label>
          <input type='file' onChange={changeHandlerMp3} />
        </div>
        <div className={classes.actions}>
          <button>Add Song</button>
        </div>
      </form>

    </div>

  )

}


export default FileUploadPage;