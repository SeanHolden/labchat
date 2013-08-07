##Labchat

A simple video chat app using OpenTok - an API from TokBox.

This was a quick build for a bit of fun my place of work (The Lab UK).

---

##Setup instructions

__Set the following environment variables__

* TOKBOX_API_KEY
* TOKBOX_SECRET
* ROOT_URL (_only for in production_)

---

####To run the app locally

`NODE_ENV=development node server.js`

---

####When in production

Run `NODE_ENV=production` or set an environment variable and name it NODE_ENV with a value of 'production'.