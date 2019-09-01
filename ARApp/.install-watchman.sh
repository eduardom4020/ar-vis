sudo apt install -y m4
sudo apt install -y autotools-dev automake
sudo apt update && apt install -y libssl-dev
git clone https://github.com/facebook/watchman.git
cd watchman/
git checkout v4.9.0
sudo apt install -y autoconf automake build-essential python-dev libssl-dev libtool
./autogen.sh
./configure --enable-lenient
make
sudo make install
cd ../
sudo rm -R -f watchman