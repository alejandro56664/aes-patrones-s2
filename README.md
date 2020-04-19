# Cotiza Fácil

La aplicación Cotiza Fácil fue desarrollada para ofrecer a compradores la oportunidad de cotizar productos con distintos proveedores y a su vez permitirles a los proveedores la integración a través de servicios o la gestión de su catálogo y respuesta a cotizaciones directamente desde la plataforma.  

## Requerimientos Funcionales Establecidos
|Código | Descripción |
| --- | --- |
|R00 |Inscripción e ingreso (login) de Clientes a través del portal |
|R01 |Inscripción e ingreso de proveedores |
|R02 | Registro de catálogos de bienes y servicios (Incluyendo precios) con el fin de ofrecer a esas empresas que no tiene un sistema de cotización una herramienta para controlar una parte de su operación (Venta).|
|R03 |Registro de cotizaciones por parte de los clientes autenticados, sobre los productos o servicios que busca.|
|R04 |Las cotizaciones deben ser constituidas por bienes y servicios (Limitado) de un catálogo el cual es importante para realizar posteriores ofertas por parte de los proveedores. El catálogo puede ser externo o interno.|
|R05 |Los sistemas de cotización de los proveedores deben integrarse con el sistema ofertas con cambios menores en sus arquitecturas |
|R06 | Se debe permitir que los proveedores oferten sus precios para una cotización registrada por un cliente, una vez se encuentre completa la oferta para la misma se debe notificar al cliente por medio de un Email y SMS |
|R07 |El cliente podrá ver una serie de estadísticas de manera gráfica acerca del estado de las aplicaciones hechas por todos los proveedores (Histórico de los proveedores y sus respectivas ofertas) |

### Restricciones a cumplir

|Código |Descripción |
| --- | --- |
|C01 | Los cambios que ocurran en las transacciones de negocio deberán reflejarse en tiempo real |
|C02 | Se requiere que el número de intercambios de información entre los participantes sea el menor posible. |
|C03 | Integración con plataformas de proveedores con reconfiguración flexible (Realizar cambios sin necesidad de reiniciar el sistema) |


## Atributos de Calidad de la solución
| Atributo | Descripcion |
| --- | --- |
|De alta disponibilidad |Que tenga una configuración de alta disponibilidad de más de 99%. Aunque no está explicito en la tabla de requerimientos inicial, se entiende que la disponibilidad es de suma importancia al ser un servicio de venta intermediario. Impacta a todos los requerimientos, en especial R03 y R06.| 
|Elástica|Maximizar uso de recursos y que pueda responder ágilmente a las condiciones del mercado. Aunque no está explicito en la tabla de requerimientos inicial, se espera tener un número creciente de usuarios y es importante soportar la demanda cuando crezca. Impacta a todos los requerimientos, en especial R03 y R06 |
|Mantenible|Que sea sencilla de actualizar y mejorar. Requerimiento R05 y restricción C03 |
|Interoperable|Que pueda funcionar con distintos proveedores. Basada en estándares abiertos. Altamente relacionado con el requerimiento R05, R06 y la restricción C03 |
|Usabilidad |Que tenga una experiencia de usuario sencilla y fácil de usar. Requerimiento R02, R03, R07 |
|Seguridad | Que no comprometa la información sensible de los usuarios en ninguno de los componentes de la solución. Requerimiento R00, R01 y restricción C02 |
|Auditable | El registro de las transacciones debe quedar registrado para auditorias externes y por el propio usuario. Requerimiento R07 |
|Rendimiento  | Que el uso de los recursos computacionales sea óptimo. Impacta la restricción C01, para el envío de respuestas en tiempo real. |



## Patrones de Diseño Implementados

### Patrón nuclear
  Publicador/Suscriptor
  
### Patrones complementarios
  Capas
  Cliente/Servidor
  Patrones de Mensajería EAI 
    Return address 
    Scatter-Gather 
    Canonical Data Model


### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc




# Appaes
Para ejecutar se debe ejecutar el backend
dentro de la carpeta server ejecutar:
npm run dev
Para ejecutar frontend dentro de la carpeta client ejecutar:
ng serve

En una BD mysql ejecutar el archivo que hay en la carpeta base de datos en el esquema de base de datos preferido.


# Appaes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).






