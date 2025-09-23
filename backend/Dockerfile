FROM node
WORKDIR /frontend
COPY package.json /frontend
RUN npm install 
# Copying rest of the code after installing packages to make sure we don't reinstall the packages when not needed
COPY . /frontend
CMD ["npm","run","start"]
