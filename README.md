
<p align="center">
  <img src="https://avatarsolucoesdigitais.com.br/images/avatar-git.svg" height="72" width="256" alt="Avatar Solucoes Digitais" />
</p>


# rollcolumn-react
[![NPM](https://img.shields.io/npm/v/rollcolumn-react.svg)](https://www.npmjs.com/package/rollcolumn-react)[![License: MIT](https://img.shields.io/github/license/avatarsolucoes/rollcolumn-react.svg)](LICENSE)

> React **web** component

view in production: http://rollcolumn-react.avatarsolucoesdigitais.com.br

## Install

```bash
yarn add rollcolumn-react
```
or
```bash
npm i rollcolumn-react
```

## Usage

**with label:**
```jsx
import React from 'react'
import RollColumn, { Column, LabelColumn } from 'rollcolumn-react'

export default function Page() {
  return (
    <div className="content">
      <RollColumn name="myName">
        <Column order={1}>
          <p>Content 1</p>
          <LabelColumn to={2}>goto 2</LabelColumn>
        </Column>
        <Column order={2}>
          <p>Content 2</p>
          <LabelColumn to={1}>back to 1</LabelColumn>
        </Column>
      </RollColumn>
    </div>
  )
}
```

**external navigation (without label component):**

```jsx
import React from 'react'
import RollColumn, { Column, LabelColumn, gotoColumn } from 'rollcolumn-react'

export default function Page() {

  function goto(columnNumber) {
    gotoColumn('myName', columnNumber)
  }

  return (
    <div className="content">
      <RollColumn name="myName">
        <Column order={1}>
          <p>Content 1</p>
          <LabelColumn to={2}>goto 2</LabelColumn>
          <br/>
          <button type="button" onClick={() => { goto(2) }}>GOTO 2</button>
        </Column>
        <Column order={2}>
          <p>Content 2</p>
          <LabelColumn to={1}>back to 1</LabelColumn>
          <br/>
          <button type="button" onClick={() => { goto(1) }}>GOTO 1</button>
        </Column>
      </RollColumn>
      <div>
        <p>other content</p>
        <button type="button" onClick={() => { goto(2) }}>GOTO 2</button>
      </div>
    </div>
  )
}
```

**events:**

```jsx
import React from 'react'
import RollColumn, { Column, LabelColumn, gotoColumn } from 'rollcolumn-react'

export default function Page() {

  function handleColumnCheck(elementChecked){
    console.log('handleColumnCheck', elementChecked);
  }

  function goto(columnNumber) {
    // gotoColumn params: (name, number_column, emit_event)
    gotoColumn('myName', columnNumber, true)
  }

  return (
    <div className="content">
      <RollColumn name="myName">
        <Column order={1}>
          <p>Content 1</p>
          <LabelColumn to={2}>goto 2</LabelColumn>
          <br/>
          <button type="button" onClick={() => { goto(2) }}>GOTO 2</button>
        </Column>
        <Column order={2} onCheck={handleColumnCheck}>
          <p>Content 2</p>
          <LabelColumn to={1}>back to 1</LabelColumn>
          <br/>
          <button type="button" onClick={() => { goto(1) }}>GOTO 1</button>
        </Column>
      </RollColumn>
      <div>
        <p>other content</p>
        <button type="button" onClick={() => { goto(2) }}>GOTO 2</button>
      </div>
    </div>
  )
}
```

## Contributing

Thanks for being interested on making this package better. We encourage everyone to help improving this project with some new features, bug fixes and performance issues.

## License
MIT © [Avatar Solu&ccedil;&otilde;es Digitais](https://github.com/avatarsolucoes/rollcolumns-react.git)
