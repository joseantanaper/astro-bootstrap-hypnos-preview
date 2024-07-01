import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, b as renderComponent, e as renderSlot } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import { $ as $$Iconx } from './Layout_D9agn0ZP.mjs';

const $$Astro = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Section = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Section;
  const {
    contentEntry = null,
    Content = null,
    data = null,
    text = null,
    class: className = null
  } = Astro2.props;
  return renderTemplate`${data ? renderTemplate`${maybeRenderHead()}<div${addAttribute(["row", "app-section", className], "class:list")}${addAttribute(
    data.link.includes("#") ? data.link.split("#")[1] : data.link,
    "data-section-id"
  )}><div class="col"><div class="row"><div class="col"><h2${addAttribute(
    data.link.includes("#") ? data.link.split("#")[1] : data.link,
    "id"
  )}>${renderComponent($$result, "Iconx", $$Iconx, { "id": data.icon })}<span>${data.title}</span></h2></div></div><div class="row"><div class="col">${Content && renderTemplate`${renderComponent($$result, "Content", Content, {})}`}</div></div><div class="row"><div class="col">${renderSlot($$result, $$slots["default"])}${text}</div></div></div></div>` : renderTemplate`<div${addAttribute(["row", "app-section", className], "class:list")}><div class="col"><div class="row"><div${addAttribute(["col", "text-center"], "class:list")}>${text && text}</div></div><div class="row"><div class="col">${" "}${renderSlot($$result, $$slots["default"])}</div></div></div></div>`}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/layouts/Section.astro", void 0);

const ui = [
  {
    lang: void 0,
    title: "Hypnos",
    subtitle: "Badalona"
  },
  {
    lang: "es",
    title: "Hypnos",
    subtitle: "Badalona"
  },
  {
    lang: "ca",
    title: "Hypnos",
    subtitle: "Badalona"
  },
  {
    lang: "en",
    title: "Hypnos",
    subtitle: "Badalona"
  }
];

export { $$Section as $, ui as u };
