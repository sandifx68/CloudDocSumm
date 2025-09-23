FROM node
WORKDIR /backend
COPY package.json /backend
RUN npm install 
# Copying rest of the code after installing packages to make sure we don't reinstall the packages when not needed
COPY . /backend
CMD ["npm","run","start"]
