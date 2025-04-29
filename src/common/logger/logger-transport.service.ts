//Criar métodos personalizados para o LoggerService_

/*
    È nesse ServiceTransport onde centralizamos todos os métodos personalizados com informações que iremos inserir no log_
    Então ao invez de criar todas as lógicas específicas dentro do LoggerService, iremos utilizar esse LoggerTransportService
    para criar métodos específicos que executam uma ação que será refletida nos logs, ou por meio deles_
    Essa classe será onde eu quero armazenar esses meus dados dos logs, será métodos personalizados que vão ser usados
    para indicar ou configurar onde essas informações serão armazenadas_
    . Portanto, o transporte vai ser as várias fontes onde vamos salvar os nossos logs, seja em um banco, seja enviado por email, e etc.
    Ao inves de criar essas lógicas dentro dos métodos do service, irei criar nessa classe específica, como 
    armazenar los em arquivos, email, ou de forma onlines, e etc.
*/
export class LoggerTransportService{
    constructor(){}
}