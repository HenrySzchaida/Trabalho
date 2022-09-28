const variaveis_globais = {
    modalProps: document.querySelector('#exampleModal'),

    row: document.querySelector("#grid-all-games .row"),

    filtro_todos: document.querySelector('#fltr_all'),
    filtro_por_zombie: document.querySelector('#fltr_zombie'),
    filtro_por_tiro: document.querySelector('#fltr_shooter'),
    filtro_por_corrida: document.querySelector('#fltr_race'),
    filtro_por_estrategia: document.querySelector('#fltr_strategy'),
    filtro_por_mmorpg: document.querySelector('#fltr_mmorpg'),
    
    resultados_da_requisicao: null,
}

$(() => $('[data-toggle="tooltip"]').tooltip()) // INICIALIZA OS TOOLTIPS

const manipular_dados_modal = (gameID) => {
    const { 
        developer, 
        game_url, 
        genre,
        platform, 
        publisher, 
        release_date, 
        short_description, 
        thumbnail, 
        title 
    } = variaveis_globais.resultados_da_requisicao.find(x => x.id == gameID)
    
    variaveis_globais.modalProps.querySelector('.modal-title').textContent = title
    
    variaveis_globais.modalProps.querySelector('.game-image').src = thumbnail
    variaveis_globais.modalProps.querySelector('.game-image').alt = title
    
    variaveis_globais.modalProps.querySelector('.developer').textContent = developer
    variaveis_globais.modalProps.querySelector('.description').textContent = short_description
    variaveis_globais.modalProps.querySelector('.genre').textContent = genre
    variaveis_globais.modalProps.querySelector('.publisher').textContent = publisher
    variaveis_globais.modalProps.querySelector('.release-date').textContent = release_date
    variaveis_globais.modalProps.querySelector('.platform').textContent = platform

    variaveis_globais.modalProps.querySelector('.game-page').href = game_url
}

$('#exampleModal').on('show.bs.modal', (e) => {

    const btnModal = e.relatedTarget // Botão que acionou o modal
    const gameID = btnModal.getAttribute('data-id')

    manipular_dados_modal(gameID)
})


const DOM_HTML = {

    renderizar_div(id, className){
        const div = document.createElement("div")
        
        if (id) div.setAttribute('id', id)
        
        const classes = className.split(" ")
        
        if (classes.length === 1) div.classList.add(classes.toString())
        else classes.forEach((classe) => div.classList.add(classe))
        
        return div;
    },

    renderizar_figure(thumbnail, title){
        const figure = document.createElement("figure")

        const img = this.renderizar_img(thumbnail, title, "card-img-top")
        
        const figcaption = document.createElement("figcaption")
        
        figcaption.classList.add("h5")
        figcaption.classList.add("font-weight-bold")
        figcaption.classList.add("px-3")
        figcaption.classList.add("pt-2")

        figcaption.textContent = title
        
        figure.appendChild(img)
        figure.appendChild(figcaption)
        
        return figure
    },

    renderizar_img(src, title, className){
        const img = document.createElement("img")
        
        if(className) img.classList.add(className)

        img.src = src
        img.alt = title
        
        return img
    },

    renderizar_p(description, className){
        const p = document.createElement("p")

        p.classList.add(className)
        p.textContent = description

        return p
    },

    renderizar_span(genre, className){
        const span = document.createElement("span")
        
        const classes = className.split(" ")
        
        if (classes.length === 1) span.classList.add(classes.toString())
        else classes.forEach((classe) => span.classList.add(classe))

        span.textContent = genre
        
        return span
    },

    renderizar_button_modal(id){
		const button = document.createElement("button")
		
        button.type = 'button'

		button.classList.add('btn')
		button.classList.add('btn-primary')
		
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('data-target', '#exampleModal')
        button.setAttribute('data-id', id)
        
        const img = this.renderizar_img('./assets/content/info.svg', 'info', null)

        button.appendChild(img)

        return button
	},

    renderizar_item(jogo){

        const { id, thumbnail, title, short_description, genre, platform } = jogo

        const div1 = this.renderizar_div(`game-${id}`, 'col-md-4')
        
        const div2 = this.renderizar_div(null, 'card mb-4 shadow-sm')

        const figure = this.renderizar_figure(thumbnail, title)
        
        const div3 = this.renderizar_div(null, 'card-body')
        
        const p = this.renderizar_p(short_description, 'card-text')

        const div4 = this.renderizar_div(null, "d-flex justify-content-between align-items-center")

        const span = this.renderizar_span(genre, "badge badge-secondary py-2")

        const button = this.renderizar_button_modal(id)

        if (platform.toLowerCase().includes('pc')) {
            const icon = this.renderizar_img('./assets/content/pc.svg', 'pc', null)

            icon.setAttribute('data-toggle', 'tooltip')
            icon.setAttribute('data-placement', 'top')
            icon.title = 'Windows/PC'

            div4.append(button, span, icon)
    
        } else {
            const icon = this.renderizar_img('./assets/content/browser.svg', 'browser', null)

            div4.append(button, span, icon)
        } 
        
        div3.append(p, div4)

        div2.append(figure, div3)

        div1.appendChild(div2)

        variaveis_globais.row.appendChild(div1)
    },

    exibir_itens(){
        variaveis_globais.resultados_da_requisicao.forEach((game_item) => {
            DOM_HTML.renderizar_item(game_item)
        })
    },

    limpar_itens(elementoPAI) {
        while (elementoPAI.firstChild) {
            elementoPAI.removeChild(elementoPAI.firstChild);
        }
    }
}

const requisicaoAPI = {
    options: {
        method: 'GET',
	    headers: {
		    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
		    'X-RapidAPI-Key': '68e80cdf08mshe82bdba2c5572b9p156b16jsnb7ec2586264e'
	    }
    },

    formatar_url(filtro){
        let url = 'https://free-to-play-games-database.p.rapidapi.com/api/games'

        if (filtro){
            url += `?category=${filtro}`
            return url
        }

        return url
    },

    async busca_por_popularidade(){

        const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity'
        
        const data_api = await fetch(url, this.options).then((resp) => resp.json())

        if (data_api.length > 0) {
            variaveis_globais.resultados_da_requisicao = data_api
            DOM_HTML.exibir_itens()
        }
    },

    async busca_filtrada(filtro){

        DOM_HTML.limpar_itens(variaveis_globais.row)
        
        const url = this.formatar_url(filtro)

        const data_api = await fetch(url, this.options).then((resp) => resp.json())

        if (data_api.length > 0) {
            variaveis_globais.resultados_da_requisicao = data_api
            DOM_HTML.exibir_itens()
        }else{
            alert("Not found")
        }
    },

    fazer_requisicao({ target }){
        const filtro = target.getAttribute("data-id")
        requisicaoAPI.busca_filtrada(filtro).catch((error) => console.log(error))
    }
}

variaveis_globais.filtro_todos.addEventListener('click', () => {
    requisicaoAPI.busca_filtrada(null).catch((error) => console.log(error))
})

variaveis_globais.filtro_por_zombie.addEventListener('click', requisicaoAPI.fazer_requisicao)

variaveis_globais.filtro_por_tiro.addEventListener('click', requisicaoAPI.fazer_requisicao)

variaveis_globais.filtro_por_corrida.addEventListener('click', requisicaoAPI.fazer_requisicao)

variaveis_globais.filtro_por_estrategia.addEventListener('click', requisicaoAPI.fazer_requisicao)

variaveis_globais.filtro_por_mmorpg.addEventListener('click', requisicaoAPI.fazer_requisicao)

requisicaoAPI.busca_por_popularidade().catch((error) => console.log(error))