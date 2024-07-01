import { a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>El centro <strong>Hypnos</strong>, ubicado en el barrio del <strong>Congrés</strong> desde hace\r\nmás de 10 años, ofrece atención <strong>logopédica</strong> y <strong>psicológica\r\nespecializada</strong> a personas en <strong>todas las etapas de su vida</strong>.</p>";

				const frontmatter = {"title":"Hypnos","subtitle":"Psicología y Logopedia","link":"app-link-general"};
				const file = "D:/DEV/Astro/astro-bootstrap-hypnos/src/content/site/es/00-header.md";
				const url = undefined;
				function rawContent() {
					return "\r\nEl centro **Hypnos**, ubicado en el barrio del **Congrés** desde hace\r\nmás de 10 años, ofrece atención **logopédica** y **psicológica\r\nespecializada** a personas en **todas las etapas de su vida**.\r\n";
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
