import { Reaction, Logger } from "/client/api";
import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Tags, StaticPages } from "./../../../../../lib/collections";


Template.staticPagesNav.onCreated(function () {
  Meteor.subscribe("viewPages");
});

Template.staticPagesNav.helpers({
  staticPages() {
    return StaticPages.find({shopId: Reaction.shopId}).fetch();
  }
});


Template.loginDropdown.events({

  /**
   * Submit sign up form
   * @param  {Event} event - jQuery Event
   * @param  {Template} template - Blaze Template
   * @return {void}
   */
  "click .dropdown-menu": (event) => {
    return event.stopPropagation();
  },

  /**
   * Submit sign up form
   * @param  {Event} event - jQuery Event
   * @param  {Template} template - Blaze Template
   * @return {void}
   */
  "click #logout": (event, template) => {
    event.preventDefault();
    template.$(".dropdown-toggle").dropdown("toggle");
    // Meteor.logoutOtherClients();
    Meteor.logout((error) => {
      if (error) {
        Logger.warn("Failed to logout.", error);
      }
    });
  },

  /**
   * Wallet form
   * @param  {Event} event - jQuery Event
   * @return {void}
   */
  "click #wallet": (event) => {
    event.preventDefault();
    FlowRouter.go("/wallet");
  },

  /**
   * Submit sign up form
   * @param  {Event} event - jQuery Event
   * @param  {Template} template - Blaze Template
   * @return {void}
   */
  "click .user-accounts-dropdown-apps a": function (event, template) {
    if (this.name === "createProduct") {
      event.preventDefault();
      event.stopPropagation();

      Meteor.call("products/createProduct", (error, productId) => {
        let currentTag;
        let currentTagId;

        if (error) {
          throw new Meteor.Error("createProduct error", error);
        } else if (productId) {
          currentTagId = Session.get("currentTag");
          currentTag = Tags.findOne(currentTagId);
          if (currentTag) {
            Meteor.call("products/updateProductTags", productId, currentTag.name, currentTagId);
          }
          Reaction.Router.go("product", {
            handle: productId
          });
        }
      });
    } else if (this.route || this.name) {
      event.preventDefault();
      const route = this.name || this.route;
      Reaction.Router.go(route);
    }
    template.$(".dropdown-toggle").dropdown("toggle");
  }
});
