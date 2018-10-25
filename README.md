curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs
sudo yum install GraphicsMagick

git clone https://github.com/FlySnowIII/node-image-resize-tan.git
cd node-image-resize-tan/
npm install
sudo node resize.js /var/www/html/WhiteCrossHR/storage/app/public/com/
