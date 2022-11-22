import React from 'react'
import styled from 'styled-components';

const Casting = () => {
    return <Wrapper>
    <h1>This service is comming soon on the platform </h1>
    <h3>You can contact us in the mean time to get the service </h3>
    <ul>
        <li>
            Mail: <a href="mailto:mail@filmcrew.com">mail@filmcrew.com</a>
        </li>
        <li>
            Phone: <a href="tel:9868957429">9868957429</a>
        </li>
    </ul>
  </Wrapper>
}

// Font sizes (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98 


// Spacing system (px)
//2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

const Wrapper = styled.section`

text-align: center;
padding: 4.8rem 0;
h1{
    font-size: 3rem;
}
h3{
    font-size: 1.8rem;
    color: var(--primary-color);
}

ul{

max-width: 280px;
text-align: left;
margin: auto;
font-size: 1.4rem;
padding-top: 3.2rem;

li{
    margin: 1.2rem 0;
}

}

`;


export default Casting