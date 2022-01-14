import React, { useState, useRef, useEffect } from 'react';

import classes from './FileUploadPage.module.css';
import Card from '../UI/Card';
import { useHistory } from "react-router-dom";
import { Checkbox } from 'semantic-ui-react';

export default function Update() {

  const [id, setID] = useState(null);
  const [Title, setTitle] = useState('');
  const [Artist, setArtist] = useState('');
  const [Duration, setDuration] = useState('');
  const [Genre, setGenre] = useState('');
  const [Blocked, setBlocked] = useState(false);

  const nameInputRef = useRef();
  const genreInputRef = useRef();
  const artistInputRef = useRef();
  const durationInputRef = useRef();
  
  const youtubeUrlInputRef = useRef();
  
  const history = useHistory();

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
    // formdata.append("IsYoutube", youtubeInputRef.current.checked);
    formdata.append("YoutubeUrl", youtubeUrlInputRef.current.value );

    if (youtubeUrlInputRef.current.value) {
        formdata.append("IsYoutube", true)
    }
    else{
        formdata.append("IsYoutube", false)
    }

    formdata.append("isBlocked", Blocked);
  
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`https://mcqueeninc.net/api/song/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        history.goBack();
      }
      )
      .catch(error => console.log('error', error));

  }

  useEffect(() => {
    setID(localStorage.getItem('ID'))
    setTitle(localStorage.getItem('Title'));
    setArtist(localStorage.getItem('Artist'));
    setDuration(localStorage.getItem('Duration'))
    setGenre(localStorage.getItem('Genre'))
    setBlocked(localStorage.getItem('isBlocked'))
    
}, []);

  return (
    <Card>
      <div>
        <form id='songForm' className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='Name'>Song Name</label>
            <input type='text' required id='name' ref={nameInputRef} value={Title} onChange={((e) => setTitle(e.target.value))} />
          </div>

          <div className={classes.control}>
            <label htmlFor='Genre'>Genre</label>
            <input type='text' ref={genreInputRef} value={Genre} onChange={((e) => setGenre(e.target.value))} />
          </div>

          <div className={classes.control}>
            <label htmlFor='Artist'>Artist</label>
            <input type='text' ref={artistInputRef} value={Artist} onChange={((e) => setArtist(e.target.value))}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='Duration'>Duration /sec</label>
            <input type='number' ref={durationInputRef} value={Duration} onChange={((e) => setDuration(e.target.value))} />
          </div>
          <div className={classes.control}>
            <label htmlFor='YoutubeUrl'>Url de Youtube</label>
            <input type='text' ref={youtubeUrlInputRef} />
          </div>
          <div className={classes.checkbox}>
          <Checkbox label='Esta bloqueada para usuarios?' 
          checked={Blocked ? true : false} onChange={(() => setBlocked(!Blocked))}></Checkbox>
          </div>
          <div className={classes.actions}>
           
            <button>Update Song</button>            
            
          </div>
        </form>
      </div>
    </Card>
  )

}

