
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tabela from './components/Tabela';

function App() {

  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjtProduto] = useState(produto);



  useEffect(() => {
    fetch("http://localhost:8080/listar").then(retorno => retorno.json()).then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  const aoDigitar = (e) => {
    setObjtProduto({ ...objProduto, [e.target.name]: e.target.value });
  }

  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method: "post",
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json()).then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);

        } else {
          setProdutos([...produtos, retorno_convertido]);
          alert('Produto Cadastrado com Sucesso');
          limparFormulario();
        }
      })
  }

  const limparFormulario = () => {
    setObjtProduto(produto);
    setBtnCadastrar(true);
  }


  const selecionarProduto = (indice) => {
    setObjtProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  const deletar = () => {
    fetch("http://localhost:8080/deletar/" + objProduto.codigo, {
      method: "delete",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json()).then(retorno_convertido => {

        alert(retorno_convertido.mensagem);
        let vetorTemp = [...produtos];
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });
        vetorTemp.splice(indice, 1);
        setProdutos(vetorTemp);

        limparFormulario();

      })
  }

  const alterar = () => {
    fetch("http://localhost:8080/alterar", {
      method: "put",
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json()).then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);

        } else {


          alert('Produto alterado com sucesso');


          let vetorTemp = [...produtos];
          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.codigo;
          });
          vetorTemp[indice] = objProduto;
          setProdutos(vetorTemp);

          limparFormulario();

        }
      })

  }

  return (
    <div>
      {/* <p>{JSON.stringify(objProduto)}</p> */}
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} deletar={deletar} alterar={alterar} />
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
