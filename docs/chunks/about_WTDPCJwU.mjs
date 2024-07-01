import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead, d as addAttribute, F as Fragment } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import { g as getLangFromUrl, a as globalService, $ as $$Iconx, b as $$Weather, c as getCollection, d as $$Layout } from './Layout_D9agn0ZP.mjs';
import { $ as $$Section, u as ui } from './ui_C4MkEHhp.mjs';

const $$Astro$3 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$BtnRow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BtnRow;
  const btnVariants = [
    "",
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "link"
  ];
  const { group, mode } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div${addAttribute(`${group ? "btn-group" : ""}`, "class")}>${btnVariants.map((btn) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`<button${addAttribute(`btn ${btn ? mode[0] + btn : ""} ${mode[1]} text-capitalize text-truncate`, "class")} style="max-width: 100px;"><span>${btn || "Empty"}</span></button>${" "}` })}`)}</div><hr>` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/demo/BtnRow.astro", void 0);

const $$BtnDemo = createComponent(($$result, $$props, $$slots) => {
  const btnModes = [
    ["btn-", ""],
    ["btn-outline-", ""],
    ["btn-", "bg-gradient"],
    ["btn-", "disabled"],
    ["btn-", "btn-sm"],
    ["btn-", "btn-lg"]
  ];
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<h2>Button Demo</h2>${btnModes.map((mode) => renderTemplate`${renderComponent($$result2, "BtnRow", $$BtnRow, { "mode": mode })}`)}${btnModes.map((mode) => renderTemplate`${renderComponent($$result2, "BtnRow", $$BtnRow, { "mode": mode, "group": true })}`)}` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/demo/BtnDemo.astro", void 0);

const $$Astro$2 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$InputRow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$InputRow;
  const inputVariants = [
    "",
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "link"
  ];
  const { group, mode } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div${addAttribute(`${group ? "input-group" : "d-flex"}`, "class")}>${inputVariants.map((input) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`<input${addAttribute(`form-control text-${input} border-${input} ${mode[0]} ${mode[1]} text-capitalize text-truncate`, "class")} style="max-width: 90px;" value="Test">${!group ? renderTemplate`<span>&nbsp;</span>` : null}` })}`)}</div><hr>` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/demo/InputRow.astro", void 0);

const $$InputDemo = createComponent(($$result, $$props, $$slots) => {
  const inputModes = [
    ["", ""],
    ["bg-gradient", ""],
    ["is-valid", ""],
    ["is-invalid", ""]
  ];
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<h2>Input Demo</h2>${inputModes.map((mode) => renderTemplate`${renderComponent($$result2, "InputRow", $$InputRow, { "mode": mode })}`)}${inputModes.map((mode) => renderTemplate`${renderComponent($$result2, "InputRow", $$InputRow, { "mode": mode, "group": true })}`)}` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/demo/InputDemo.astro", void 0);

const $$Astro$1 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Demo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Demo;
  getLangFromUrl(Astro2.url);
  const currentPath = globalService.currentPath(new URL(Astro2.url).pathname);
  const { contentEntry, class: className = null } = Astro2.props;
  const { Content, headings } = contentEntry ? await contentEntry.render() : { Content: null, headings: null };
  const { data } = contentEntry || {};
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "contentEntry": contentEntry, "Content": Content, "data": data, "class": className }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="row pb-5">${JSON.stringify(data)}</div> <div class="row pb-5"> <div class="col"> <h3>Values</h3> <ul> <li>SITE: <strong>${"https://joseantanaper.github.io/astro-bootstrap-hypnos-preview"}</strong></li> <li>BASE: <strong>${"/astro-bootstrap-hypnos-preview"}</strong></li> <li>
CurrentPath: <strong>${currentPath}</strong> </li> <li>Astro.url.href: ${Astro2.url.href}</li> <li>Astro.url.pathname: ${Astro2.url.pathname}</li> </ul> </div> </div> <div${addAttribute(`row pb-5`, "class")}> <div class="col"> <h3>Icons</h3> ${renderComponent($$result2, "Iconx", $$Iconx, { "id": "home", "debug": true })} </div> </div> <div${addAttribute(`row pb-5`, "class")}> <div class="col"> <h3>Weather widget</h3> ${renderComponent($$result2, "Weather", $$Weather, { "debug": true, "mode": 1 })} ${renderComponent($$result2, "Weather", $$Weather, { "debug": true, "mode": 0 })} </div> </div> <div${addAttribute(`row pb-5`, "class")}> <div class="col pb-5">${renderComponent($$result2, "InputDemo", $$InputDemo, {})}</div> <div class="col pb-5">${renderComponent($$result2, "BtnDemo", $$BtnDemo, {})}</div> </div> ` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/section/Demo.astro", void 0);

const $$Astro = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
async function getStaticPaths() {
  return ui.map(({ lang, title, subtitle }) => {
    return {
      params: { lang },
      props: { lang, title, subtitle }
    };
  });
}
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  globalService.currentPath(Astro2.url.href);
  const { lang, title, subtitle } = Astro2.props;
  const collection = await getCollection(
    "site",
    (entry) => entry.id.startsWith(`${lang}/99`)
  );
  const aboutSection = collection[0];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "header": true, "navbar": true, "subtitle": "About" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div class="container-fluid"> ${renderComponent($$result2, "Demo", $$Demo, { "contentEntry": aboutSection, "class": "app-parallax-section-1" })} </div> </main> ` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/pages/[...lang]/about.astro", void 0);

const $$file = "D:/DEV/Astro/astro-bootstrap-hypnos/src/pages/[...lang]/about.astro";
const $$url = "/astro-bootstrap-hypnos-preview/[...lang]/about";

export { $$About as default, $$file as file, getStaticPaths, $$url as url };
