"use strict";
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("Real Time Search", function () {
  it("should display all three products that meet the search criteria", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
<<<<<<< HEAD
    const inputText = "e";
=======
    const inputText = "s";
>>>>>>> 1129bd16ac00e0a373105af0648686df067a7876

    browser.waitForExist(".product-primary-images");
    browser.click(eleMap.search_test);
    browser.waitForExist("#search-input");
    browser.setValue("#search-input", inputText);
    browser.waitForExist("#suggestedTitle");
    expect(browser.getText("#suggestedTitle")).to.contain("BASIC REACTION PRODUCT");
<<<<<<< HEAD
    expect(browser.getText("#suggestedTitle")).to.contain("BETTER NAME");
    expect(browser.getText("#suggestedTitle")).to.contain("ADETOKUNBO");
  });
  it("should display all two products that meet the search criteria", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const inputText = "et";
=======
    expect(browser.getText("#suggestedTitle")).to.contain("SAMSUNG S8");
    // expect(browser.getText("#suggestedTitle")).to.contain("EBOOK");
  });
  it("should display all two products that meet the search criteria", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const inputText = "sa";
>>>>>>> 1129bd16ac00e0a373105af0648686df067a7876

    browser.waitForExist(".product-primary-images");
    browser.click(eleMap.search_test);
    browser.waitForExist("#search-input");
    browser.setValue("#search-input", inputText);
    browser.waitForExist("#suggestedTitle");
<<<<<<< HEAD
    expect(browser.getText("#suggestedTitle")).to.contain("BETTER NAME");
    expect(browser.getText("#suggestedTitle")).to.contain("ADETOKUNBO");
  });
  it("should display the only product that meet the search criteria", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const inputText = "ett";
=======
    expect(browser.getText("#suggestedTitle")).to.contain("SAMSUNG S8");
    expect(browser.getText("#suggestedTitle")).to.contain("SAHEL");
  });
  it("should display the only product that meet the search criteria", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const inputText = "SAMSUNG";
>>>>>>> 1129bd16ac00e0a373105af0648686df067a7876

    browser.waitForExist(".product-primary-images");
    browser.click(eleMap.search_test);
    browser.waitForExist("#search-input");
    browser.setValue("#search-input", inputText);
    browser.waitForExist("#suggestedTitle");
<<<<<<< HEAD
    expect(browser.getText("#suggestedTitle")).to.equal("BETTER NAME");
=======
    expect(browser.getText("#suggestedTitle")).to.equal("SAMSUNG S8");

    it("should display the  error message when no product matches the search term", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const inputText = "error";

    browser.waitForExist(".product-primary-images");
    browser.click(eleMap.search_test);
    browser.waitForExist("#search-input");
    browser.setValue("#search-input", inputText);
    browser.waitForExist("#suggestedTitle");
    expect(browser.getText("#suggestedTitle")).to.equal("Oops! No match found. Try a different search");
  });
>>>>>>> 1129bd16ac00e0a373105af0648686df067a7876
  });
});
