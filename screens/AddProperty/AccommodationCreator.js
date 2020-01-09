import React, { useRef, useEffect, createRef } from "react";

import styles from "./Styles";
import {
  Container,
  Header,
  Content,
  Footer,
  View,
  Button,
  List,
  Text,
  Form
} from "native-base";
import FormikInputField from "../../components/Inputs/FormikInputField";

const accommodationFields = [
  {
    name: "roomSize",
    label: "Room Size",
    title: "the metres squared of the room",
    placeholder: "3",
    keyboardType: "numeric"
  },
  {
    name: "rent",
    label: "Rent",
    title: "The rent for this room",
    placeholder: "180",
    keyboardType: "numeric"
  },
  {
    name: "expenses",
    label: "Expenses",
    title: "Extra expenses not including the rent. Often none",
    placeholder: "0",
    keyboardType: "numeric"
  },
  {
    name: "description",
    label: "Description",
    title: "A description for the room",
    placeholder:
      "This is a nice room north facing and shit with sun and located at the back of the house",
    keyboardType: "numeric"
  }
];

const AccommodationCreator = ({ items, replace, push, remove }) => {
  return (
    <>
      <RenderAccommodationList
        items={items}
        replace={replace}
        remove={remove}
        push={push}
      />
      <Button
        onPress={() =>
          push({
            __typename: "Accommodation",
            roomSize: "",
            rent: "",
            expenses: "",
            description: ""
          })
        }
      >
        <Text style={styles.btnText}>Add new Accommodation</Text>
      </Button>
    </>
  );
};

export default AccommodationCreator;

const RenderAccommodationList = ({ items, replace, remove, push }) => {
  return items.map((item, i) => (
    <RenderAccommodation
      key={i}
      item={item}
      index={i}
      replace={replace}
      remove={remove}
      push={push}
    />
  ));
};

const RenderAccommodation = ({ item, index, replace, remove, push }) => {
  return (
    <View>
      {accommodationFields.map(field => {
        const fieldName = `accommodation[${index}].${field.name}`;
        return (
          <RenderField
            field={field}
            key={index + field.name}
            fieldName={fieldName}
            value={item[field.name]}
            onChangeText={v =>
              replace(index, {
                ...item,
                [field.name]: v
              })
            }
          />
        );
      })}
      <Button onPress={() => remove(index)}>
        <Text>Remove item</Text>
      </Button>
      <Button
        onPress={() =>
          push({
            __typename: "Accommodation",
            ...item
          })
        }
      >
        <Text>Copy</Text>
      </Button>
    </View>
  );
};

const RenderField = ({ field, onChangeText, value, fieldName }) => (
  <FormikInputField
    onChangeText={onChangeText}
    title={field.title}
    name={fieldName}
    label={field.label}
    placeholder={field.placeholder}
    keyboardType={field.keyboardType}
    value={value}
  />
);
