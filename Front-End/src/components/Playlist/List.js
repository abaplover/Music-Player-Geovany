import React, {useEffect, useState} from 'react'
import { Table } from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import axios from 'axios';

const setData = (data) => {
    console.log(data);
    let { id, Name} = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('Name', Name);

}

export default function List(){

    const [APIData, setAPIData] = useState([]);

    const getData = () => {
        axios.get(`https://mcqueeninc.net/api/playlist`)
        .then((response) => {
            setAPIData(response.data);
        })
    }

    const onDelete = (id) => {
        axios.delete(`https://mcqueeninc.net/api/playlist/${id}`)
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
                <Link to={'/createPlaylist'}>
                    <button>
                        Crear lista de repoducción
                    </button>
                </Link>
            </div>
            <div>
                <br></br>
            </div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Lista de Reproducción</Table.HeaderCell>
                        
                        <Table.HeaderCell>Actualizar</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                
                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                            <Table.Cell >{data.id}</Table.Cell>
                            <Table.Cell>{data.Name}</Table.Cell>

                            <Table.Cell> 
                                <Link to='/updatePlaylist'>
                                <button onClick={() => setData(data)}>Update</button>
                                </Link>
                            </Table.Cell>
                            
                            <Table.Cell><button onClick={() => onDelete(data.id)}>Delete</button></Table.Cell>
                            </Table.Row>
                            
                        )
                    })}
                   
                </Table.Body>
            </Table>
        </div>
    )
}