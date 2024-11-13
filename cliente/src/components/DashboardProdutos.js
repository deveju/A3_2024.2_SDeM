import React, { useEffect, useState } from 'react';
import { getProdutos, getVendedores } from '../api';

function DashboardProdutos() {
    const [, setProdutos] = useState([]);
    const [produtoFilter, setProdutoFilter] = useState('');
    const [produtosComVendedor, setProdutosComVendedor] = useState([]);

    useEffect(() => {
        (async () => {
            const produtosRes = await getProdutos();
            const vendedoresRes = await getVendedores();

            const produtosComVendedorTemp = produtosRes.data.map(produto => {

                const vendedor = vendedoresRes.data.find(v => 
                    v.produtos.some(p => p.id === produto.id)
                );
                return {
                    ...produto,
                    vendedor: vendedor ? { nome: vendedor.nome } : null
                };
            });

            setProdutos(produtosRes.data);
            setProdutosComVendedor(produtosComVendedorTemp);
        })();
    }, []);

    const filtroProdutos = produtosComVendedor.filter(produto =>
        produto.nome.toLowerCase().includes(produtoFilter.toLowerCase())
    );

    return (
        <div>
            <h2 class="titleprodutos">Produtos</h2>
            <input
                className="filterinput"
                type="text"
                placeholder="Filtrar"
                value={produtoFilter}
                onChange={(e) => setProdutoFilter(e.target.value)}
            />
            <div id="prodcontainer">
                <ul className="goright">
                    {filtroProdutos.map(produto => (
                        <li key={produto.id} className="clientesObj liitens">
                        <span className="produto-id" style={{ color: "#000" }}>[ID {produto.id}]</span>
                        <span className="produto-nome" style={{ color: "#353535" }}>{produto.nome}</span>
                        <span className="produto-preco" style={{ color: "#000" }}> R$ {parseFloat(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            {produto.vendedor ? (
                                <span className="produto-vendedor" style={{ color: "#0b0" }}>
                                    {` Vendedor: ${produto.vendedor.nome}`}
                                </span>
                            ) : (
                                <span className="produto-vendedor" style={{ color: "#b00" }}>
                                    Vendedor não disponível
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DashboardProdutos;
