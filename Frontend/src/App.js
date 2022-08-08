import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useForm } from "react-hook-form";
import "./index.css";


export default function App() {


  const { register, formState: { errors }, reset, handleSubmit } = useForm();

  const {
    register: register2,
    setValue,
    formState: { errors: errors2 },
    reset: reset2,
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onBlur",
  });

  const [data, setData] = useState("");


  const [listDepartamentos, setDepartamentos] = useState([]);
  const getDepartamentos = async () => {
    const response = await fetch(
      "http://localhost:4000/Departamentos"
    );
    const data = await response.json();
    setDepartamentos(data);
  };

  const [listFiscalias, setFiscalias] = useState([]);
  const getFiscalias = async () => {
    const response = await fetch(
      "http://localhost:4000/Departamento/0/ObtenerFiscalias"
    );
    const data = await response.json();
    setFiscalias(data);
  };

  const GuardarFiscalia = data => {
    console.log("GUARDAR::", data);

    fetch('http://localhost:8080/fiscalias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
      data
      ),
    })
      .then((res) => res.json())
      .then((result) => {

        if (!(result.status === 500)) {
          alert("Fiscalia registrada con exito.");
          getFiscalias();
          console.log(result);
          reset();
        } else {
          alert("Error ya existe una fiscalia con ese nombre.");
        }
      })
      .catch((err) => {
        alert("Error con el servidor.");
      })

    return false;
  }

  const EditarFiscalia = data => {

    console.log(data);

    fetch('http://localhost:8080/fiscalias', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data ),
    })
      .then((res) => res.json())
      .then((result) => {

        if (!(result.status === 500)) {
          alert("Fiscalia Editada con exito.");
          getFiscalias();
          console.log(result);
          reset2();
        } else {
          alert("Error ya existe una fiscalia con ese nombre.");
        }
      })
      .catch((err) => {
        alert("Error con el servidor.");
      })

    return false;
  }

  const SeleccionarFiscalia = event => {
  
    console.log("FiscaliaSeleccionada ::", event.target.value);


    let found = listFiscalias.find(obj => {
      return obj.id_fiscalia ==  event.target.value;
    });

    setValue('direccion', found.direccion);
    setValue('telefono', found.telefono);
    setValue('id_departamento', found.id_departamento);
    setValue('id_fiscalia', found.id_fiscalia);
    setValue('fiscalia', found.fiscalia);
    
    console.log(found);


  }

  const BorrarFiscalia = data => {
    console.log("BORRAR FISCALIA ::", data);


    fetch('http://localhost:8080/fiscalias', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      //.then((res) => res.json())
    .then((result) => {
        getFiscalias();
       // console.log(result);
    })
      //.catch((err) => {
      //  alert("Error con el servidor.");
      //})


  }

  const getFiscaliasDepartamento = async (id_departamento) => {
    const response = await fetch(
      "http://localhost:4000/Departamento/"+ id_departamento +"/ObtenerFiscalias"
    );
    const data = await response.json();
    setFiscalias(data);
  };

  const FiltrarFiscalias = event => {
      getFiscaliasDepartamento(event.target.value);
  }


  useEffect(() => {
    getDepartamentos();
    getFiscalias();
  }, []);

  return (
    <div className="form-container">
      <Container>
        <Row>
          <Col>
            <Card.Title>GESTION DE FISCALIAS</Card.Title>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <Card.Subtitle>Ingresar:</Card.Subtitle>
          </Col>
        </Row>
        <form key={1} onSubmit={handleSubmit(GuardarFiscalia)}>
          <Row>
            <Col>
              <label>Fiscalia*</label>
              <input {...register("fiscalia", { required: true })} placeholder="" />
              {errors.FISCALIA?.type === 'required' && "campo obligatorio"}
            </Col>
            <Col xs={4}>
              <label>Direccion*</label>
              <input {...register("direccion", { required: true })} placeholder="" />
              {errors.DIRECCION?.type === 'required' && "campo obligatorio"}
            </Col>
            <Col>
              <label>Telefono*</label>
              <input {...register("telefono", { required: true })} placeholder="" />
              {errors.TELEFONO?.type === 'required' && "campo obligatorio"}
            </Col>
            <Col>
              <label>Departamento*</label>
              <select {...register("id_departamento", { required: true })}>
                <option></option>
                {listDepartamentos.map((option, index) => {
                  return (
                    <option key={index} value={option.id_departamento}>
                      {option.departamento}
                    </option>
                  );
                })}
              </select>
              {errors.DEPARTAMENTO?.type === 'required' && "campo obligatorio"}
            </Col>
            <Col>
              <label></label>
              <input type="submit" value="Guardar" />
            </Col>
          </Row>
        </form>
        <hr></hr>
        <Row>
          <Col>
            <Card.Subtitle>Editar:</Card.Subtitle>
          </Col>
        </Row>
        <form key={2} onSubmit={handleSubmit2(EditarFiscalia)}>
          <Row>
            <Col>
              <label>Fiscalia*</label>
              <select {...register2("id_fiscalia", { required: true })} onChange={SeleccionarFiscalia}>
                <option></option>
                {listFiscalias.map((option, index) => {
                  return (
                    <option key={index} value={option.id_fiscalia}>
                      {option.fiscalia}
                    </option>
                  );
                })}
              </select>
              {errors2.ID_FISCALIA?.type === 'required' && "campo obligatorio"}
            </Col>
            <Col xs={4}>
              <label>Direccion*</label>
              <input {...register2("direccion", { required: true })} placeholder="" />
              {errors2.DIRECCION?.type === 'required' && "campo obligatorio"}
            </Col>
            <Col>
              <label>Telefono*</label>
              <input {...register2("telefono", { required: true })} placeholder="" />
              {errors2.TELEFONO?.type === 'required' && "campo obligatorio"}
            </Col>
            <Col>
              <label>Departamento*</label>
              <select {...register2("id_departamento", { required: true })} >
                <option></option>
                {listDepartamentos.map((option2, index) => {
                  return (
                    <option key={index} value={option2.id_departamento}>
                      {option2.departamento}
                    </option>
                  );
                })}
              </select>
              {errors2.departamento?.type === 'required' && "campo obligatorio"}
            </Col>
            <Col>
              <label></label>
              <input type="submit" value="Editar" />
            </Col>
          </Row>
        </form>
        <br></br>
        <hr></hr>
        <Row>
          <Col>
            <Card.Subtitle>Listado de Fiscalias:</Card.Subtitle>
          </Col>
        </Row>
        <Row>
          <Col>
          <label>Departamento</label>
          </Col>
        </Row>
        <Row>
          <Col>
          <select onChange={FiltrarFiscalias}>
          <option value="0"> - Todas - </option>
                {listDepartamentos.map((option2, index) => {
                  return (
                    <option key={index} value={option2.id_departamento}>
                      {option2.departamento}
                    </option>
                  );
                })}
              </select>
          </Col>
        </Row>
        <Col>
          <label></label>
          </Col>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Fiscalia</th>
                  <th>Direccion</th>
                  <th>Telefono</th>
                  <th>Departamento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listFiscalias.map((fis) => {
                  return (
                    <tr>
                      <td>{fis.fiscalia}</td>
                      <td>{fis.direccion}</td>
                      <td>{fis.telefono}</td>
                      <td>{fis.departamento}</td>
                      <td>
                        <Button className="btn-danger" variant="danger" onClick={() => BorrarFiscalia(fis)}>x</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>

      </Container>
    </div>
  );
}
