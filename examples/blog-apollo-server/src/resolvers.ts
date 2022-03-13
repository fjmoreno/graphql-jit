const posts = [
  {
    id: "post:1",
    title: "Introduction to GraphQL!",
    type: 'post',
    related: ['article:1']
  },
  {
    id: "post:2",
    title: "GraphQL-Jit a fast engine for GraphQL",
    type: 'post',
    related: ['article:2']
  }
];

const articles = [
  {
    id: "article:1",
    title: "article Introduction to GraphQL!",
    type: 'article',

  },
  {
    id: "article:2",
    title: "article GraphQL-Jit a fast engine for GraphQL",
    type: 'article',

  }
];


function getPost(id: string) {
  const post = posts.find(post => post.id === id);
  if (post == null) {
    throw new Error(`Post "${id} not found"`);
  }
  return post;
}

function getArticle(id: string) {
  const article = articles.find(article => article.id === id);
  if (article == null) {
    throw new Error(`article "${id}" not found`);
  }
  return article;
}

export default {
  Content: {
    __resolveType(content: any) {
      switch (content.id.split(":")[0]) {
        case "post":
          return  'Post';
        case "article":
          return 'Article'
      }
      throw new Error("Invalid id");
    }
  },
  Post: {
    related: (a:any,b:any, c:any)=>{
      return articles.filter(e => a.related.includes(e.id))
    }
  },
  Query: {
    detailContent: () => {
      return ([] as Array<any>).concat(posts, articles)
    },

  }
};
