import elasticsearch from 'elasticsearch-browser';


const client = new elasticsearch.Client({
  host: [
    {
      host: 'd695e02a11cb3743d675f08895639dae.us-east-1.aws.found.io',
      port: 9243,
      log: 'info',
      protocol: 'https',
      auth: 'search_ui_readonly:publiclyaccessible',
    }
  ]
});


const search = (query, options) => {
  return client.search({
    index: options.index,
    type: options.type,
    body: query
  })
}

export const searchEpisodes = (text, options) => {
  return search({
    query: {
      match: {
        title: text
      }
    }
  }, {
    index: 'episodes',
    type: 'episode'
  });
};

