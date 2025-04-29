/*
    Esse arquivo será responsável por criar um subscriber para a entidade do módulo,
    sabendo que um subscriber será o ouvinte de um evento executado por uma entidade.

    A princípio, irei utilizar o decorador @EventSubscriber() que será responsável por
    especificar que aquela classe específica será um subscriber(esutador de eventos).
    
    Após isso, irei construir  a classe do subscriber, já nessa classe eu preciso implementar
    a propriedade EntitySubscriberInterfce<Especifico a entidade>, pois somente atraves
    dessa implementação é que terei acesso aos métodos do subscriber, métodos que
    só serão executados em algum evento da entidade especificada.
*/

/*
Eu posso executar um método subscriber principalmente para validar dados ou executar alguma lógica
dos dados capturados nas requisições.
*/

//Importando o decorador e a propriedade que será implementada na classe_
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

//Entidade que será especificada no subscriber que atravez de algum evento na entidade, esse subscriber é executado_
import { User } from "../entities/User";

@EventSubscriber()//Decorador utilizado para indicar que essa classe será um subscriber_
export class SubscriberUser implements EntitySubscriberInterface<User>{//especificando a entidade;

 //Precisarei inserir esse método da propriedade EntitySubsciberInterface<User> 
 //para especificar a entidade que será escutada apartir desse subscriber_
  listenTo(): Function | string {
      return User
  }

  //Após isso, irei adicionar os métodos pre-definidos do subscriber_

  //Método executado depois de inserir algum dado na entidade_
  afterInsert(event: InsertEvent<User>): Promise<any> | void {
      console.log('Método executado depois de inserir dados na entidade!')
  }

  //Método executado antes de adicionar ou inserir algum dado na entidade_
  beforeInsert(event: InsertEvent<User>): Promise<any> | void {
      console.log('Método executado antes de inserir algum dado na entidade!'+event.entity.email)
      //Eu ainda posso buscar os campos da entidade atravez do argumento event dos métodos_
      const email = event.entity.email;

      //E eu posso criar lógicas de negócio no subscriber que será executado em algum momento da execução da entidade,
      //Como hashear uma senha_
      const password = event.entity.password;
      const name = event.entity;


      //VERIFICANDO EMAIL_

  }

  //Método executado antes de atualizar algum dado na entidade_
  beforeUpdate(event: UpdateEvent<User>): Promise<any> | void {
      console.log(event.entity);
      console.log(event)
  }

  //Entre outros métodos que serão executados em algum evento específico da entidade;
}