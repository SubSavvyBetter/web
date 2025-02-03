FROM node:22-alpine

# Install yarn
RUN apk add --no-cache yarn

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Install serve globally using yarn
RUN yarn global add serve

# Copy the rest of the application
COPY . .

# Build argument for API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN yarn build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]