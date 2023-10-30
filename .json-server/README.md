# JSON SERVER

## Intro

It is a NPM library to serve a JSON file and simulate an API.
Can be used to help front-end develop service calls before back-end gets ready.

### to start just run:

```shell
    $ npm run json-serve
```

It will run on localhost 4444 (to change port, modify on package.json script)

It suport POST, GET, DELETE, PUT and PATCH calls.

### Basic use exemple:

```JSON
{
    "test" : {
        "im" : true,
        "message" : "this is a message"
    }
}
```

For the code above, to access using the browser: http://localhost:4444/tests or httpHelper:

```js
httpHelper.request({baseURL: 'localhost:4444', url="/tests", method: "get"})
```

It will respond:

```JSON
{
    "im" : true,
    "message": "this is a message"
}
```

To learn more about its uses check the docs (https://www.npmjs.com/package/json-server).
