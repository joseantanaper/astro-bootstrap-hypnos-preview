import { a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Acerca de</p>";

				const frontmatter = {"title":"Acerca de","link":"/about#about","icon":"about","content":{}};
				const file = "D:/DEV/Astro/astro-bootstrap-hypnos/src/content/site/es/99-about.md";
				const url = undefined;
				function rawContent() {
					return "\r\nAcerca de\r\n";
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
