
import React, { useState, useEffect } from 'react';
import Player from './Player/Player';
import base64 from 'base-64'

function App() {

  const [songs, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null);

  const url = "http://localhost:8080/api/song";
  const username = 'DevUser';
  const password = 'Developers123$';

  const headers = new Headers();

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));


  useEffect(() => {

    fetch(url, {
      method: 'GET',
      headers: headers,
    })
      .then(res => res.json())
      .then((song) => {
        setItems(song);
        setIsLoaded(true);

        setNextSongIndex(() => {
          if (currentSongIndex + 1 > songs.length - 1) {
            return 0;
          } else {
            return currentSongIndex + 1;
          }
        });
      },
        (error) => {
          setIsLoaded(true);
          setError(error)
        })
  }, []);


  if (error) return <div> Error: {error.message}</div>;
  
  else if (!isLoaded) {
    return <div> Loading...</div>
  } else {

    return (
      <div className="App">
        <Player
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={songs}
        />
      </div>
    );
  }
}

export default App;
