# Auctioning application - Backend

> Subfolder: `backend`

Made with Python 3.6, Django 2 and Django REST Framework.

## Initial setup

Either create a virtual environment through your IDE (Pycharm has this built in),
or create it with `virtualenv`.

```sh
$ virtualenv -p python3.6 venv
$ source venv/bin/activate     # or source venv/Scripts/activate (on Windows)
$ pip install -r requirements.txt
$ pre-commit install        # (pre-commit uninstall (if need to turn off))
```

In the same folder as `manage.py`:

```sh
$ python manage.py migrate # Sync your database for the first time
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

Important note: Since we use the `pre-commit` python package to check and format our files before
committing, this means that if you ran the line `pre-commit install` in the
setup, you have to be inside your `venv` to be able to commit (unless you install it globally).

#### General process

1. `git status`. Check that you're committing what you think you are committing (through IDE or with `git diff` or something)
2. `git add .`, or `git add example-file.py`, or `git add -A`
3. `git status`
4. `git commit -m "#4 a very good commit message"`
5. `git push`
6. Get conflict, try to fix but lie down and cry. You can avoid this step by working on
   your own branch :)

## Loading fixtures

Use the command `python manage.py shell_plus` to enter the enhanced python shell.

Creates 10 standard users

```python
from auction.users.factories import UserProfileFactory
users = UserProfileFactory.create_batch(size=10)
```

Creates 15 auctions

```python
from auction.auctions.factories import AuctionFactory
auctions = AuctionFactory.create_batch(size=15)
```

Total initialize script:

```python
from auction.users.factories import UserProfileFactory
from auction.auctions.factories import AuctionFactory
users = UserProfileFactory.create_batch(size=10)
auctions = AuctionFactory.create_batch(size=15)
```

Scripts I use often

```python
a = Auction.objects.latest("created")
for image in a.images.all():
    print(image.image)

auction = Auction.objects.get(pk=1)
image_list = auction.images.all()

images = AuctionImage.objects.all()
images

```
