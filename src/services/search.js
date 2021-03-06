import elasticsearch from 'elasticsearch-browser';

const client = new elasticsearch.Client({
  host: [
    {
      host: 'search.dotpodcast.co',
      port: 443,
      log: 'info',
      protocol: 'https'
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

export const getPodcastDetails = (slug) => {
  return search({
    query: {
      match: {
        docId: slug.replace(/-/g, '.')
      }
    }
  },
    {
      index: 'podcasts',
      type: 'podcast'
    })
}

export const searchEpisodes = (text) => {
  return search({
    query: {
      bool: {
        should: [
          {
            multi_match: {
              query: text,
              type: 'phrase_prefix',
              fields: [
                'author.name^1',
                'description^2',
                'title^10',
                'content_text'
              ]
            }
          },
          {
            simple_query_string: {
              query: text,
              fields: ['_all']
            }
          }
        ]
      }
    }
  }, {
    index: 'episodes',
    type: 'episode'
  });
};

export const searchPodcasts = (text) => {
  return search({
    query: {
      bool: {
        should: [
          {
            multi_match: {
              query: text,
              type: 'phrase_prefix',
              fields: [
                'author.name^1',
                'description_text^2',
                'title^10',
                'content_text'
              ]
            }
          },
          {
            simple_query_string: {
              query: text,
              fields: ['_all']
            }
          }
        ]
      }
    }
  }, {
    index: 'podcasts',
    type: 'podcast'
  });
};
