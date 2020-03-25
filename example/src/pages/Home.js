import React from 'react';
import { PageTitle } from 'avatardomus-components';
import DocumentTitle from '../components/DocumentTitle';
import { RollColumn, Column, LabelColumn, gotoColumn } from 'rollcolumn-react';

export default function Home(props){
    const { title } = props;

    const styles = {
        maxWidth: '100%',
        backgroundColor: '#CCC',
        margin: '0 auto',
        boxSizing: 'border-box',
        textAlign: 'center',
    }

    function handleColumnCheck(input, order){
      console.log(`handleColumnCheck (${order})`, input);
    }

    function handleColumn1Check(input){
      console.log('handleColumn1Check', input);
    }

    function handleColumn2Check(input){
      console.log('handleColumn2Check', input);
    }

    function handleColumn3Check(input){
      console.log('handleColumn3Check', input);
    }

    function goto(){
      gotoColumn('test',3, true);
    }

    return (
        <>
         <DocumentTitle title="Example rollcolumn-react" />
          <PageTitle style={styles}>
            {title || '--'}
          </PageTitle>
          <div style={{width: 900, maxWidth: '100%', margin:'0 auto', textAlign: 'center'}}>
          <RollColumn name="test" onColumnChange={handleColumnCheck}>
            <Column order={1} className="A" onCheck={handleColumn1Check}>
              <div style={{backgroundColor:"#C0CFC0", height: '100vh', textAlign: 'center' }}>
                <h2>A</h2>
                <LabelColumn to={2}>CLICK TO B</LabelColumn><br/>
                <LabelColumn to={3}>CLICK TO C</LabelColumn><br/>
                <button type="button" onClick={goto}>GOTO 3</button>
              </div>
            </Column>
            <Column order={2} onCheck={handleColumn2Check}>
              <div style={{backgroundColor:"#CFC0C0", height: '100vh' }}>
                <h2>B</h2>
                <LabelColumn to={1}>CLICK TO A</LabelColumn><br/>
                <LabelColumn to={3}>CLICK TO C</LabelColumn>
              </div>
            </Column>
            <Column order={3} onCheck={handleColumn3Check}>
              <div style={{backgroundColor:"#C0C0CF", height: '100vh' }}>
                <h2>C</h2>
                <LabelColumn to={1}>CLICK TO A</LabelColumn><br/>
                <LabelColumn to={2}>CLICK TO B</LabelColumn>
              </div>
            </Column>
          </RollColumn>
          </div>
        </>
    )
}
