import { a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Estas son las formas en las que puedes contactar con nosotros.\r\nTienes un <strong>teléfono</strong>, un <strong>email</strong>, una cuenta de <strong>Instagram</strong> y nuestro\r\n<strong>Centro</strong>.</p>";

				const frontmatter = {"title":"Contacto","link":"app-link-contact","icon":"contact"};
				const file = "D:/DEV/Astro/astro-bootstrap-hypnos/src/content/site/es/03-contact.md";
				const url = undefined;
				function rawContent() {
					return "\r\nEstas son las formas en las que puedes contactar con nosotros.\r\nTienes un **teléfono**, un **email**, una cuenta de **Instagram** y nuestro\r\n**Centro**.\r\n";
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
