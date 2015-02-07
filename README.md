Rico
====

How to
------

* Test the application:

  - Run all containers
  - Start browser: `http://0.0.0.0:8000`

* Run all containers:

```bash
fig up -d
```

* To see what environment variables are available to the web service:

`fig run web env`

* Install Fig (docker-compose):

Use `pip`:

```bash
# Install virtualenv
sudo pip install virtualenv
# Create a virtual environment
virtualenv .rico
# Activate virtual environment
source .rico/bin/activate
# Install Fig
pip install -U fig
```

Or, use a release available for OS X and 64-bit Linux:

```bash
curl -L https://github.com/docker/fig/releases/download/1.0.1/fig-`uname -s`-`uname -m` > /usr/local/bin/fig; chmod +x /usr/local/bin/fig
```
