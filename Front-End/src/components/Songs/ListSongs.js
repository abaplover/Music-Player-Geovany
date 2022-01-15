import React, {useEffect, useState} from 'react'
import { Table, Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import axios from 'axios';

const setData = (data) => {
    console.log(data);
    let { id, Title, Artist, Duration,Genre, ReleaseDate, IsYoutube, YoutubeUrl, isBlocked,Src,SongImg} = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('Title', Title);
    localStorage.setItem('Artist', Artist);
    localStorage.setItem('Genre', Genre);
    localStorage.setItem('Duration', Duration);
    localStorage.setItem('ReleaseDate', ReleaseDate);
    localStorage.setItem('IsYoutube', IsYoutube);
    localStorage.setItem('YoutubeUrl', YoutubeUrl);
    localStorage.setItem('isBlocked', isBlocked);
    localStorage.setItem('Src', Src);
    localStorage.setItem('SongImg', SongImg);
}

export default function Read(){

    const [APIData, setAPIData] = useState([]);

    const getData = () => {
        axios.get(`https://mcqueeninc.net/api/song`)
        .then((response) => {
            setAPIData(response.data);
        })
    }

    const onDelete = (id) => {
        axios.delete(`https://mcqueeninc.net/api/song/${id}`)
        .then((response) => {
            console.log(response.data);
            getData();
        })
    }

useEffect(() => {
    getData();
}, [])

    return (
        
        <div>
            <div>
                <Link to={'/createSong'}>
                    <Button primary>
                        Subir canción
                    </Button>
                </Link>
            </div>
            <div>
                <br></br>
            </div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Titulo</Table.HeaderCell>
                        <Table.HeaderCell>Artista</Table.HeaderCell>
                        <Table.HeaderCell>Duración</Table.HeaderCell>
                        <Table.HeaderCell>Bloqueado</Table.HeaderCell>
                    
                        <Table.HeaderCell>Detalle</Table.HeaderCell>
                        <Table.HeaderCell>Actualizar</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                
                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                            <Table.Cell key={data.id}>{data.id}</Table.Cell>
                            <Table.Cell>{data.Title}</Table.Cell>
                            <Table.Cell>{data.Artist}</Table.Cell>
                            <Table.Cell>{data.Duration}</Table.Cell>
                            <Table.Cell>{data.isBlocked ? 'Yes' : 'No'} </Table.Cell>
                            <Table.Cell> 
                                <Link to='/details'>
                                <Button positive onClick={() => setData(data)}>Detalle</Button>
                                </Link>
                            </Table.Cell>

                            <Table.Cell> 
                                <Link to='/update'>
                                <Button positive onClick={() => setData(data)}>Update</Button>
                                </Link>
                            </Table.Cell>
                            
                            <Table.Cell><Button negative onClick={() => onDelete(data.id)}>Delete</Button></Table.Cell>
                            </Table.Row>
                            
                        )
                    })}
                   
                </Table.Body>
            </Table>
        </div>
    )
}