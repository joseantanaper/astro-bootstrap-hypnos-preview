import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import { l as languageSelector, e as $$Link, f as $$LocaleSelector, d as $$Layout, u as useTranslations } from './Layout_D9agn0ZP.mjs';

const $$Astro = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const basePath = "https://joseantanaper.github.io/astro-bootstrap-hypnos-preview";
  const lang = Astro2.currentLocale;
  const defaultUrl = `${basePath}/${lang}`;
  const t = useTranslations(lang);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "header": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div class="container-fluid"> <div class="row app-section"> <div class="col text-center py-5"> <div class="row"> <div class="col"> ${String(t("msg.locale")).replace(
    "%1",
    String(
      languageSelector.filter(
        (language) => language.id == lang
      )[0].label
    )
  )} </div> </div> <div class="row"> <div class="col"> ${defaultUrl && renderTemplate`${renderComponent($$result2, "Link", $$Link, { "id": "app-default-url-link", "href": `${basePath}/${lang}`, "class:list": ["btn-lg", "btn-primary", "my-5"], "icon": "enter", "label": t("enter") })}`} </div> </div> <div class="row my-5"> <div class="col"> ${t("msg.localechange")} </div> </div> <div class="row"> <div class="col"> ${renderComponent($$result2, "LocaleSelector", $$LocaleSelector, {})} </div> </div> </div> </div> <div class="row"> <div class="col app-section text-center py-5">
Base path: ${basePath}<br>
Current Locale: ${lang}<br>
Stored Locale: <span id="app-stored-locale"></span><br>
Stored Theme: <span id="app-stored-theme"></span><br>
Default URL: <span id="app-default-url">${defaultUrl}</span> </div> </div> <div class="row py-5"></div> </div> </main> ` })} `;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/pages/index.astro", void 0);
const $$file = "D:/DEV/Astro/astro-bootstrap-hypnos/src/pages/index.astro";
const $$url = "/astro-bootstrap-hypnos-preview";

export { $$Index as default, $$file as file, $$url as url };
