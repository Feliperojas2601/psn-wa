FROM node:16.14-alpine as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build --prod

EXPOSE 4600

CMD ["npm", "run", "start:proxy", "--", "--host", "0.0.0.0"]