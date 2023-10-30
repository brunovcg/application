abstract class ServicesEndpointsConfigs {
  static defaultIMBackend = {
    development: 'http://localhost:8080',
    staging: 'https://api.stage.app.theinvestormachine.com',
    production: 'https://api.app.theinvestormachine.com',
  } as const;

  static browserHappy = 'http://browsehappy.com';

  static companyLandingPage = 'https://www.theinvestormachine.com' as const;

  static shopify = 'https://the-investor-machine.myshopify.com' as const;

  static facebookLinks = {
    group: 'https://www.facebook.com/groups/theinvestormachine',
    events: 'https://www.facebook.com/groups/theinvestormachine/events/',
  } as const;

  static smartyStreets = {
    baseUrl: 'https://us-autocomplete-pro.api.smarty.com',
  } as const;

  static squidex = {
    baseURL: 'https://squidex.app.theinvestormachine.com/api',
    assets: 'assets/im-app',
    content: 'content/im-app',
    appAssets: 'apps/im-app/assets',
  } as const;

  static storybook = {
    video: {
      srcExample: 'https://player.vimeo.com/video/809168328?h=dadd301d8e&dnt=1&app_id=122963&wmode=transparent' as const,
    },
  };

  static vimeo = {
    iframe: 'https://player.vimeo.com/video/',
  };
}

export default ServicesEndpointsConfigs;
