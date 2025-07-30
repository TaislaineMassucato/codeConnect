const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolver, reject) => {
        //Cria um novo leitor de arquivo
        const leitor = new FileReader();

        //Define o que aconte quando a leitura é completada com sucesso
        leitor.onload = () => {
            //resolve a Promise com um objeto contendo a URL e o nome do arquivo
            resolver({ url: leitor.result, nome: arquivo.name })
        };

        ////Define o que aconte quando a leitura é completada com erro
        leitor.onerror = () => {
            //Rejeita a Promise com uma mensagem de erro personalizada
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        };

        //Inicia a leitura do arquivo como uma URL data (base64)
        leitor.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

//ADD um ouvinte de evento para input de upload de arquivo
inputUpload.addEventListener("change", async (evento) => {
    //obtém o arquivo selecionado pelo usuario
    const arquivo = evento.target.files[0];

    //verifica se um arquivo foi selecionado
    if (arquivo) {
        try {
            //aguarda a leitura do conteúdo do arquivo
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);

            //atualiza a imagem principal com a URL do arquivo
            imagemPrincipal.src = conteudoDoArquivo.url;

            //Atualiza o nome da imagem na página 
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            //em caso de erro na leitura do arquivo,exibe uma mensagem de erro no console
            console.error("Erro na leitura doi arquivo");
        }
    }
})
// Seleciona o input de tags e a lista de tags
const inputTags = document.getElementById("categoria");
const listaTags = document.getElementById("lista-tags")

// Adiciona um ouvinte de evento para capturar cliques na lista de tags
listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {// Verifica se o elemento clicado é um botão de remoção de tag
        const tagRemove = evento.target.parentElement;
        listaTags.removeChild(tagRemove);// Remove o pai do botão (ou seja, o <li> que contém a tag)
    }
})

const tagsDisponiveis = ["Front-end", "Back-end", "Full-stack", "Data-Science", "QA", "Infra"];

async function verificarTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}

// Adiciona um ouvinte de evento para capturar a tecla Enter no input
inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") { // Verifica se a tecla pressionada foi Enter
        evento.preventDefault();// Evita o comportamento padrão do Enter (submeter o formulário)
        const tagTexto = inputTags.value.trim();// Obtém o texto da tag e remove espaços em branco extras
        // Verifica se o texto da tag não está vazio
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificarTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    // Cria um novo elemento <li> para a nova tag
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);  // Adiciona a nova tag à lista de tags
                    inputTags.value = "";// Limpa o input de tags para o próximo input
                } else {
                    alert("Tag não encontrada!!");
                }
            } catch {
                console.log("Erro na requisição ");
                alert("Erro na requisição.Verifique o console!")
            }
        }
    }
})

const botaoPublicar = document.querySelector(".botao-publicar")

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeProjeto = document.getElementById("nome").value;
    const descricaoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    console.log(nomeProjeto)
    console.log(descricaoProjeto)
    console.log(tagsProjeto)

})

async function publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto) {
    return Promise((resolve, reject) =>{
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if(deuCerto){
                resolve("Projeto publicado com sucesso!!")
            }else{
                reject("Deu erro na publicação do Projeto!")
            }
        },2000)
    })
}


