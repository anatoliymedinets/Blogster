const puppeteer = require('puppeteer');

const sessionFactory = require('../factories/session.factory')
const userFactory = require('../factories/user.factory')

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false
    });

    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function(target, property) {
        return customPage[property] || browser[property] || page[property];
      }
    })
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    const user = await userFactory();
    const { session, sig } = sessionFactory(user);

    await Promise.all([
      this.page.setCookie({ name: 'express:sess', value: session}),
      this.page.setCookie({ name: 'express:sess.sig', value: sig})
    ]);

    await this.page.goto('http://localhost:4200/blogs');
    await this.page.waitForSelector('a[href="/api/auth/logout"]');
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }
}

module.exports = CustomPage;