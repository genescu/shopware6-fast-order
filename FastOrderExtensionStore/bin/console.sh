cd ../../../../

php bin/console plugin:refresh
php bin/console plugin:install FastOrderExtensionStore
php bin/console plugin:activate FastOrderExtensionStore
php bin/console cache:clear
