# Auctioning application - Backend

> Subfolder: `backend`

Made with Python 3.6, Django 2 and Django REST Framework.

## Initial setup

Either create a virtual environment through your IDE (Pycharm has this built in),
or create it with `virtualenv`.

```sh
$ virtualenv -p python3.6 venv
$ source venv/bin/activate
$ pip install -r requirements.txt
$ pre-commit install
```

In the same folder as `manage.py`:

```sh
$ python manage.py migrate # Sync your database for the first time
```

## Usual development setup to run backend

Remember to do the usual git stuff at the start of each session, to keep you in sync with the `master` branch on GitLab. Ved å bruke kommandoen `pip-sync` vil du synkronisere ditt virtual environment mot det som er definert i `requirements.txt` (som er viktig for å unngå feil).

In the backend folder:

```sh
$ source venv/bin/activate
$ python manage.py runserver
```

Note: If it says that you have not applied some migrations, you need to
run `python manage.py migrate`.

If you make changes to any `models.py`, you need to run `python manage.py makemigrations` and then `python manage.py migrate` so that your database is in sync. `makemigrations` will create some files in a `migrations/` subfolder, and you need to commit all those files.
