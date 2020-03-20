import React from 'react';
import { PageTitle } from 'avatardomus-components';
import DocumentTitle from '../components/DocumentTitle';
import { RollColumn, Column, LabelColumn } from 'rollcolumn-react';

export default function Home(props){
    const { title } = props;

    const styles = {
        maxWidth: '100%',
        backgroundColor: '#CCC',
        margin: '0 auto',
        boxSizing: 'border-box',
        textAlign: 'center',
    }

    return (
        <>
         <DocumentTitle title="Example rollcolumn-react" />
          <PageTitle style={styles}>
            {title || '--'}
          </PageTitle>
          <div style={{width: 900, maxWidth: '100%', margin:'0 auto', textAlign: 'center'}}>
          <RollColumn name="test">
            <Column order={1} className="A">
              <div style={{backgroundColor:"#C0CFC0", height: '100vh', textAlign: 'center' }}>
                <h2>A</h2>
                <LabelColumn to={2}>CLICK TO B</LabelColumn><br/>
                <LabelColumn to={3}>CLICK TO C</LabelColumn>
              </div>
            </Column>
            <Column order={2}>
              <div style={{backgroundColor:"#CFC0C0", height: '100vh' }}>
                <h2>B</h2>
                <LabelColumn to={1}>CLICK TO A</LabelColumn><br/>
                <LabelColumn to={3}>CLICK TO C</LabelColumn>
              </div>
            </Column>
            <Column order={3}>
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
