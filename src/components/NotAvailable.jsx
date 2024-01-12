import React from 'react';
import styled from 'styled-components';

function NotAvailable() {
    return (
        <Container>
           <h1> Nothing to show, Select Different Genre </h1>
        </Container>
    );
}

const Container = styled.div`
    h1{
        margin: 50px auto;
        text-align: center;
    }
`

export default NotAvailable;