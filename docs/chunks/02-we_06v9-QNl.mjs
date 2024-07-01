import { a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Quiénes somos</p>";

				const frontmatter = {"title":"Quiénes somos","link":"app-link-we","icon":"we","content":[{"id":1,"name":"Noelia","surname":"Belmonte Hernández","job":"Psy"},{"id":2,"name":"Marta","surname":"Marta Marta","job":"Psy"},{"id":3,"name":"Nuria","surname":"Nuria Nuria","job":"Psy"},{"id":4,"name":"Jordi","surname":"Jordi Jordi","job":"Psy"}]};
				const file = "D:/DEV/Astro/astro-bootstrap-hypnos/src/content/site/es/02-we.md";
				const url = undefined;
				function rawContent() {
					return "\r\nQuiénes somos\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
