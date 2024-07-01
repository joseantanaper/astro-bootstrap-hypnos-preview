import { a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>The <strong>Hypnos</strong> center, located in the <strong>Congrés</strong> neighborhood for more than 10\r\nyears, offers <strong>speech therapy</strong> and <strong>specialized psychological</strong> care to\r\npeople at <strong>all stages of their life</strong>.</p>";

				const frontmatter = {"title":"Hypnos","subtitle":"Psychology and Speech Therapy","link":"app-link-general"};
				const file = "D:/DEV/Astro/astro-bootstrap-hypnos/src/content/site/en/00-header.md";
				const url = undefined;
				function rawContent() {
					return "\r\nThe **Hypnos** center, located in the **Congrés** neighborhood for more than 10\r\nyears, offers **speech therapy** and **specialized psychological** care to\r\npeople at **all stages of their life**.\r\n";
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
