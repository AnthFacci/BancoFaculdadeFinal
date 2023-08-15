class Client {
    constructor(nome) {
        this.nome = nome;
    }
}

class contaCorrente {
    constructor() {
        this.movimento = new movimentoBancario();
        this.tipoDaConta = "";
        this.custoAdicional = 0;
    }

    realizaDeposito(valor) {
        if (this.movimento.movimento.length !== 0) {
            let saldoAtual = this.movimento.movimento[this.movimento.movimento.length - 1];
            saldoAtual = saldoAtual + valor
            this.movimento.adicionarMovimento(saldoAtual);  
        } else {
            this.movimento.adicionarMovimento(valor);
        }
    }
    
    realizarSaque(valor) {
        const saldoAtual = this.movimento.movimento[this.movimento.movimento.length - 1];
        const novoSaldo = saldoAtual - valor; 
        this.movimento.adicionarMovimento(novoSaldo);  
        
    }
    obterSaldo2(){
        return this.movimento.movimento[this.movimento.movimento.length - 1]
    }

    definirTipoDaConta(tipo) {
        this.tipoDaConta = tipo;
    }

    obterValorMensalidade() {
        const saldo = this.movimento.obterSaldo();
        let valorPacote = 0, custoAdicional = 0, valorDesconto = 0, mensalidade = 0;
    
        if (this.tipoDaConta === "contaTotal") {
            valorPacote = 50;
            valorDesconto = this.calcularDesconto(saldo, 200, 2000, 0, 44.44); // Desconto conforme exemplo
        } else if (this.tipoDaConta === "contaSimples") {
            valorPacote = 20;
            custoAdicional = 1.00 * Math.max(this.movimento.movimento.length - 5, 0); 
            valorDesconto = this.calcularDesconto(saldo, 100, 1500, 0, 64.28); // Desconto conforme exemplo
        } else if (this.tipoDaConta === "contaEconomica") {
            valorPacote = 10;
            custoAdicional = 1.50 * Math.max(this.movimento.movimento.length - 1, 0); 
            valorDesconto = 0; // Não há desconto para contaEconomica conforme exemplo
        }
    
        // Aplicar o desconto corretamente
        mensalidade = (valorPacote + custoAdicional) * (1 - valorDesconto / 100);
        
        return mensalidade.toFixed(2);
    }
    
    
    

    calcularDesconto(valor, minRange, maxRange, minPercent, maxPercent) {
        if (valor >= minRange && valor <= maxRange) {
          const percentRange = maxPercent - minPercent;
          const percent = minPercent + ((valor - minRange) / (maxRange - minRange)) * percentRange;
          return percent;
        }
        return 0;
      }
}

class movimentoBancario {
    constructor() {
        this.movimento = [];
    }

    adicionarMovimento(valor) {
        this.movimento.push(valor);
        
    }
    obterSaldo(){
          
        return this.movimento.reduce((saldo, valor) => saldo + valor, 0);
    }

}

let tipoDaConta = "";

