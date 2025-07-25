# Use official Node.js image with Debian (for apt-get)
FROM node:20-bullseye

# Install Python, pip, ffmpeg, and Whisper dependencies
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg && \
    pip3 install --upgrade pip && \
    pip3 install openai-whisper

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port (Render uses $PORT)
EXPOSE 4000

# Start the main server
CMD ["node", "server.js"] 