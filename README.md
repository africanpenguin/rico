Rico
====

How to
------

* Run all containers:

`./fig up`

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
