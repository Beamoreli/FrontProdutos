function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, deletar, alterar }) {
    return (

        <form>
            <input type="text" value={obj.nome} onChange={eventoTeclado} name="nome" placeholder='Nome' className="form-control" />
            <input type="text" value={obj.marca} onChange={eventoTeclado} name="marca" placeholder="Marca" className="form-control" />

            {
                botao
                    ?
                    <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-secondary" />
                    :
                    <div>
                        <input type="button" value="Alterar" onClick={alterar} className="btn btn-primary" />
                        <input type="button" value="Deletar" onClick={deletar} className="btn btn-warning" />
                        <input type="button" value="Cancelar" onClick={cancelar} className="btn btn-danger" />
                    </div>
            }
        </form>
    );
}


export default Formulario;