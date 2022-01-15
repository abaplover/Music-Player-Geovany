import React, { useEffect, useState } from 'react'
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import PickSong from './PickSong.modal'
// import Button from 'react-bootstrap/Button'

const setData = (data) => {
    console.log(data);
    let { id, Name } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('Name', Name);

}



export default function List() {

    const [APIData, setAPIData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [plName, setPlName] = useState('');

    const setDataModal = (data) => {
        setModalShow(true);
        setPlName(data);
    }

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
                    <Button positive>
                        Crear lista de repoducción
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
                                        <Button positive onClick={() => setData(data)}>Update</Button>
                                    </Link>
                                </Table.Cell>

                                <Table.Cell><Button negative onClick={() => onDelete(data.id)}>Delete</Button></Table.Cell>
                                <Table.Cell><Button primary onClick={() => setDataModal(data.Name)}>Agregar canción</Button>
                                <PickSong name={plName} show={modalShow} onHide={() => setModalShow(false)} /></Table.Cell>
                                
                            </Table.Row>

                        )
                    })}

                </Table.Body>
            </Table>
            
        </div>
    )
}