import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Input,
  Item,
  Icon,
  Text,
  Accordion,
  ActionSheet
} from "native-base";

const HeaderBar = props => {
  return (
    <Header searchBar={true}>
      <Left>
        <Button
          transparent
          onPress={() => {
            props.navigation.openDrawer();
          }}
        >
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Header</Title>
      </Body>
      <Right />
    </Header>
  );
};

export default HeaderBar;
