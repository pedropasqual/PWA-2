// ============================================
// BANCO DE DADOS LOCAL (LocalStorage)
// ============================================

// Função para carregar dados do localStorage
function carregarDados() {
    // Tenta carregar produtos, se não existir cria um array vazio
    let produtos = localStorage.getItem('produtos');
    if (!produtos) {
        // Dados iniciais para exemplo
        produtos = [
            { id: 1, nome: 'Notebook', preco: 3500 },
            { id: 2, nome: 'Mouse', preco: 79.90 }
        ];
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    let clientes = localStorage.getItem('clientes');
    if (!clientes) {
        // Dados iniciais para exemplo
        clientes = [
            { id: 1, nome: 'João Silva', email: 'joao@email.com' },
            { id: 2, nome: 'Maria Santos', email: 'maria@email.com' }
        ];
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    return {
        produtos: JSON.parse(localStorage.getItem('produtos')),
        clientes: JSON.parse(localStorage.getItem('clientes'))
    };
}

// ============================================
// FUNÇÕES PARA PRODUTOS
// ============================================

function adicionarProduto() {
    const nomeInput = document.getElementById('nomeProduto');
    const precoInput = document.getElementById('precoProduto');
    
    const nome = nomeInput.value.trim();
    const preco = parseFloat(precoInput.value);
    
    // Validação
    if (!nome) {
        alert('Por favor, digite o nome do produto!');
        nomeInput.focus();
        return;
    }
    
    if (isNaN(preco) || preco <= 0) {
        alert('Por favor, digite um preço válido!');
        precoInput.focus();
        return;
    }
    
    // Carrega produtos atuais
    const dados = carregarDados();
    const produtos = dados.produtos;
    
    // Cria novo produto
    const novoProduto = {
        id: Date.now(), // Usa timestamp como ID único
        nome: nome,
        preco: preco
    };
    
    // Adiciona e salva
    produtos.push(novoProduto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
    // Limpa o formulário
    nomeInput.value = '';
    precoInput.value = '';
    nomeInput.focus();
    
    // Atualiza a lista
    mostrarProdutos();
    atualizarDashboard();
}

function mostrarProdutos() {
    const listaDiv = document.getElementById('listaProdutos');
    const produtos = carregarDados().produtos;
    
    if (produtos.length === 0) {
        listaDiv.innerHTML = '<p style="color: #999; text-align: center;">Nenhum produto cadastrado</p>';
        return;
    }
    
    // Ordena por nome
    produtos.sort((a, b) => a.nome.localeCompare(b.nome));
    
    let html = '';
    produtos.forEach(produto => {
        html += `
            <div class="item-lista">
                <div class="info">
                    <div class="nome">${produto.nome}</div>
                    <div class="detalhe">R$ ${produto.preco.toFixed(2)}</div>
                </div>
                <button class="delete-btn" onclick="deletarProduto(${produto.id})">✕</button>
            </div>
        `;
    });
    
    listaDiv.innerHTML = html;
}

function deletarProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    let produtos = carregarDados().produtos;
    produtos = produtos.filter(p => p.id !== id);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
    mostrarProdutos();
    atualizarDashboard();
}

// ============================================
// FUNÇÕES PARA CLIENTES
// ============================================

function adicionarCliente() {
    const nomeInput = document.getElementById('nomeCliente');
    const emailInput = document.getElementById('emailCliente');
    
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    
    if (!nome) {
        alert('Por favor, digite o nome do cliente!');
        nomeInput.focus();
        return;
    }
    
    if (!email || !email.includes('@')) {
        alert('Por favor, digite um e-mail válido!');
        emailInput.focus();
        return;
    }
    
    const dados = carregarDados();
    const clientes = dados.clientes;
    
    const novoCliente = {
        id: Date.now(),
        nome: nome,
        email: email
    };
    
    clientes.push(novoCliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    
    nomeInput.value = '';
    emailInput.value = '';
    nomeInput.focus();
    
    mostrarClientes();
    atualizarDashboard();
}

function mostrarClientes() {
    const listaDiv = document.getElementById('listaClientes');
    const clientes = carregarDados().clientes;
    
    if (clientes.length === 0) {
        listaDiv.innerHTML = '<p style="color: #999; text-align: center;">Nenhum cliente cadastrado</p>';
        return;
    }
    
    clientes.sort((a, b) => a.nome.localeCompare(b.nome));
    
    let html = '';
    clientes.forEach(cliente => {
        html += `
            <div class="item-lista">
                <div class="info">
                    <div class="nome">${cliente.nome}</div>
                    <div class="detalhe">${cliente.email}</div>
                </div>
                <button class="delete-btn" onclick="deletarCliente(${cliente.id})">✕</button>
            </div>
        `;
    });
    
    listaDiv.innerHTML = html;
}

function deletarCliente(id) {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    
    let clientes = carregarDados().clientes;
    clientes = clientes.filter(c => c.id !== id);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    
    mostrarClientes();
    atualizarDashboard();
}

// ============================================
// DASHBOARD
// ============================================

function atualizarDashboard() {
    const dados = carregarDados();
    
    const totalProdutos = document.getElementById('totalProdutos');
    const totalClientes = document.getElementById('totalClientes');
    
    if (totalProdutos) {
        totalProdutos.textContent = dados.produtos.length;
    }
    
    if (totalClientes) {
        totalClientes.textContent = dados.clientes.length;
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

// Executa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Verifica em qual página estamos
    const pagina = window.location.pathname;
    
    if (pagina.includes('produtos')) {
        mostrarProdutos();
    } else if (pagina.includes('clientes')) {
        mostrarClientes();
    } else {
        atualizarDashboard();
    }
});
