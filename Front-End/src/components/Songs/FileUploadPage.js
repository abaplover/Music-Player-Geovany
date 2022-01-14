import React, { useState, useRef } from 'react';

import classes from './FileUploadPage.module.css';
import Card from '../UI/Card';
import { Checkbox } from 'semantic-ui-react';
import DatePicker from 'react-date-picker'

function FileUploadPage() {

  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileMp3, setSelectedFileMp3] = useState();
  const [Blocked, setBlocked] = useState(false);
  const [ReleaseDate, setDate] = useState(new Date());

  const nameInputRef = useRef();
  const genreInputRef = useRef();
  const artistInputRef = useRef();
  const durationInputRef = useRef();
  const youtubeUrlInputRef = useRef();

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
    formdata.append("ReleaseDate", ReleaseDate);

    if (youtubeUrlInputRef.current.value) {
      formdata.append("IsYoutube", true)
    }
    else {
      formdata.append("IsYoutube", false)
    }
    formdata.append("YoutubeUrl", youtubeUrlInputRef.current.value);
    formdata.append("isBlocked", Blocked);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://mcqueeninc.net/api/song", requestOptions)
      .then(response => {response.text()
        document.getElementById('songForm').reset();
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }

  return (
    <Card>
      <div>
        <form id='songForm' className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='Name'>Song Name</label>
            <input type='text' required id='name' ref={nameInputRef} />
          </div>

          <div className={classes.control}>
            <label htmlFor='Genre'>Genre</label>
            <input type='text' ref={genreInputRef} required />
          </div>

          <div className={classes.control}>
            <label htmlFor='Artist'>Artist</label>
            <input type='text' ref={artistInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor='Duration'>Duration /sec</label>
            <input type='number' ref={durationInputRef} required />
          </div>

          <div className={classes.datePicker}>
            <label htmlFor='ReleaseDate'>Fecha de estreno</label>
            {/* <input type='number' ref={durationInputRef} /> */}
            <DatePicker
            onChange={setDate}
            value={ReleaseDate}
            >

            </DatePicker>
          </div>

          <div className={classes.control}>
            <label htmlFor='YoutubeUrl'>Url de Youtube</label>
            <input type='text' ref={youtubeUrlInputRef} />
          </div>

          <div className={classes.checkbox}>
            {/* <label htmlFor='blocked'>Is it blocked /sec</label> */}
            <Checkbox label='Esta bloqueada para usuarios?' 
            checked={Blocked} onChange={(() => setBlocked(!Blocked))}></Checkbox>
            {/* <input type='checkbox' ref={blockedInputRef} /> */}
          </div>
          <div className={classes.control}>
            <label htmlFor='Image'>Song Image</label>
            <input type='file' onChange={changeHandlerImg} required />
          </div>
          <div className={classes.control}>
            <label htmlFor='Mp3'>Song Mp3 File</label>
            <input type='file' onChange={changeHandlerMp3} required />
          </div>
          <div className={classes.actions}>
            <button>Add Song</button>
          </div>
        </form>
      </div>
    </Card>
  )

}

export default FileUploadPage;