import { a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>About</p>";

				const frontmatter = {"title":"About","link":"about","icon":"about"};
				const file = "D:/DEV/Astro/astro-bootstrap-hypnos/src/content/site/en/99-about.md";
				const url = undefined;
				function rawContent() {
					return "\r\nAbout\r\n";
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
