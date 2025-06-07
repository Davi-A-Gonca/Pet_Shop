DROP USER IF EXISTS 'app_user'@'%';

CREATE USER 'uniara' IDENTIFIED BY 'uniara';

GRANT ALL PRIVILEGES ON db_products.* TO 'unira'@'%';

FLUSH PRIVILEGES;