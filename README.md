# statuspageBot
==================

This is an open source project published.

## Install
Clone the repo:

```
$ git clone git@github.com:afshinpaydar/statuspageBot.git
$ cd statuspageBot
```
Set `Slack` and `statuspage.io` credentials on `.env` file:

```
SLACK_BOT_TOKEN=xoxb-XXXXX-YYYYY
APP_TOKEN=xapp-ZZZZ-TTTT
API_KEY=GGGG-RRRRR
PAGE_ID=FFFFFFFF
```

```sh-session
$ make dev
```

## Logs

```
$ docker logs -f statuspage
```

## Clean up

```sh-session
$ make clean
```