const menuScreen = document.getElementById('btnName');
  
  menuScreen.addEventListener('click', (ev) => {
        ev.preventDefault();
            //Variáveis dos elementos
                const divSaque = document.getElementsByClassName('saqueScreen')[0];
                const telaDeposito = document.getElementsByClassName('depositScreen')[0];
                const telaInicial = document.getElementsByClassName('name')[0]; 
                const menuScreen = document.getElementsByClassName('menuScreen')[0];
                const telaSaque = document.getElementsByClassName('saldoEmConta')[0];
                const defConta = document.getElementsByClassName('altenarConta')[0];
                const altConta = document.getElementsByClassName('altenarConta2')[0];
                const menuMensalidade = document.getElementsByClassName('menuMensalidade')[0];
                const btnTelaDeSaque = document.getElementById('btnSaque')
                const btnDeSaque = document.getElementById('saque') 
                const btnDeposito = document.getElementById('btnDeposito')
                const btnSaldo = document.getElementById('saldoConta')
                const btnVoltarSaldo = document.getElementById('voltarMenu')
                const BtnVoltar = document.getElementById('BtnVoltar')
                const voltarMenuMensalidade = document.getElementById('btnVoltarMensalidade')
                const inputNm = document.getElementById('inputName').value;
                const clientName = document.getElementById('cliente'); 
                const sair = document.getElementById('sair')
                const deposito = document.getElementById('deposito')
                const voltar = document.getElementById('voltar')
                const spanSaldo = document.getElementById('saldo')
                const defTotal = document.getElementById('defTotal')
                const defSimples = document.getElementById('defxSimples')
                const defEconomic = document.getElementById('defEconomic')
                const altTotal = document.getElementById('maxTotal')
                const altSimples = document.getElementById('maxSimples')
                const altEconomico = document.getElementById('maxEconomic')
                const btnVoltarAlterar = document.getElementById('btnVoltarSwitch')
                const typeAcount = document.getElementById('typeAcount')
                const mensalidade = document.getElementById('mensalidade')
                const spanMensalidade = document.getElementById('mensal')
                const contaC = new contaCorrente()
                
                
            //Mudar o nome do titulo para o do cliente
                if (inputNm.trim() === "") {
                    alert("Por favor, preencha o campo de nome.");
                    return; 
                }
                telaInicial.classList.add('none');
                menuScreen.id = 'none'
                defConta.id = '';
                clientName.innerText = inputNm;
            //Tipo da conta
                defTotal.addEventListener('click', () =>{
                    contaC.definirTipoDaConta('contaTotal');
                     defConta.id = 'none6';
                     menuScreen.id = '';
                     console.log(contaC.tipoDaConta)
                })
       
                defSimples.addEventListener('click', () =>{
                    contaC.definirTipoDaConta('contaSimples');
                     defConta.id = 'none6';
                     menuScreen.id = '';
                     console.log(contaC.tipoDaConta)
                })

                defEconomic.addEventListener('click', () =>{
                     contaC.definirTipoDaConta('contaEconomica'); 
                     defConta.id = 'none6';
                     menuScreen.id = '';
                     console.log(contaC.tipoDaConta)
                })
            //Sair
                sair.addEventListener('click', () =>{
                    menuScreen.id = 'none';
                    telaInicial.classList.add('none');
            } )
            //abrir menu deposito    
                deposito.addEventListener('click', () =>{
                        telaInicial.classList.add('none');
                        menuScreen.id = 'none';
                        telaDeposito.id = '';
                        divSaque.id = 'none3';

                    } )
            //depositar valor    
                btnDeposito.addEventListener('click', () =>{
                    const depositValue = parseFloat(document.getElementById('depositValue').value)
                    contaC.realizaDeposito(depositValue)
                    console.log(contaC.movimento)
                    document.getElementById('depositValue').value = "";
                    alert('Depósito realizado com sucesso!')
                })
            //voltar ao menu
                voltar.addEventListener('click', () =>{
                    telaInicial.classList.add('none');
                    menuScreen.id = '';
                    telaDeposito.id = 'none';
                    divSaque.id = 'none3';
                })
            //Abrir menu de saque
                btnDeSaque.addEventListener('click', ()=>{
                    telaInicial.classList.add('none');
                    menuScreen.id = 'none';
                    telaDeposito.id = 'none2';
                    divSaque.id = '';
                })
            //sacar valor
                btnTelaDeSaque.addEventListener('click', ()=>{
                    const saqueValue = parseFloat(document.getElementById('saqueValue').value)
                    contaC.realizarSaque(saqueValue) 
                    console.log(contaC.movimento)
                    document.getElementById('saqueValue').value = "";
                    alert('Saque realizado com sucesso!')

                })     
            //Voltar ao menu    
            BtnVoltar.addEventListener('click', () =>{
                telaInicial.classList.add('none');
                    menuScreen.id = '';
                    telaDeposito.id = 'none2';
                    divSaque.id = 'none3';
            })
            //Saldo em conta 
            btnSaldo.addEventListener('click', () =>{
                telaInicial.classList.add('none');
                menuScreen.id = 'none';
                telaDeposito.id = 'none2';
                divSaque.id = 'none3';
                telaSaque.id = '';
                spanSaldo.innerHTML = contaC.obterSaldo2();
                if(contaC.movimento.movimento == ''){
                    spanSaldo.innerHTML = 0;
                }
            })
            //Voltar ao menu 
            btnVoltarSaldo.addEventListener('click', ()=>{
                telaInicial.classList.add('none');
                menuScreen.id = '';
                telaDeposito.id = 'none2';
                divSaque.id = 'none3';
                telaSaque.id = 'none4';
            })
            //Menu para alterar o tipo da conta
            typeAcount.addEventListener('click', () => {
                menuScreen.id = 'none';
                altConta.id = '';
            })
            //Alterar o tipo da conta            
            altTotal.addEventListener('click', () => {
                contaC.definirTipoDaConta('contaTotal');
                alert('O tipo da conta foi alterado com sucesso');
                spanMensalidade.innerHTML = contaC.obterValorMensalidade();
                console.log(contaC.tipoDaConta);
            });
            
            altSimples.addEventListener('click', () => {
                contaC.definirTipoDaConta('contaSimples');
                alert('O tipo da conta foi alterado com sucesso');
                spanMensalidade.innerHTML = contaC.obterValorMensalidade();
                console.log(contaC.tipoDaConta);
            });
            
            altEconomico.addEventListener('click', () => {
                contaC.definirTipoDaConta('contaEconomica');
                alert('O tipo da conta foi alterado com sucesso');
                spanMensalidade.innerHTML = contaC.obterValorMensalidade();
                console.log(contaC.tipoDaConta);
            });
            btnVoltarAlterar.addEventListener('click', ()=>{
                menuScreen.id = '';
                altConta.id = 'none5';
            })
            //Menu mensalidade
            mensalidade.addEventListener('click', ()=>{
                menuScreen.id = 'none';
                menuMensalidade.id = '';
                spanMensalidade.innerHTML = contaC.obterValorMensalidade() 
            })
            //Voltar para o menu 
            voltarMenuMensalidade.addEventListener('click', () =>{
                menuMensalidade.id = 'none7'
                menuScreen.id = ''
            })
        
});
  
