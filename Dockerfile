FROM php:8.2-apache

RUN apt-get update && apt-get install -y libssl-dev unzip ca-certificates \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock* ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

COPY . .

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

EXPOSE 80

CMD bash -c "sed -i 's/80/${PORT:-80}/g' /etc/apache2/ports.conf /etc/apache2/sites-enabled/000-default.conf && apache2-foreground"
