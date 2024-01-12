const formulario = document.querySelector('#form')
const elementoListaProdutos = document.querySelector('#listaProdutos')
const arrayDeElementos = JSON.parse(localStorage.getItem("lista-elementos")) || []

arrayDeElementos.forEach(elemento => {
    criarElemento(elemento)
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const nomeProduto = e.target.elements['produto']
    const qtdeProduto = e.target.elements['quantidade']
    const categoria = e.target.elements['categoria']

    const elementoExisteNoArray = arrayDeElementos.find(elemento => elemento.nomeProduto == nomeProduto.value)

    const elementoAtual = {
        "nomeProduto": nomeProduto.value,
        'qtdeProduto': qtdeProduto.value,
        'categoria': categoria.value
    }

    if (elementoExisteNoArray) {
        elementoAtual.id = elementoExisteNoArray.id
        atualizarElemento(elementoAtual)
    } else {
        elementoAtual.id = arrayDeElementos.length
        criarElemento(elementoAtual)
        arrayDeElementos.push(elementoAtual)
    }

    localStorage.setItem("lista-elementos", JSON.stringify(arrayDeElementos))
    limparFormulario(nomeProduto, qtdeProduto, categoria)
    document.querySelector('#produto').focus()
})

function criarElemento(elementoAtual) {
    const categoriaExiste = document.querySelector(`[data-categoria="${elementoAtual.categoria}"]`)

    if (categoriaExiste === null) {
        const categoria = criarCategoria(elementoAtual)
        const li = criarItemDaCategoria(elementoAtual)
        categoria.appendChild(li)
        
        elementoListaProdutos.appendChild(categoria)
    } else {
        const categoria = document.querySelector(`[data-categoria="${elementoAtual.categoria}"]`)
        const li = criarItemDaCategoria(elementoAtual)
        categoria.appendChild(li)

        elementoListaProdutos.appendChild(categoria)
    }
}

function criarCategoria(elementoAtual) {
    const ul = document.createElement('ul')
    ul.classList.add('lista')
    if (elementoAtual.categoria != '') {
        ul.dataset.categoria = elementoAtual.categoria
    } else {
        return
    }
    const tituloUl = document.createElement('h3')
    tituloUl.innerHTML = elementoAtual.categoria
    ul.appendChild(tituloUl)

    return ul
}

function criarItemDaCategoria(elementoAtual) {
    const li = document.createElement('li')
    li.classList.add('lista-item')
    li.dataset.id = elementoAtual.id

    const qtde = document.createElement('span')
    qtde.innerHTML = elementoAtual.qtdeProduto
    qtde.classList.add('qtde-produto')

    const nome = document.createElement('span')
    nome.innerHTML = elementoAtual.nomeProduto
    nome.classList.add('nome-produto')

    const btnExcluir = document.createElement('button')
    btnExcluir.innerHTML = 'x'
    btnExcluir.classList.add('btn-excluir-item')

    btnExcluir.addEventListener('click', (e) => {
        e.preventDefault()
        e.srcElement.parentNode.remove()
        const id = e.srcElement.parentNode.dataset.id
        arrayDeElementos.splice(arrayDeElementos.findIndex(el => el.id == parseInt(id)), 1)
        localStorage.setItem("lista-elementos", JSON.stringify(arrayDeElementos))
    })

    li.appendChild(qtde)
    li.appendChild(nome)
    li.appendChild(btnExcluir)

    return li
}

function atualizarElemento(elementoAtual) {
    document.querySelector(`[data-id="${elementoAtual.id}"] .qtde-produto`).innerHTML = elementoAtual.qtdeProduto
    arrayDeElementos[elementoAtual.id] = elementoAtual
}

function limparFormulario(nome, qtde, categoria){
    nome.value = ''
    qtde.value = ''
    categoria. value = ''
}