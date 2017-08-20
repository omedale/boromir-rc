"use strict";
const yaml = require("js-yaml");
const fs = require("fs");
const expect = require("chai").expect;
const getId = require("../../../lib/get-elements.js");

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
  // browser.getSession().then(function (sessionid) {
  //   browser.sessionID = sessionid.id_;
  // });
});

describe("Order", function () {
  it("Should be able to cancel order", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));
    const usrData = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/user-data.yml", "utf8"));

    // default to process env if we've got that
    const adminEmail = process.env.REACTION_EMAIL || usrData.admin_email;
    const adminPassword = process.env.REACTION_AUTH || usrData.admin_pw;

    // LOGIN IN
    browser.pause("5000");
    browser.click(eleMap.login_dropdown_btn);
    browser.pause(3000);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), adminEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), adminPassword);
    browser.click(eleMap.login_btn);
    browser.pause("5000");

    // Make Order
    browser.pause("2000");
    browser.click(".brand");
    browser.pause("6000");
    browser.click("#BCTMZ6HTxFSppJESk");
    browser.pause("3000");
    browser.scroll(0, 300);
    browser.pause("4000");
    browser.click(eleMap.red_option);
    browser.pause("1000");
    browser.click(".js-add-to-cart");
    browser.pause("2000");
    browser.click(".cart-alert-checkout");
    browser.pause("3000");
    browser.scroll(0, 500);
    browser.click(eleMap.free_shipping);
    browser.pause("6000");
    browser.click(eleMap.click_wallet);
    browser.pause("2000");
    browser.click(eleMap.pay_with_wallet);
    browser.pause("7000");

    // Cancel Order
    browser.click(eleMap.dashboard_btn);
    browser.pause("1000");
    browser.click(eleMap.manage_orders);
    browser.pause("9000");
    const totalCanceled = browser.getText("#canceled");
    browser.click(eleMap.cancel_order);
    browser.pause("1000");
    browser.click(eleMap.select_others);
    browser.pause("3000");
    browser.setValue("#input-comment", "The order cannot be fulfilled at the moment because of government restriction");
    browser.pause("3000");
    browser.click(eleMap.cancel_order_btn);
    browser.pause("3000");
    browser.click(eleMap.confirm_cancel_order);
    browser.pause("1000");
    browser.click(eleMap.close_dashboard);
    browser.pause("3000");
    browser.click(eleMap.show_cancelled_orders);
    browser.scroll(0, 300);
    browser.pause("9000");
    expect(Number(browser.getText("#canceled"))).to.equal(Number(totalCanceled) + 1);
  });
});

