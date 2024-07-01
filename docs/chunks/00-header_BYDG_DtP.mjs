import { a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>El centre <strong>Hypnos</strong>, ubicat al barri del <strong>Congrés</strong> des de fa\r\nmés de 10 anys, ofereix atenció <strong>logopèdica</strong> y <strong>psicol·lógica\r\nespecialitzada</strong> a persones en <strong>totes les etapes de la seva vida</strong>.</p>";

				const frontmatter = {"title":"Hypnos","subtitle":"Psicologia i Logopèdia","link":"app-link-general"};
				const file = "D:/DEV/Astro/astro-bootstrap-hypnos/src/content/site/ca/00-header.md";
				const url = undefined;
				function rawContent() {
					return "\r\nEl centre **Hypnos**, ubicat al barri del **Congrés** des de fa\r\nmés de 10 anys, ofereix atenció **logopèdica** y **psicol·lógica\r\nespecialitzada** a persones en **totes les etapes de la seva vida**.\r\n";
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
