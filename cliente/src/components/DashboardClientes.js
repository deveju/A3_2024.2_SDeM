import React, { useEffect, useState } from 'react';
import { getClientes } from '../api';

function DashboardClientes() {
    const [clientes, setClientes] = useState([]);
    const [clienteFilter, setClienteFilter] = useState('');

    const filtroClientes = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(clienteFilter.toLowerCase())
    );

    useEffect(() => {
        (async () => {
            const clientesRes = await getClientes();
            setClientes(clientesRes.data);
        })();
    }, []);

    return (
        <div>
            <h2 class="titleclientes">Clientes</h2>
            <input
                class="filterinput halflarger"
                type="text"
                placeholder="Filtrar cliente pelo nome"
                value={clienteFilter}
                onChange={(e) => setClienteFilter(e.target.value)}
            />
            <div id="clientescontainer">
                <ul class="goright">
                    {filtroClientes.map(cliente => (
                        <li key={cliente.id} className="clientesObj liitens">
                            <span className="nomelistid">[ID {cliente.id}]:</span>
                            <span className="nomelist">{cliente.nome}</span>
                            <br></br>
                            <span className="nomelistid">[EMAIL]:</span>
                            <span className="nomelist">{cliente.email}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default DashboardClientes;
