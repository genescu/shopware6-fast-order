# composer require symplify/easy-coding-standard --dev
#php php-cs-fixer fix ../src --rules=@Symfony,-@PSR1,-blank_line_before_statement
php ../../../../vendor/bin/ecs check ../src --fix
