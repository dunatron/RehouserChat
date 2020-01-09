import React from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text
} from "native-base";

const Error = ({ error }) => {
  return (
    <Card>
      <CardItem>
        <Body>
          <Text>ToDo: decide how to handle errors for graphql </Text>
          <Text>{JSON.stringify(error, null, 2)}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default Error;
