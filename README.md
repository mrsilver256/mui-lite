## Material UI Kit Lite Open Source Project

A lite yet functional version of material ui

### Getting started

Run `yarn add mui-lite` to install this library  
Then somewhere in your code

```
import * as UI from 'mui-lite'
...
return <UI.Theme>
    <UI.Button>Click me</UI.Button>
</UITheme>
```

It's important to wrap your component inside `UI.Theme`, otherwise, the styles won't apply properly.

#### Note

You might need to include this code somewhere if you're using typescript  
`declare module mui-lite`

This is not the official build of Material UI team
### How to contribute

- Fork this project, run `yarn` to install necessary dependencies.
- Run `yarn dev` to start, then go to http://localhost:3000 to see the demo
- Happy coding

### Contact
Email: mrsilver256@gmail.com