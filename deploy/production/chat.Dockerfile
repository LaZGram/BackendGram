# Step 1: Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the NestJS application
RUN npm run build

# Step 7: Expose the application port
EXPOSE 3000

# Step 8: Define the command to run the application
RUN [ -d "./prisma" ] && echo "Prisma folder found. Running npx prisma generate..." && npx prisma generate || echo "Prisma folder not found. Skipping npx prisma generate."
CMD [ "npm", "run", "start:prod" ]
