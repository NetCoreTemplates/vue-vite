import{_ as n}from"./MarkdownPage.a9a56628.js";import{s,o as i,j as r,w as u,a as e,l as t}from"./vendor.0d495957.js";import"./AppBreadcrumb.3fc4e167.js";const h=e("div",{class:"markdown-body"},[e("p",{class:"lead"}," Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS. "),e("p",null,[t("By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you "),e("em",null,"really are"),t(" just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.")]),e("p",null,"We get lots of complaints about it actually, with people regularly asking us things like:"),e("blockquote",null,[e("p",null,[t("Why is Tailwind removing the default styles on my "),e("code",null,"h1"),t(" elements? How do I disable this? What do you mean I lose all the other base styles too?")])]),e("p",null,[t("We hear you, but we\u2019re not convinced that simply disabling our base styles is what you really want. You don\u2019t want to have to remove annoying margins every time you use a "),e("code",null,"p"),t(" element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either \u2014 you want them to look "),e("em",null,"awesome"),t(", not awful.")]),e("p",null,[t("The "),e("code",null,"@tailwindcss/typography"),t(" plugin is our attempt to give you what you "),e("em",null,"actually"),t(" want, without any of the downsides of doing something stupid like disabling our base styles.")]),e("p",null,[t("It adds a new "),e("code",null,"prose"),t(" class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:")]),e("pre",null,[e("code",{class:"language-html"},`<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread with cheese to their
    children, with the food earning such an iconic status in our culture that kids will often dress
    up as warm, cheesy loaf for Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
    springing up around the country.
  </p>
  <!-- ... -->
</article>
`)]),e("p",null,[t("For more information about how to use the plugin and the features it includes, "),e("a",{href:"https://github.com/tailwindcss/typography/blob/master/README.md"},"read the documentation"),t(".")]),e("hr"),e("h2",null,"What to expect from here on out"),e("p",null,[t("What follows from here is just a bunch of absolute nonsense I\u2019ve written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like "),e("strong",null,"bold text"),t(", unordered lists, ordered lists, code blocks, block quotes, "),e("em",null,"and even italics"),t(".")]),e("p",null,"It\u2019s important to cover all of these use cases for a few reasons:"),e("ol",null,[e("li",null,"We want everything to look good out of the box."),e("li",null,"Really just the first reason, that\u2019s the whole point of the plugin."),e("li",null,"Here\u2019s a third pretend reason though a list with three items looks more realistic than a list with two items.")]),e("p",null,"Now we\u2019re going to try out another header style."),e("h3",null,"Typography should be easy"),e("p",null,"So that\u2019s a header for you \u2014 with any luck if we\u2019ve done our job correctly that will look pretty reasonable."),e("p",null,"Something a wise person once told me about typography is:"),e("blockquote",null,[e("p",null,"Typography is pretty important if you don\u2019t want your stuff to look like trash. Make it good then it won\u2019t be bad.")]),e("p",null,"It\u2019s probably important that images look okay here by default as well:"),e("figure",null,[e("img",{src:"https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",alt:""}),e("figcaption",null," Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ")]),e("p",null,"Now I\u2019m going to show you an example of an unordered list to make sure that looks good, too:"),e("ul",null,[e("li",null,"So here is the first item in this list."),e("li",null,"In this example we\u2019re keeping the items short."),e("li",null,"Later, we\u2019ll use longer, more complex list items.")]),e("p",null,"And that\u2019s the end of this section.")],-1),w={setup(d,{expose:l}){const o={title:"Tailwind Typography",summary:"tailwindcss/typography enabled for Markdown pages",date:"2021-11-20T00:00:00.000Z",meta:[{property:"og:title",content:"Tailwind Typography"}]};return l({frontmatter:o}),s({title:"Tailwind Typography",meta:[{property:"og:title",content:"Tailwind Typography"}]}),(c,y)=>{const a=n;return i(),r(a,{frontmatter:o},{default:u(()=>[h]),_:1})}}};export{w as default};
