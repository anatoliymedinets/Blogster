const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build()
  await page.goto('http://localhost:4200');
})

afterEach(async () => {
  await page.close();
})

describe('When logged in', () => {
  beforeEach(async () => {
    await page.login();
    await page.click('a[href="/new"]');
  })

  it('can see blog create form', async () => {
    const text = await page.getContentsOf('h5.center');
    expect(text).toEqual('Create new blog');
  })

  describe('And using valid inputs', () => {
    beforeEach(async () => {
        await page.type('input#title', 'Blog title');
        await page.type('input#content', 'Blog content');
    })

    it('the form button should be active', async () => {
      const isDisabled = await page.$eval('form button', (button) => button.disabled);
      expect(isDisabled).not.toBeTruthy();
    })

    it('should navigate on blogs page', async () => {
      await page.click('form button');
      await page.waitForResponse(response => response.url() === 'http://localhost:4200/api/blogs' && response.status() === 200);
      await page.waitForNavigation();
      const url = await page.url();
      expect(url).toEqual('http://localhost:4200/blogs');
    })
  });

  describe('And using invalid inputs', () => {
    it('the form button should be disabled', async () => {
      const isDisabled = await page.$eval('form button', (button) => button.disabled);
      expect(isDisabled).toBeTruthy();
    })
  });
  
});

describe('When not logged in',() => {
  it('user cannot create blog posts',async () => {
    page.evaluate(() => {
      fetch('/api/blogs', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: 'Test Blog title', content: 'Test Blog content'})
      }).then(res => res.json());
    })

  })

});

