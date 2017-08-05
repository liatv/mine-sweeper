import { MinePage } from './app.po';

describe('mine App', () => {
  let page: MinePage;

  beforeEach(() => {
    page = new MinePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
