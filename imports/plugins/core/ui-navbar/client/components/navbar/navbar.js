import { FlatButton } from "/imports/plugins/core/ui/client/components";
import { Reaction, Router } from "/client/api";
import { Tags } from "/lib/collections";
import { playTour } from "/imports/plugins/included/tour/client/tour";

Template.CoreNavigationBar.onCreated(function () {
  this.state = new ReactiveDict();
});


Template.CoreNavigationBar.onRendered(function () {
  currentRoute = Router.getRouteName();
  this.autorun(() => {
    if (Accounts.findOne(Meteor.userId())) {
      if (!Accounts.findOne(Meteor.userId()).takenTour && Accounts.findOne(Meteor.userId()).emails[0]) {
        playTour();
      }
    }
  });
});

/**
 * layoutHeader events
 */
Template.CoreNavigationBar.events({
  "click .navbar-accounts .dropdown-toggle": function () {
    return setTimeout(function () {
      return $("#login-email").focus();
    }, 100);
  },
  "click .header-tag, click .navbar-brand": function () {
    return $(".dashboard-navbar-packages ul li").removeClass("active");
  },
  "click .search": function () {
    Blaze.renderWithData(Template.searchModal, {
    }, $("body").get(0));
    $("body").css("overflow", "hidden");
    $("#search-input").focus();
  },
  "click .notification-icon": function () {
    $("body").css("overflow", "hidden");
    $("#notify-dropdown").focus();
  },
  "click #moreinfo": function () {
    $("body").css("overflow", "hidden");
    $("#myModal").modal("show");
  }
});

Template.CoreNavigationBar.helpers({
  TourButtonComponent() {
    return {
      component: FlatButton,
      kind: "flat",
      label: " Take Tour",
      icon: "fa fa-rocket",
      onClick() {
        playTour();
      }
    };
  },
  IconButtonComponent() {
    return {
      component: FlatButton,
      icon: "fa fa-search",
      kind: "flat"
      // onClick() {
      //   Blaze.renderWithData(Template.searchModal, {
      //   }, $("body").get(0));
      //   $("body").css("overflow-y", "hidden");
      //   $("#search-input").focus();
      // }
    };
  },
  staticPagesMenu() {
    return {
      component: FlatButton,
      kind: "flat",
      label: "More Pages"
    };
  },
  onMenuButtonClick() {
    const instance = Template.instance();
    return () => {
      if (instance.toggleMenuCallback) {
        instance.toggleMenuCallback();
      }
    };
  },

  tagNavProps() {
    const instance = Template.instance();
    let tags = [];

    tags = Tags.find({
      isTopLevel: true
    }, {
      sort: {
        position: 1
      }
    }).fetch();

    return {
      name: "coreHeaderNavigation",
      editable: Reaction.hasAdminAccess(),
      isEditing: true,
      tags: tags,
      onToggleMenu(callback) {
        // Register the callback
        instance.toggleMenuCallback = callback;
      }
    };
  }
});
