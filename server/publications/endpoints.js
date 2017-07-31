import { Accounts, Orders, Shops, Payments, Products } from "/lib/collections";


Meteor.publish("api/getUsers", function () {
  return Accounts.find();
});

Meteor.publish("api/getOrders", function () {
  return Orders.find();
});

Meteor.publish("api/getShops", function () {
  return Shops.find();
});

Meteor.publish("api/getPayments", function () {
  return Payments.find();
});

Meteor.publish("api/getProducts", function () {
  return Products.find();
});