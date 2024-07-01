import { a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Texto descriptivo para la sección de especialidades.</p>";

				const frontmatter = {"title":"Especialidades","link":"app-link-spec","icon":"specialties","content":[{"title":"Psicología  Infanto-Juvenil","icon":"home","description":"Psicología Infanto-Juvenil..."},{"title":"Psicología de Adultos","icon":"home","description":"Psicología de Adultos..."},{"title":"Logopedia","icon":"home","description":"Logopedia..."},{"title":"Reeducación Psicopedagógica"},{"title":"Diagnóstico de Autismo"}]};
				const file = "D:/DEV/Astro/astro-bootstrap-hypnos/src/content/site/es/01-spec.md";
				const url = undefined;
				function rawContent() {
					return "\r\nTexto descriptivo para la sección de especialidades.\r\n";
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
