define(function () {
  var menu = [
    {
      url: '/home',
      text: 'trans0006'
    },
    {
      url: '/internet',
      text: 'trans0014'
    },
    {
      url: '/wifi',
      text: 'trans0017'
    },
    {
      url: '/devicecontrol',
      text: 'trans0015'
    },
    {
      url: '/more',
      text: 'trans0016',
      children: [
        {
          url: '/other',
          text: 'trans0015'
        },
        {
          url: '/other1',
          text: 'trans0017',
          children: [
            {
              url: '/other2',
              text: 'trans0017',
            }
          ]
        }
      ]
    }
  ];
  function getMenu() {
    // todo auth
    return menu;
  }
  return {
    getMenu
  };
});
