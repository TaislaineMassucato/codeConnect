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
