import React, { useState, useRef, useEffect } from 'react';

import classes from './FileUploadPage.module.css';
import Card from '../UI/Card';
import { Link } from "react-router-dom";
import { Checkbox, Button } from 'semantic-ui-react';
import DatePicker from 'react-date-picker'

export default function Update() {

  const [id, setID] = useState(null);
  const [Title, setTitle] = useState('');
  const [Artist, setArtist] = useState('');
  const [Duration, setDuration] = useState('');
  const [Genre, setGenre] = useState('');
  const [UrlImg, setImg] = useState('');
  const [UrlMp3, setMp3] = useState('');
  const [Blocked, setBlocked] = useState(false);
  const [ReleaseDate, setDate] = useState(new Date());


  useEffect(() => {
    setID(localStorage.getItem('ID'))
    setTitle(localStorage.getItem('Title'));
    setArtist(localStorage.getItem('Artist'));
    setDuration(localStorage.getItem('Duration'));
    setDate(new Date(localStorage.getItem('ReleaseDate').split("-").join(",")))

    setGenre(localStorage.getItem('Genre'))
    setBlocked(localStorage.getItem('isBlocked'))
    setMp3(localStorage.getItem('Src'))
    setImg(localStorage.getItem('SongImg'))

  }, []);

  return (
    <Card>
      <div>
        <form id='songForm' className={classes.form} >
          <div className={classes.control}>
            <label htmlFor='Name'>Nombre de la Canción</label>
            <input type='text' required id='name' value={Title} readOnly />
          </div>

          <div className={classes.control}>
            <label htmlFor='Genre'>Genre</label>
            <input type='text' value={Genre} readOnly />
          </div>

          <div className={classes.control}>
            <label htmlFor='Artist'>Artist</label>
            <input type='text' value={Artist} readOnly />
          </div>
          <div className={classes.control}>
            <label htmlFor='Duration'>Duration /sec</label>
            <input type='number' value={Duration} readOnly />
          </div>
          <div className={classes.datePicker}>
            <label htmlFor='ReleaseDate'>Fecha de estreno</label>
            {/* <input type='number' ref={durationInputRef} /> */}
            <DatePicker
              value={ReleaseDate}
            >

            </DatePicker>
          </div>
          <div className={classes.control}>
            <label htmlFor='YoutubeUrl'>Url de Youtube</label>
            <input type='text' readOnly />
          </div>
          <div className={classes.checkbox}>
            <Checkbox label='Esta bloqueada para usuarios?'
              checked={Blocked ? true : false} readOnly></Checkbox>
          </div>
          <div className={classes.control}>
            <label htmlFor='Image'>Imagen de la canción</label>
            <input type='text' value={UrlImg} readOnly />
          </div>
          <div className={classes.control}>
            <label htmlFor='Mp3'>Url de la canción</label>
            <input type='text' value={UrlMp3} readOnly />
          </div>
        </form>

        <div>
          <Link to={'/songs'}>
            <Button>Volver</Button>
          </Link>

        </div>
        <br></br>
      </div>
    </Card>
  )

}

