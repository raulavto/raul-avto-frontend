export const GET_BLOG_POSTS = `
  query MyQuery {
    en: allBlogposts(locale: en) {
      title
      subtitle
      slug
      restparagraphs {
        text
        title
        photo {
          url
        }
      }
      p2vid
      p2title
      p2text(markdown: true)
      p1title
      p1text(markdown: true)
      p1pics {
        url
      }
      mainpic {
        url
      }
    }
    ru: allBlogposts(locale: ru) {
      title
      subtitle
      slug
      restparagraphs {
        text
        title
        photo {
          url
        }
      }
      p2vid
      p2title
      p2text(markdown: true)
      p1title
      p1text(markdown: true)
      p1pics {
        url
      }
      mainpic {
        url
      }
    }
    ua: allBlogposts(locale: uk) {
      title
      subtitle
      slug
      restparagraphs {
        text
        title
        photo {
          url
        }
      }
      p2vid
      p2title
      p2text(markdown: true)
      p1title
      p1text(markdown: true)
      p1pics {
        url
      }
      mainpic {
        url
      }
    }
  }
`;

export const GET_DYNAMIC_BLOG_POST = `
    query BlogPost($slug: String!) {
      en: blogpost(locale: en, filter: { slug: { eq: $slug } }) {
        title
        subtitle
        mainpic {
          url
        }
        p1title
        p1text(markdown: true)
        p2title
        p2text(markdown: true)
        p2vid
        p1pics {
          url
        }
        restparagraphs {
          title
          text(markdown: true)
          photo {
            url
          }
        }
        contactbtn
      }
      ru: blogpost(locale: ru, filter: { slug: { eq: $slug } }) {
        title
        subtitle
        mainpic {
          url
        }
        p1title
        p1text(markdown: true)
        p2title
        p2text(markdown: true)
        p2vid
        p1pics {
          url
        }
        restparagraphs {
          title
          text(markdown: true)
          photo {
            url
          }
        }
        contactbtn
      }
      ua: blogpost(locale: uk, filter: { slug: { eq: $slug } }) {
        title
        subtitle
        mainpic {
          url
        }
        p1title
        p1text(markdown: true)
        p2title
        p2text(markdown: true)
        p2vid
        p1pics {
          url
        }
        restparagraphs {
          title
          text(markdown: true)
          photo {
            url
          }
        }
        contactbtn
      }
    }
  `;
