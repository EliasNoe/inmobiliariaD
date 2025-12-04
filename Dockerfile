FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install npm dependencies and build
RUN npm install && npm run build

# Create storage link (before cache)
RUN php artisan storage:link || true

# Set permissions
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Expose port
EXPOSE 8080

# Create startup script
RUN echo '#!/bin/bash\n\
set -e\n\
\n\
echo "Waiting for database..."\n\
max_retries=30\n\
retries=0\n\
until php artisan db:show > /dev/null 2>&1 || [ $retries -eq $max_retries ]; do\n\
  retries=$((retries+1))\n\
  echo "Database not ready, retrying ($retries/$max_retries)..."\n\
  sleep 2\n\
done\n\
\n\
if [ $retries -eq $max_retries ]; then\n\
  echo "Database connection failed after $max_retries attempts"\n\
  exit 1\n\
fi\n\
\n\
echo "Database connected!"\n\
\n\
# Clear caches\n\
php artisan config:clear\n\
php artisan cache:clear\n\
\n\
# Run migrations\n\
php artisan migrate --force\n\
\n\
# Optimize\n\
php artisan config:cache\n\
php artisan route:cache\n\
php artisan view:cache\n\
\n\
# Start server\n\
echo "Starting Laravel server..."\n\
php artisan serve --host=0.0.0.0 --port=8080\n\
' > /app/start.sh && chmod +x /app/start.sh

# Start command
CMD ["/app/start.sh"]
