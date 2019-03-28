help:
	@echo 'load_test_fixtures     - load all test_fixtures'

load_test_fixtures:
	./manage.py loaddata auction/users/fixtures/test_users.yaml
	./manage.py loaddata auction/auctions/fixtures/test_auctions.yaml

.PHONY: help load_test_fixtures