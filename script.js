const formulario = document.querySelector('#form')
const elementoListaProdutos = document.querySelector('#listaProdutos')
const arrayDeElementos = JSON.parse(localStorage.getItem("lista-elementos")) || []
const elementoValorFinal = document.querySelector('#valorFinal')

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
        'categoria': categoria.value,
        'itemPego': false
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

    const btnExcluirLista = document.createElement('button')
    btnExcluirLista.classList.add('btn-excluir-lista')
    btnExcluirLista.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'
    btnExcluirLista.addEventListener('click', () => {
        const listaLis = btnExcluirLista.parentElement.querySelectorAll('.lista-item')
        const listaIdsExcluir = []

        listaLis.forEach(li => {
            listaIdsExcluir.push(li.dataset.id)
        })

        listaIdsExcluir.forEach(id => {
            arrayDeElementos.splice(arrayDeElementos.findIndex(el => el.id == parseInt(id)), 1)
            atualizarPrecoFinal()
            localStorage.setItem("lista-elementos", JSON.stringify(arrayDeElementos))
        })

        // remover da tela
        btnExcluirLista.parentElement.remove()
    })

    ul.appendChild(tituloUl)
    ul.appendChild(btnExcluirLista)

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

    const divInserirPreco = document.createElement('div')
    divInserirPreco.classList.add('inserir-preco')
    const divInput = document.createElement('div')
    divInput.classList.add('divInput')
    divInput.id = `div-input-${elementoAtual.id}`

    const input = document.createElement('input')
    input.type = 'text'
    const spanPreco = document.createElement('span')
    spanPreco.classList.add('preco')
    spanPreco.id = `preco-id-${elementoAtual.id}`
    spanPreco.style.display = 'none'

    if (elementoAtual.hasOwnProperty('preco')) {
        spanPreco.style.display = 'block'
        spanPreco.innerHTML = `R$${elementoAtual.preco}`
        input.style.display = 'none'
    }

    divInput.appendChild(input)
    divInput.appendChild(spanPreco)

    const formBotoes = document.createElement('form')
    formBotoes.classList.add('btns')
    const btnAlterarPreco = document.createElement('button')
    btnAlterarPreco.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
    btnAlterarPreco.id = 'alterarPreco'
    const btnSalvar = document.createElement('button')
    btnSalvar.innerHTML = '<i class="fa-regular fa-floppy-disk"></i>'
    btnSalvar.type = 'submit'
    btnSalvar.id = 'salvarPreco'
    formBotoes.appendChild(btnAlterarPreco)
    formBotoes.appendChild(btnSalvar)

    btnSalvar.addEventListener('click', (e) => {
        e.preventDefault()

        const inputComPreco = btnSalvar.parentElement.parentElement.children[`div-input-${elementoAtual.id}`].children[0]
        inputComPreco.style.display = 'none'
        const preco = inputComPreco.value
        const elementoPreco = btnSalvar.parentElement.parentElement.children[`div-input-${elementoAtual.id}`].children[`preco-id-${elementoAtual.id}`]
        elementoPreco.style.display = 'block'
        elementoPreco.innerHTML = `R$${preco}`

        arrayDeElementos[elementoAtual.id].preco = preco
        localStorage.setItem("lista-elementos", JSON.stringify(arrayDeElementos))

        atualizarPrecoFinal()
    })

    btnAlterarPreco.addEventListener('click', (e) => {
        e.preventDefault()

        const elementoPreco = btnSalvar.parentElement.parentElement.children[`div-input-${elementoAtual.id}`].children[`preco-id-${elementoAtual.id}`]
        elementoPreco.style.display = 'none'

        const inputComPreco = btnSalvar.parentElement.parentElement.children[`div-input-${elementoAtual.id}`].children[0]
        inputComPreco.style.display = 'block'

        inputComPreco.focus()

        arrayDeElementos[elementoAtual.id].preco = inputComPreco.value
        localStorage.setItem("lista-elementos", JSON.stringify(arrayDeElementos))
    })


    divInserirPreco.appendChild(divInput)
    divInserirPreco.appendChild(formBotoes)

    const btnsPegarExcluir = document.createElement('div')
    btnsPegarExcluir.classList.add('btn-pegar-excluir-item')

    const btnExcluir = document.createElement('button')
    btnExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>'
    btnExcluir.classList.add('btn-excluir-item')

    const btnPegar = document.createElement('button')
    btnPegar.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
    btnPegar.classList.add('btn-pegar-item')

    btnExcluir.addEventListener('click', (e) => {
        e.preventDefault()
        const liPai = e.target.closest('.lista-item')
        liPai.remove()
        const id = e.target.closest('.lista-item').dataset.id
        arrayDeElementos.splice(arrayDeElementos.findIndex(el => el.id == parseInt(id)), 1)

        const listaPai = document.querySelector(`[data-categoria="${elementoAtual.categoria}"]`)

        if (listaPai.children.length <= 2) {
            listaPai.remove()
        }

        localStorage.setItem("lista-elementos", JSON.stringify(arrayDeElementos))
        atualizarPrecoFinal()

    })

    btnPegar.addEventListener('click', (e) => {
        const id = btnPegar.closest('.lista-item').dataset.id
        if(arrayDeElementos[id].itemPego == false){
            arrayDeElementos[id].itemPego = true
            li.classList.toggle('active')
        }else{
            li.classList.toggle('active')
            arrayDeElementos[id].itemPego = false
        }
        localStorage.setItem("lista-elementos", JSON.stringify(arrayDeElementos))
    })
    
    if(elementoAtual.itemPego){
        li.classList.toggle('active')
    }
    
    btnsPegarExcluir.appendChild(btnPegar)
    btnsPegarExcluir.appendChild(btnExcluir)

    li.appendChild(qtde)
    li.appendChild(nome)
    li.appendChild(divInserirPreco)
    li.appendChild(btnsPegarExcluir)

    return li
}

function atualizarElemento(elementoAtual) {
    document.querySelector(`[data-id="${elementoAtual.id}"] .qtde-produto`).innerHTML = elementoAtual.qtdeProduto
    arrayDeElementos[elementoAtual.id] = elementoAtual
}

function limparFormulario(nome, qtde, categoria) {
    nome.value = ''
    qtde.value = ''
    categoria.value = ''
}

function atualizarPrecoFinal() {
    const array = []
    arrayDeElementos.forEach(produto => {
        const precoAtual = produto.preco
        if (precoAtual != undefined) {
            if (!!precoAtual.match(/,/g)) {
                const preco = precoAtual.replace(/,/g, '.')
                const precoFinal = +preco * produto.qtdeProduto
                array.push(precoFinal)
            } else {
                const precoFinal = +precoAtual * produto.qtdeProduto
                array.push(precoFinal)
            }
        }
    })

    // refatorar o reduce
    if (array.length > 0) {
        const valorCompraFinal = array.reduce((a, b) => a + b)
        elementoValorFinal.innerHTML = `R$${(valorCompraFinal).toFixed(2)}`
    } else {
        elementoValorFinal.innerHTML = 'R$0'
    }
}

atualizarPrecoFinal()