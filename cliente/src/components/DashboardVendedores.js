import React, { useEffect, useState } from 'react';
import { getVendedores } from '../api';

function DashboardVendedores() {
    const [vendedores, setVendedores] = useState([]);
    const [vendedorFilter, setVendedorFilter] = useState('');
    const [produtoFilters, setProdutoFilters] = useState({});

    const filtroVendedores = vendedores.filter(vendedor =>
        vendedor.nome.toLowerCase().includes(vendedorFilter.toLowerCase())
    );

    useEffect(() => {
        (async () => {
            const vendedoresRes = await getVendedores();
            setVendedores(vendedoresRes.data);
        })();
    }, []);

    const handleProdutoFilterChange = (vendedorId, value) => {
        setProdutoFilters({
            ...produtoFilters,
            [vendedorId]: value,
        });
    };

    return (
        <div>
            <h2 class="titlevendedores">Vendedores</h2>
            <input
                className="filterinput halflarger"
                type="text"
                placeholder="Filtrar vendedores pelo nome"
                value={vendedorFilter}
                onChange={(e) => setVendedorFilter(e.target.value)}
            />
            <div id="vendedorescontainer">
                <ul className="vendedoreslist">
                    {filtroVendedores.map(vendedor => (
                        <li key={vendedor.id} className="vendedoresObj liitens">
                            <details>
                                <summary className="summaryVendedor">
                                    <span className="vendedor-id">{`[ID ${vendedor.id}]:`}</span>
                                    <span className="vendedor-nome">{`${vendedor.nome}`}</span>
                                    <br></br>
                                    <span className="vendedor-email-title">{`     [EMAIL]:`}</span>
                                    <span className="vendedor-email">{`${vendedor.email}`}</span>
                                </summary>

                                <input
                                    className="filterinput filterprod halflarger"
                                    type="text"
                                    placeholder="Filtrar produtos pelo nome"
                                    value={produtoFilters[vendedor.id] || ''}
                                    onChange={(e) => handleProdutoFilterChange(vendedor.id, e.target.value)}
                                />

                                <ul>
                                    {vendedor.produtos && vendedor.produtos.length > 0 ? (
                                        vendedor.produtos
                                        .filter(produto =>
                                            produto.nome.toLowerCase().includes((produtoFilters[vendedor.id] || '').toLowerCase())
                                        )
                                        .map(produto => (
                                            <li key={produto.id} className="vendedoresObj vendedoresObj2">
                                            <span className="produto-id">[P.ID {produto.id}]</span>
                                            <span className="produto-nome">{produto.nome}</span>
                                            <span className="produto-preco">R$ {parseFloat(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="vendedoresObj vendedoresObj2">Nenhum produto associado</li>
                                    )}
                                </ul>
                            </details>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DashboardVendedores;
