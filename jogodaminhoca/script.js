function jogar() {
    document.getElementById('jogo').style.display = 'flex'
    document.getElementById('menu').style.display = 'none'

    let canvas = document.getElementById("jogo-tela")
    let context = canvas.getContext("2d")
    let box = 32
    let cobrinha = []
    cobrinha[0] = {x: 8 * box, y: 8 * box}
    let direcao = "direita"
    let comida = {x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box}
    let pontos = document.getElementById("pontuacao")
    let pontuacao = 0

    function criarBG() {
        context.fillStyle = "#0C0C0C"
        context.fillRect(0, 0, 16 * box, 16 * box)
    }

    function criarCobrinha() {
        for(i = 0; i < cobrinha.length; i++)
        {
            context.fillStyle = "#F2F2F2"
            context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box)
        }
    }

    function desenharComida() {
        context.fillStyle = "#5A5A5A"
        context.fillRect(comida.x, comida.y, box, box)
    }

    document.addEventListener('keydown', update)

    function update(event) {
        if(event.keyCode == 65 && direcao != 'direita') direcao = 'esquerda'
        if(event.keyCode == 87 && direcao != 'baixo') direcao = 'cima'
        if(event.keyCode == 68 && direcao != 'esquerda') direcao = 'direita'
        if(event.keyCode == 83 && direcao != 'cima') direcao = 'baixo'
    }

    function iniciarJogo() {
        if(cobrinha[0].x > 15 * box && direcao == "direita") cobrinha[0].x = 0
        if(cobrinha[0].x < 0 * box && direcao == "esquerda") cobrinha[0].x = 16 * box
        if(cobrinha[0].y > 15 * box && direcao == "baixo") cobrinha[0].y = 0
        if(cobrinha[0].y < 0 * box && direcao == "cima") cobrinha[0].y = 16 * box

        for(i = 1; i < cobrinha.length; i++) {
            if(cobrinha[0].x == cobrinha[i].x && cobrinha[0].y == cobrinha[i].y) {
                clearInterval(jogo)
                alert('Game Over')
                document.getElementById('jogo').style.display = 'none'
                document.getElementById('menu').style.display = 'flex'
                document.getElementById('mensagem-derrota').style.display = 'block'
                document.getElementById('mensagem-derrota').innerHTML = 'Você perdeu! Pontuação: ' + pontuacao
            }
        }

        criarBG()
        desenharComida()
        criarCobrinha()
        pontos.innerHTML = "Pontuacao: " + pontuacao

        let cobrinhaX = cobrinha[0].x
        let cobrinhaY = cobrinha[0].y
        if(direcao == "direita") cobrinhaX += box
        if(direcao == "esquerda") cobrinhaX -= box
        if(direcao == "cima") cobrinhaY -= box
        if(direcao == "baixo") cobrinhaY += box

        if(cobrinhaX != comida.x || cobrinhaY != comida.y) {
            cobrinha.pop()
        } else {
            comida.x = Math.floor(Math.random() * 15 + 1) * box
            comida.y = Math.floor(Math.random() * 15 + 1) * box
            pontuacao += 10
        }

        let novaCabeca = {x: cobrinhaX, y: cobrinhaY}
        cobrinha.unshift(novaCabeca)
    }

    let jogo = setInterval(iniciarJogo, 100)
}