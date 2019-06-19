import React, { Component } from 'react';
import {Text} from 'native-base';

export default class ViajesScreen extends Component {

    componentWillMount() {
        const { idOrigen, idDestino, cantPasajeros, fechaIda, fechaVuelta } = this.props.currentTrip;
        this.fetchGetViajes(idOrigen, idDestino, cantPasajeros, fechaIda, fechaVuelta);
    }


    fetchGetViajes = async (idOrigen, idDestino, cantPasajeros, fechaIda, fechaVuelta) => {
        await fetch('http://35.236.27.209/movilPeru/api/controller/get_viajes.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idOrigen: idOrigen,
                idDestino: idDestino,
                cantPasajeros: cantPasajeros,
                fechaSalida: fechaIda
            })
        }).then(response => { return response.json() })
            .then(
                (data) => {
                    alert(JSON.stringify(data.data));
                });
    }

    render() {
        return (
            <Text> textInComponent </Text>
        );
    }
}
