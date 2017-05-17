import { Builttospill.ComPage } from './app.po';

describe('builttospill.com App', () => {
  let page: Builttospill.ComPage;

  beforeEach(() => {
    page = new Builttospill.ComPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
