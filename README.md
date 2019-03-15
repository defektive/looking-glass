# Looking Glass
## Anyproxy with love from a bughunter
-------
## Getting Started

```bash
docker-compose run -rm -w /usr/local/src/looking-glass/anyproxy proxy npm install

# Since I am using autochrome. I chose to not trust the CA.
docker-compose run -rm -w /usr/local/src/looking-glass/anyproxy proxy bin/anyproxy-ca

docker-compose up
```
then fire up your browser of choice. I recommend using [autochrome](https://github.com/nccgroup/autochrome).

## Current Status

- [x] Basic Intercept
- [ ] User friendly intercept (no more hand modifying the JSON)
- [ ] Repeater
- [ ] Brute Forcer/Intruder ???

## Why

- I kind of like to code.
- I like learning.

### Why not just use burp?

- It's a resource hog
- It requires java
- It cost money
- I really only use intercept, repeater, and sometimes intruder
