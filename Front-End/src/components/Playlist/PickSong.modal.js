import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Table } from 'semantic-ui-react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export default function PickSong(props) {

    const [APIData, setAPIData] = useState([]);

    const getData = () => {
        axios.get(`https://mcqueeninc.net/api/song`)
        .then((response) => {
            setAPIData(response.data);
        })
    }

    useEffect(() => {
        getData();
    })
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                
                <Modal.Title id="contained-modal-title-vcenter">
                    Agregar canciones a la lista "{props.name}"
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Canción</Table.HeaderCell>
                        <Table.HeaderCell>Artista</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        APIData.map((data) => {
                            return (<Table.Row>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.Title}</Table.Cell>
                                <Table.Cell>{data.Artist}</Table.Cell>
                                <Table.Cell><Button>Agregar</Button></Table.Cell>
                            </Table.Row> )
                        })
                    }
                </Table.Body>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
} 