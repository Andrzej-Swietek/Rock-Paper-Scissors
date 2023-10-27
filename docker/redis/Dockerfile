# Use an official Redis base image
FROM redis:latest

CMD ["mkdirt -p /var/lib/redis"]
# Set the Redis configuration file
COPY redis.conf /usr/local/etc/redis/redis.conf
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]

# Expose Redis port
EXPOSE 6379
