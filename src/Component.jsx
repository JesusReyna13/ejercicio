import React, {useState} from 'react'
import Axios from 'axios';   //Peticiones sencillas.


export default function Component() {
   

  const[loansList, setLoanList] = useState([]);
  const[simularPagoList, setSimularPagoList] = useState([]);
  const[Client, setClient] = useState("");
  const[Amount, setAmount] =useState(0);


  //Recorre tabla de cuentas activas para realizar el cobro
  const CobroPagos = ()=>{
    Axios.get("http://localhost:3001/cobroPagos").then((response)=>{
        console.log(response.data);
        setSimularPagoList(response.data);
    })
  }
  //Calculo de pagos pendientes con calculo
  const getPendingLoans = ()=>{
    Axios.get("http://localhost:3001/pending-loans").then((response)=>{
        console.log(response.data);
        setLoanList(response.data);
    })
  }

  //Metodo para actualizar las cuentas de los clientes activos.
  const update = () =>{
    CobroPagos();
    
  }


//actualiza tabla.
  getPendingLoans();



//Pequeña vista.
    return (
    <div>
        <nav class = "navbar" className='Titulo'>
            <img width="100" height="100" src="https://img.icons8.com/bubbles/100/work.png" alt="work"/>
            <a class="navbar-brand" >Cuentas pendientes</a>
        </nav>
        <div className='Boton'>
            
            <button onClick={update}>Ejecutar pagos</button>
        </div>
        <br />
        <div className='Tabla'>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Sucursal</th>
                    <th scope="col">id</th>
                    <th scope="col">amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            loansList.map((val,key)=>{
                                return <div>
                                    <th scope='row'> {val.Client} </th>
                                    <td> { val.Name } </td>
                                    <td> { val.ID } </td>
                                    <td> { val.amount.toFixed(2) } </td>
                                    
                                </div>
                            })
                        }
                    
                    </tr>
                </tbody>
                </table>

        </div>
        


    </div>

    
  )
}
