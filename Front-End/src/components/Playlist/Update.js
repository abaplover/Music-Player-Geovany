import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classes from './Playlist.module.css';
import Card from '../UI/Card';

function UpdatePlaylist() {
    const history = useHistory();
    const [id, setID] = useState(null);
    const [Name, setName] = useState('');

    function submitHandler(event) {
        event.preventDefault();
        handleSubmission();
    }

    const handleSubmission = () => {

        var requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: Name
            }),
            redirect: 'follow'
        };

        fetch(`https://mcqueeninc.net/api/playlist/${id}`, requestOptions)
            .then(response => {
                response.text()

            })
            .then(result => {
                
                console.log(result)
                history.goBack();
            })
            .catch(error => console.log('error', error));

    }

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setName(localStorage.getItem('Name'));
        
    }, []);

    return (
        <Card>
            <div>
                <form id='playlistForm' className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor='Name'>Nombre de la Lista de Reproducción</label>
                        <input type='text' required id='name' value={Name} onChange={((e) => setName(e.target.value))} />
                    </div>

                    <div className={classes.actions}>
                        <button>Update Song</button>
                    </div>
                </form>
            </div>
        </Card>
    )

}

export default UpdatePlaylist;