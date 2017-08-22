"use strict";
const yaml = require("js-yaml");
const fs = require("fs");
const expect = require("chai").expect;
const getId = require("../../../lib/get-elements.js");
// const helper = require("./payment_helper");

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
  // browser.getSession().then(function (sessionid) {
  //   browser.sessionID = sessionid.id_;
  // });
});

describe("Notification", function () {
  it("Should send an sms notification when a user make an order", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));


    const email = "test@test.com";
    const password = "tester";

    browser.pause("5000");
    browser.click(eleMap.login_dropdown_btn);
    browser.pause("5000");
    browser.setValue(getId.retId(eleIds.login_email_fld_id), email);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), password);
    browser.click(eleMap.login_btn);
    browser.pause("5000");

    browser.click(".brand");
    browser.pause("6000");
    browser.click("#BCTMZ6HTxFSppJESk");
    browser.pause("6000");
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
    browser.pause("4000");

    browser.click("#walletBtn");
    browser.pause("1000");
    browser.click("#pay-with-wallet");
    browser.pause("5000");
    browser.switchTab();
    expect(browser.getText(".flex-item-fill")).to.equal("Cancel Order");
  });
});
