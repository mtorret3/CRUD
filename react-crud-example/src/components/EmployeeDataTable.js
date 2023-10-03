import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import editIcon from "./../assets/edit.png";
import deleteIcon from "./../assets/delete.JPG";
import "../App.css";

const EmployeeDataTable = () => {

  const navigate = useNavigate();
  const baseURL = "http://localhost:8888/php-rest-api/api/index.php";
  const [employees, setEmployees] = useState([]);

  const setEmployeeData = () => {
    axios.get(baseURL + "/users").then((response) => {
      setEmployees(response.data);
    }).catch(error => {
      alert("Error Ocurred while loading data:" + error);
    });
  }

  useEffect(() => {
    setEmployeeData();
  }, []);


  const removeEmployee = (id) => {
    
    axios.post(baseURL + "/delete/" + id).then((response) => {
      alert("El empleado con ID: " + id + " ha sido eliminado!");
      setEmployeeData();
      navigate('/read')

    }).catch(error => {
      alert("Error Ocurred in removeEmployee:" + error);
    });
  }


  return (
    <div class="card-body">
      <br>
      </br>
      <nav>
        <button
          className="btn btn-primary nav-item active"
          onClick={() => navigate("/create")}>
          Crear nuevo Empleado
        </button>
      </nav>


      <br></br>
      <div className="col-lg-12">
        <h4>Lista de Empleados</h4>

        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nickname</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Dirección</th>
                    <th>Ciudad</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    employees &&
                    employees.map((employee, index) => (

                      <tr>
                        <th scope="row">{employee.PK_USERS}</th>
                        <td>{employee.NICKNAME}</td>
                        <td>{employee.NAME}</td>
                        <td>{employee.PHONE}</td>
                        <td>{employee.ADRESS}</td>
                        <td>{employee.CITY}</td>
                        <td>{employee.STATE}</td>
                        

                        <td >

                          <Link to={"/edit/" + employee.PK_USERS}><img src={editIcon} alt="Edit" width="50" height="30" title="Edit" />
                          </Link>


                          <button
                            onClick={() => removeEmployee(employee.PK_USERS)} className="button"
                          > <img src={deleteIcon} alt="Remove" title="Remove" width="30" height="30" />
                          </button>

                        </td>
                      </tr>

                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
       
      </div>

    </div>

  );
}
export default EmployeeDataTable;