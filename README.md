# OriginalCubeRotation

* O programa roda?
Sim.

* A entrada e saída de dados é 
conforme o esperado?
Sim.

* Está formatado adequadamente?
Na medida do possível, planejei fazer algo simples em uma única página, sem direcionamentos.

* O programa resolve todos os 
casos, incluindo diferentes 
números de linhas e colunas, 
tabelas grandes e pequenas e 
casos de erro?
Sim, dentro das especificações do projeto.

* Para os casos tratados, estão 
sendo tratados corretamente?
Sim, todos os cados passados e vários outros que inserí.

* Como você sabe disso?
Fiz testes manualmente e automatizados.

* Você fez testes usando algum 
exemplo de dados? Se sim, por 
favor inclua isso no seu código.
Todos os exemplos foram testados.

* Você escreveu teste unitário?
Sim, os 6 testes descritos no documento. 

* Conte-nos sobre isso no README. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Casos de teste:
Entrada:
1, 2, 3, 4, 5, 6, 7, 8, 9
4, 2, 9, 1
-9
2, 3
3, -5, -2
1, 1, 1, 1, 1

Saída:
4, 1, 2, 7, 5, 3, 8, 9, 6 - Válido
9, 4, 1, 2 - Válido
-9 - Válido
2, 3 - Inválido
3, -5, -2 - Inválido
1, 1, 1, 1, 1 - Inválido


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
