
```
For help see this page:
https://github.com/3DiVi/nuitrack-sdk/tree/master/PythonNuitrack-beta
sudo dpkg --install nuitrack-ubuntu-amd64.deb
pip3 install numpy
pip3 install py_nuitrack.whl (you ncan get nuittrack wheel from their website, a copy is under sdk_and_tools directory in this project )
nuitrack

```

```bash
sudo sh -c 'echo "export NUITRACK_HOME=/usr/etc/nuitrack" > /etc/profile.d/nuitrack_env.sh'
sudo sh -c 'echo "export LD_LIBRARY_PATH=/usr/local/lib/nuitrack" >> /etc/profile.d/nuitrack_env.sh'
```


#### Running the program
```
python3 main.py     # writes the wrist coordinates to right-wrist.csv
cd html-p5          # change directory
http-server -c-1    # start http-server with nodejs
```

