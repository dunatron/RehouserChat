import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ENUM_QUERY } from "../../graphql/queries/index";
import MultiSelect from "react-native-multiple-select";

const EnumMultiSelect = ({
  __type,
  form,
  name,
  selected,
  setSelected,
  selectText
}) => {
  const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
    variables: {
      name: __type
    }
  });
  const onSelectedItemsChange = items => {
    setSelected(items); // doing this too so we have a flag of sorts
    form.setFieldValue(name, items);
  };

  if (loading) return null;
  if (error) return null;

  const mappedItems = data
    ? data.__type.enumValues.map((v, i) => ({
        id: v.name,
        name: v.name
      }))
    : [];
  return (
    <MultiSelect
      name="indoorFeatures"
      hideTags
      items={mappedItems}
      uniqueKey="id"
      //   ref={component => {
      //     this.multiSelect = component;
      //   }}
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={selected}
      selectText={selectText ? selectText : "Pick Items"}
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

export default EnumMultiSelect;
