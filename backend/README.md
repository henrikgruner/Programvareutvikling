# Auctioning application - Backend

> Subfolder: `backend`

Made with Python 3.6, Django 2 and Django REST Framework.

## Setup

Either create a virtual environment through your IDE (Pycharm has this built in),
or create it with `virtualenv`.

```sh
$ virtualenv -p python3.6 venv
$ source venv/bin/activate          # or source venv/Scripts/activate (on Windows)
$ pip install -r requirements.txt
$ python manage.py migrate          # Sync your database for the first time
$ python manage.py runserver
```

Now the backend should be up and running on [localhost:8000](http://localhost:8000/) and exposing its browsable API.

### Loading fixtures

Creates a superuser, a owner user (staff but not superuser) and two regular users all with the password "password123", in addition to some auctions.

```sh
$ python manage.py loaddata **/fixtures/*.yaml
```

## Usual development setup to run backend

Remember to do the usual git stuff at the start of each session, to keep you in sync with the `master` branch on GitLab. By using the command `pip-sync` you can easily sync your virtual environment with with what is defined in `requirements.txt` (important to keep stuff working).

In the `backend` folder:

```sh
$ source venv/bin/activate     # or source venv/Scripts/activate (on Windows)
$ python manage.py runserver
```

Note: If it says that you have not applied some migrations, you need to
run `python manage.py migrate`.

If you make changes to any `models.py`, you need to run `python manage.py makemigrations` and then `python manage.py migrate` so that your database is in sync. `makemigrations` will create some files in a `migrations/` subfolder, and you need to commit all those files.

## Git

### Committing

To fix the codestyle before committing the code, run the following:

```sh
$ isort -rc auction
$ black auction
```

### General process

1. `git status`. Check that you're committing what you think you are committing (through IDE or with `git diff` or something)
2. `git add .`, or `git add example-file.py`, or `git add -A`
3. `git status`
4. `git commit -m "#4 a very good commit message"`
5. `git push`
6. Get conflict, try to fix but lie down and cry. You can avoid this step by working on
   your own branch :) (or google it, lots of good resources out there)
