import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ENUM_QUERY } from "../../graphql/queries/index";
import MultiSelect from "react-native-multiple-select";

const InDoorFeaturesDropdown = ({ selectedItems, setSelectedItems }) => {
  const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
    variables: {
      name: "IndoorFeature"
    }
  });
  const onSelectedItemsChange = selectedItems => {
    // this.setState({ selectedItems });
    setSelectedItems(selectedItems);
  };

  if (loading) return null;
  if (error) return null;

  const mappedItems = data
    ? data.__type.enumValues.map((v, i) => ({
        id: v.name,
        name: v.name
      }))
    : [];
  console.log("mappedItems => ", mappedItems);
  return (
    <MultiSelect
      hideTags
      items={mappedItems}
      uniqueKey="id"
      //   ref={component => {
      //     this.multiSelect = component;
      //   }}
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={selectedItems}
      selectText="Pick Items"
      searchInputPlaceholderText="Search Items..."
      onChangeInput={text => console.log(text)}
      //   altFontFamily="ProximaNova-Light"
      tagRemoveIconColor="#CCC"
      tagBorderColor="#CCC"
      tagTextColor="#CCC"
      selectedItemTextColor="#CCC"
      selectedItemIconColor="#CCC"
      itemTextColor="#000"
      displayKey="name"
      searchInputStyle={{ color: "#CCC" }}
      submitButtonColor="#CCC"
      submitButtonText="Submit"
    />
  );
};

export default InDoorFeaturesDropdown;
