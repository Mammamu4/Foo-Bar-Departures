FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy the Vite build output to the web server's root directory
COPY dist/ ./

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
