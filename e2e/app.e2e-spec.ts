import { BabblerClientPage } from './app.po';

describe('babbler-client App', () => {
  let page: BabblerClientPage;

  beforeEach(() => {
    page = new BabblerClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
