const firebaseConfig = {
    apiKey: "AIzaSyDc1ul6SGktTumlcCCPwJ0LYaVyox9_stI",
    authDomain: "primeiroprojeto-3741e.firebaseapp.com",
    databaseURL: "https://primeiroprojeto-3741e-default-rtdb.firebaseio.com",
    projectId: "primeiroprojeto-3741e",
    storageBucket: "primeiroprojeto-3741e.appspot.com",
    messagingSenderId: "1096247195106",
    appId: "1:1096247195106:web:367da9aab6fa52eef8f5bb",
    measurementId: "G-RK97EL29D5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
const TURMA_A = 'TurmaA'
var aprovados = []

// Ler todos os dados de uma coleção

verificaMedia()


function colocaAluno() {
    let aluno = prompt('Digite o nome do aluno: ')
    let sobrenomeAluno = prompt(`Digite o sobrenome de ${aluno}`)
    let prova1 = parseFloat(prompt(`Digite a nota da Av1 de aluno: ${aluno}`))
    let prova2 = parseFloat(prompt(`Digite a nota da Av2 de aluno: ${aluno}`))
    let prova3 = parseFloat(prompt(`Digite a nota da Av3 de aluno: ${aluno}`))

    alert("Finalizar?")
    db.collection(TURMA_A).add({
        nome: `${aluno}`,
        sobrenome: `${sobrenomeAluno}`,
        provas: { Av1: `${prova1}`, Av2: `${prova2}`, Av3: `${prova3}` }
    })
    verificaMedia()
}


function verificaMedia() {
    db.collection(TURMA_A).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc)
            console.log(doc.id)
            console.log(doc.data())
            console.log(doc.data().nome + " " + doc.data().sobrenome)
            console.log(doc.data().provas)
            let media = ((parseFloat(doc.data().provas.Av1) + parseFloat(doc.data().provas.Av2) + parseFloat(doc.data().provas.Av3)) / 3)
            console.log(Math.floor(media))
            if (media >= 7) {
                aprovados.push(doc.data().nome)
                aprovacao(doc.id, media)

            } else {
                reprovacao(doc.id, media)
            }

        })
        aprovados.forEach(aluno => console.log(aluno))
        aprovados = []
    })
}

function aprovacao(id, mediaFinal) {
    db.collection(TURMA_A).doc(id).update({ resultado: 'APROVADO' })
    db.collection(TURMA_A).doc(id).update({ media: `${mediaFinal}` })
}
function reprovacao(id, mediaFinal) {
    db.collection(TURMA_A).doc(id).update({ resultado: 'REPROVADO' })
    db.collection(TURMA_A).doc(id).update({ media: `${mediaFinal}` })
}