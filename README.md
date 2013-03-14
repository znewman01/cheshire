cheshire
========

Welcome to Cheshire, the simplest way to cause some harmless mischief for
your friends who run \*nix machines and leave them unattended.

Cheshire provides a one-stop solution for discreet remote access to a machine,
perfect for popping up videos like
[this](http://www.youtube.com/watch?v=eh7lp9umG2I) or
[this](http://www.youtube.com/watch?v=LbXiECmCZ94) by installing a cron job
that runs on the minute, fetching and executing shell commands from a unique
password-proected endpoint that you have access to.

Right now, it's deployed live [here](http://mrzackbot.cheshire.jit.su/). You
can deploy it yourself pretty trivially. Simply set the $MONGO\_URI environment
variable to an appropriate MongoDB URI and run `node app.js`. If you plan to do
anything bad, please do this on your deployment and not mine.

[![Nodejitsu Deploy Status Badges](https://webhooks.nodejitsu.com/znewman01/cheshire.png)](https://webops.nodejitsu.com#znewman01/cheshire)
