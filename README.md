# ![Aukjonsbua](media/budbua-banner.png)

[![build status](https://gitlab.stud.idi.ntnu.no/programvareutvikling-v19/gruppe-67/badges/master/pipeline.svg)](https://gitlab.stud.idi.ntnu.no/programvareutvikling-v19/gruppe-67/pipelines)
[![MIT](https://badgen.net/badge/license/MIT/green?style=flat-square)](https://en.wikipedia.org/wiki/MIT_License)
![python](https://img.shields.io/badge/python-3.6+-blue.svg)
![node](https://img.shields.io/badge/node-8+-blue.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)
[![PEP8](https://img.shields.io/badge/code%20style-pep8-orange.svg)](https://www.python.org/dev/peps/pep-0008/)

## Hva er dette? 
Auksjonsbua er en nettside for auksjoner og er eid av BudBua AS, den største og eldste auksjonsdriveren i Norge. Hvem som helst kan opprette en bruker og lage auksjoner, eller by på andres auksjoner. Siden kommer med et admin-panel og en statistikk side for eieren, og en egen brukerside med detaljer.

## Forhåndsvising

[See the live webside here](https://auksjonsbua.herokuapp.com/)

# ![Aukjonsbua](media/screenshot-landingpage.png)

## Teknologi

<b>Bygget med </b>


- [React 16](https://reactjs.org/) og [React Redux](https://react-redux.js.org/)
- [Django 2](https://www.djangoproject.com/) og [Django REST Framework](https://www.django-rest-framework.org/)

## Installasjon
Oppsettet av prosjektet er delt i to deler: [backend](https://gitlab.stud.idi.ntnu.no/programvareutvikling-v19/gruppe-67/tree/master/backend) og [webapp](https://gitlab.stud.idi.ntnu.no/programvareutvikling-v19/gruppe-67/tree/master/webapp).
<b>All kommandoer skrives inn i terminal.</b> For Windows anbefaler vi PyCharms terminal for enklere oppsett.

### Teknologiske krav
Pass på at du har en fungerende installasjon av : 

- [Python 3.6](https://www.python.org/) eller nyere
- [Node 8](https://nodejs.org/en/) eller nyere

Dette er basen til prosjektet, og har ikke blitt testet på tidligere versjoner.

### Sette opp backend
1. Sett opp et "virtual environment" for å inneholde våre pakker. Dette kan gjøres gjennom en IDE slik som  [PyCharm](https://www.jetbrains.com/pycharm/) (spesielt hendig for Windows-brukere), eller opprett med [`virtualenv`](https://virtualenv.pypa.io/en/stable/) som vist under.


```sh
$ cd backend
$ virtualenv -p python3.6 venv     # Create a virtual environment
$ source venv/bin/activate       # or on Windows: $ source venv/Scripts/activate
```
2. Pass på at du er i  `backend` mappen, og deretter installer pakkene og kjør utviklingsserveren:


```sh
$ pip install -r requirements.txt      # Install the required packages
$ python manage.py migrate             # Create the tables in the db
$ python manage.py loaddata **/fixtures/*.yaml  # Fill the db with test data, may skip this.
$ python manage.py runserver           # Run the development server
```

Nå som backend bør være oppe å kjøre på [localhost:8000](http://localhost:8000/) og viser sin søkbare API.

For mer detaljer på backend [see our README in the `backend` folder](backend/README.md)

### Sett opp webapp
1. Åpne en ny terminal ( Ikke lukk den som kjører backend)
2. Installer pakkene og start utviklingsserveren:


```sh
$ cd webapp           # Enter the correct folder
$ npm i               # Install the required packages
$ npm start           # Run the development server
```
Nå som webappen bør være oppe å kjøre på [localhost:3000](http://localhost:3000/) og skal ha muligheten for å koble sammen med backend som allerede har blitt satt opp.

For mer detaljer på webapp, se [see our README in the `webapp` folder](webapp/README.md)

<b>NB for oppsett på Windows:</b>
Hvis du allerede har Python 3.6+ med virtualenv og et Node environment oppsatt på din Windows maskin, kjøre prosjektet burde være like lett som vist over. Men hvis du støtet på problemer urelatert til prosjektet, er internett din beste venn, men du kan også opprette en issue hvis du tror det er relatert til å sette opp prosjektet generelt på Windows.


## Noen praktiske notater

Tilgang til admin-panelet på [localhost:8000/admin/](localhost:8000/admin/) og logg inn med en superuser.


Hvis du logger inn med en admin- eller eier-bruker, kan du se "statistikk"-siden. 

## Tester

### Backend

Kjør testene med

##### `python manage.py test`

For å sjekke om backenden følger definert standard for kodestil, kjør følgende kommandoer

```sh
$ isort -c -rc auction
$ black --check auction
```
Du kan fikse kodestilfeil med å kjøre dette:

```sh
$ isort -rc auction
$ black auction
```

### Webapp

Kjør testene med

##### `npm run test`

og


##### `npm run cypress`

For å sjekke om frontend-koden følger definert standard for kodestil, kjør følgende kommando:

```sh
$ npm run lint
```
Du kan fikse kodestilfeil ved å kjøre dette:

```sh
$ npm run prettier
```

## Deploying

Vi anbefaler [Heroku](https://www.heroku.com) for lett deployment. Vi har satt opp CI/CD slik at når vi pusher til "prod"-branch,  legger den til "deploy"-steget som kjører kun hvis testene er vellykket. For at dette skal fungere er følgende linjer i `.gitlab-ci.yml´-filen lik Heroku-app navnene.

Backend app

```yaml
dpl --provider=heroku --app=<name of backend app on heroku> --api-key=$HEROKU_API_KEY
```
Frontend app (koden kan ikke ha "linting"- errors)

```yaml
dpl --provider=heroku --app=<name of frontend app on heroku> --api-key=$HEROKU_API_KEY
```

`$HEROKU_API_KEY` Er den hemmelige API nøkkelen som er knyttet til Heroku brukeren, og er satt i Gitlab "environment variables" instillinger. Hvis denne nøkkelen ikke er satt vil ikke pipelinen være vellykket under deployment. 

## Bidra
Hvis du møter på problemer, har noen spørsmål eller ønsker om endringer til applikasjonen er du velkommen til å bidra. Vennligst les vår [contributing guidelines](CONTRIBUTING.md) for å finne ut hvordan man starter opp.

## Laget 
[Sigrid Marita Kvamme](https://github.com/cherrybeans)
| [Katrine Gjerde](https://gitlab.stud.idi.ntnu.no/katrinjg) | [Henrik Grüner](https://gitlab.stud.idi.ntnu.no/henrgr) | [Viggo Skarby](https://gitlab.stud.idi.ntnu.no/viggosk) | [Martin Kvalheim](https://gitlab.stud.idi.ntnu.no/martkval) | [Håvard Lund](https://gitlab.stud.idi.ntnu.no/haavalu)

## Lisense

BudBua støtter åpen kildekode og har laget prosjektet tilgjengelig med [MIT license](LICENSE).

MIT © [BudBua AS](https://auksjonsbua.herokuapp.com/)
