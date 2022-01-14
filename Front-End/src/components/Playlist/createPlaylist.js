import React, { useRef } from 'react';

import classes from './Playlist.module.css';
import Card from '../UI/Card';

function CreatePlaylist() {

    const nameInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        handleSubmission();
    }

    const handleSubmission = () => {

        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: nameInputRef.current.value
            }),
            redirect: 'follow'
        };

        fetch("https://mcqueeninc.net/api/playlist", requestOptions)
            .then(response => {
                response.text()

            })
            .then(result => {
                document.getElementById('playlistForm').reset();
                console.log(result)
            })
            .catch(error => console.log('error', error));

    }

    return (
        <Card>
            <div>
                <form id='playlistForm' className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor='Name'>Nombre de la Lista de Reproducción</label>
                        <input type='text' required id='name' ref={nameInputRef} />
                    </div>

                    <div className={classes.actions}>
                        <button>Add Song</button>
                    </div>
                </form>
            </div>
        </Card>
    )

}

export default CreatePlaylist;