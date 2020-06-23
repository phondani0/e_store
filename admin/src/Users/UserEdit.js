import React from 'react';
import {
  Edit,
  NumberInput,
  TextInput,
  TabbedForm,
  FormTab,
  ArrayInput,
  SimpleFormIterator
  // ReferenceManyField
} from 'react-admin';

export const UserEdit = (props) => (
  <Edit title="Edit User" {...props}>
    <TabbedForm>
      <FormTab label="Identity">
        <TextInput disabled source="id" />
        <TextInput source="first_name" />
        <TextInput source="last_name" />
        <TextInput multiline source="email" />
        <TextInput source="mobile" />
      </FormTab>
      <FormTab label="Address" path="address">
        <ArrayInput source="address">
          <SimpleFormIterator>
            <TextInput disabled label="id" source="id" />
            <TextInput source="area" label="area" />
            <TextInput source="street" label="street" required />
            <NumberInput source="pincode" label="pincode" required />
            <TextInput source="city" label="city" required />
            <TextInput source="state" label="state" required />
            <TextInput source="country" label="country" required />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      {/* <FormTab label="resources.customers.tabs.address" path="address">
        <TextInput
          source="address"
          formClassName={classes.address}
        />
        <TextInput source="zipcode" formClassName={classes.zipcode} />
        <TextInput source="city" formClassName={classes.city} />
      </FormTab>
      <FormTab label="resources.customers.tabs.orders" path="orders">
        <ReferenceManyField
          addLabel={false}
          sort={{ field: 'date', order: 'DESC' }}
          reference="commands"
          target="customer_id"
        >
          <Datagrid>
            <DateField source="date" />
            <TextField source="reference" />
            <NbItemsField />
            <NumberField
              source="total"
              options={{ style: 'currency', currency: 'USD' }}
            />
            <TextField source="status" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
      <FormTab label="resources.customers.tabs.reviews" path="reviews">
        <ReferenceManyField
          addLabel={false}
          sort={{ field: 'date', order: 'DESC' }}
          reference="reviews"
          target="customer_id"
        >
          <Datagrid filter={{ status: 'approved' }}>
            <DateField source="date" />
            <ProductReferenceField />
            <StarRatingField />
            <TextField
              source="comment"
              cellClassName={classes.comment}
            />
            <EditButton style={{ padding: 0 }} />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
      <FormTab label="resources.customers.tabs.stats" path="stats">
      <SegmentsInput />
      <NullableBooleanInput source="has_newsletter" />
      <DateField
        source="first_seen"
        style={{ width: 128, display: 'inline-block' }}
      />
      <DateField
        source="latest_purchase"
        style={{ width: 128, display: 'inline-block' }}
      />
      <DateField
        source="last_seen"
        style={{ width: 128, display: 'inline-block' }}
      />
      </FormTab> */}
    </TabbedForm>
  </Edit>
);