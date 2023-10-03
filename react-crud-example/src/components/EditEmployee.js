import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EmployeeForm = () => {

  const editURL = "http://localhost:8888/php-rest-api/api/index.php/useredit/";
  const navigate = useNavigate();
  const param = useParams();
  const [empId, setEmpId] = useState('');
  const [empNickname, setNickname] = useState('');
  const [empName, setName] = useState('');
  const [empPhone, setPhone] = useState('');
  const [empAdress, setAdress] = useState('');
  const [empCity, setCity] = useState('');
  const [empState, setState] = useState('');
  const [empPassword, setPassword] = useState('');

useEffect(() => {

  axios.get(editURL+param.id).then((response) => {
    console.log(response.data);
    const empData = response.data;
    setEmpId(empData.PK_USERS);
    setNickname(empData.NICKNAME);
    setName(empData.NAME);
    setPhone(empData.PHONE);
    setAdress(empData.ADRESS);
    setCity(empData.CITY);
    setState(empData.STATE);
    setPassword(empData.PASSWORD);

  }).catch(error => { 
    alert("Ocurrio un error:"+ error);
  });
}, []);


  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const nicknameChangeHandler = (event) => {
    setNickname(event.target.value);
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


  const submitActionHandler = (event) => {
    event.preventDefault();
    console.log(JSON.stringify({
      id: empId,
      nickname: empNickname,
      name: empName,
      phone: empPhone,
      adress: empAdress,
      city: empCity,
      state: empState,
      password: empPassword
    }));
    axios
      .post(editURL+param.id, JSON.stringify({
        id: empId,
        nickname: empNickname,
        name: empName,
        phone: empPhone,
        adress: empAdress,
        city: empCity,
        state: empState,
        password: empPassword
      }))
      .then((response) => {
        alert("El empleado "+ empId +" se editó correctamente!");
        navigate('/read')

      }).catch(error => { 
        alert("Ocurrio el siguiente error:"+ error);
      });
      
  };

    return(  
      <Alert variant='primary'>
      <Container>
      <Form onSubmit={submitActionHandler} id="data">
      <Form.Group  controlId="form.id">
            <Form.Label>Id</Form.Label>
            <Form.Control  value={empId} readonly='readonly'/>
        </Form.Group>
        <Form.Group controlId="form.Nickname">
            <Form.Label>Nickname</Form.Label>
            <Form.Control type="text" value={empNickname} onChange={nicknameChangeHandler} placeholder="Ingrese un nombre corto" required/>
        </Form.Group>
        <Form.Group controlId="form.Name">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={empName} onChange={nameChangeHandler} placeholder="Nombre completo" required/>
        </Form.Group>
        <Form.Group  controlId="form.Phone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" value={empPhone} onChange={phoneChangeHandler} placeholder="8110000000" required/>
        </Form.Group>

        <Form.Group  controlId="form.Dirección">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" value={empAdress} onChange={adressChangeHandler} placeholder="Calle, Número, Colonia" required/>
        </Form.Group>

        <Form.Group  controlId="form.Ciudad">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control type="text" value={empCity} onChange={cityChangeHandler} placeholder="Monterrey" required/>
        </Form.Group>

        <Form.Group  controlId="form.State">
            <Form.Label>Estado</Form.Label>
            <Form.Select value={empState} onChange={stateChangeHandler}>
            <option value="0">Seleccione uno...</option>
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
            <Form.Control type="password" value={empPassword} onChange={passwordChangeHandler} required/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Guardar</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>navigate("/read")}>Cancelar</Button>
      </Form>
    </Container>     
    </Alert>      
    
    );
}
export default EmployeeForm;
