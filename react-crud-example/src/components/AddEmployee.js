import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EmployeeForm = () => {
  const baseURL = "http://localhost:8888/php-rest-api/api/index.php";
  const navigate = useNavigate();
  const [enteredNickname, setNickname] = useState('');
  const [enteredName, setName] = useState('');
  const [enteredPhone, setPhone] = useState('');
  const [enteredAdress, setAdress] = useState('');
  const [enteredCity, setCity] = useState('');
  const [enteredState, setState] = useState('');
  const [enteredPassword, setPassword] = useState('');
  
  
  const nicknameChangeHandler = (event) => {
    setNickname(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };

  const adressChangeHandler = (event) => {
    setAdress(event.target.value);
  };

  const cityChangeHandler = (event) => {
    setCity(event.target.value);
  };

  const stateChangeHandler = (event) => {
    setState(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };



  const getStates = () => {
    axios.get(baseURL + '/states').then((response) => {
      console.log(response.data);
    }).catch(error => {
      alert("Error Ocurred while loading data:" + error);
    });
  }


  const submitActionHandler = (event) => {
    event.preventDefault();
    axios
      .post(baseURL + '/user', JSON.stringify({
        nickname: enteredNickname,
        name: enteredName,
        phone: enteredPhone,
        adress: enteredAdress,
        city: enteredCity,
        state: enteredState,
        password: enteredPassword
      }))
      .then((response) => {
        alert("El empleado "+ enteredName +" ha sido creado!");
        navigate("/read");
      }).catch(error => { 
        alert("error==="+error);
      });
    
  };

  const cancelHandler = () =>{
    //reset the values of input fields
    setNickname('');
    setName('');
    setPhone('');
    setAdress('');
    setCity('');
    setState('');
    setPassword('');
    navigate("/read");

  }
    return(  
      <Alert variant='primary'>
      <Container>
      <Form onSubmit={submitActionHandler}>
        <Form.Group controlId="form.Nickname">
            <Form.Label>Nickname</Form.Label>
            <Form.Control type="text" value={enteredNickname} onChange={nicknameChangeHandler} placeholder="Inserte un nombre corto" required/>
        </Form.Group>
        <Form.Group  controlId="form.Name">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control type="text" value={enteredName} onChange={nameChangeHandler} placeholder="Nombre y Apellidos" required/>
        </Form.Group>

        <Form.Group  controlId="form.Phone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" value={enteredPhone} onChange={phoneChangeHandler} placeholder="8110000000" required/>
        </Form.Group>

        <Form.Group  controlId="form.Adress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" value={enteredAdress} onChange={adressChangeHandler} placeholder="Calle, Número, Colonia" required/>
        </Form.Group>

        <Form.Group  controlId="form.City">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control type="select" value={enteredCity} onChange={cityChangeHandler} placeholder="Monterrey" required/>
        </Form.Group>


        <Form.Group  controlId="form.State">
            <Form.Label>Estado</Form.Label>
            <Form.Select value={enteredState} onChange={stateChangeHandler}>
            <option value="1">Seleccione uno...</option>
            <option value="1">Aguascalientes</option>
            <option value="2">Baja California</option>
            <option value="3">Baja California Sur</option>
            <option value="4">Campeche</option>
            <option value="5">Coahuila</option>
            <option value="6">Colima</option>
            <option value="7">Chiapas</option>
            <option value="8">Chihuahua</option>
            <option value="9">Ciudad de México</option>
            <option value="10">Durango</option>
            <option value="11">Estado de México</option>
            <option value="12">Guanajuato</option>
            <option value="13">Guerrero</option>
            <option value="14">Hidalgo</option>
            <option value="15">Jalisco</option>
            <option value="16">Michoacán</option>
            <option value="17">Morelos</option>
            <option value="18">Nayarit</option>
            <option value="19">Nuevo León</option>
            <option value="20">Oaxaca</option>
            <option value="21">Puebla</option>
            <option value="22">Querétaro</option>
            <option value="23">Quintana Roo</option>
            <option value="24">San Luis Potosí</option>
            <option value="25">Sinaloa</option>
            <option value="26">Sonora</option>
            <option value="27">Tabasco</option>
            <option value="28">Tamaulipas</option>
            <option value="29">Tlaxcala</option>
            <option value="30">Veracruz</option>
            <option value="31">Yucatán</option>
            <option value="32">Zacatecas</option> 
            </Form.Select>
        </Form.Group>

        <Form.Group  controlId="form.Password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={enteredPassword} onChange={passwordChangeHandler} required/>
        </Form.Group>

        <br></br>
        <Button type='submit'>Guardar</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>cancelHandler()}>Cancelar</Button>
      </Form>
      
    </Container>     
    </Alert>      
    
    );
}
export default EmployeeForm;