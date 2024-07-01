import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, F as Fragment, m as maybeRenderHead, d as addAttribute } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
import { h as $$Image, $ as $$Iconx, g as getLangFromUrl, a as globalService, b as $$Weather, i as $$AddressCard, e as $$Link, u as useTranslations, j as hypnosHead, c as getCollection, d as $$Layout } from './Layout_D9agn0ZP.mjs';
import { $ as $$Section, u as ui } from './ui_C4MkEHhp.mjs';
import { loremIpsum } from 'lorem-ipsum';
import '@astrojs/internal-helpers/path';

const $$Astro$6 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$LoremIpsum = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$LoremIpsum;
  const { count = 1 } = Astro2.props;
  let lorem = [];
  for (let i = 0; i < count; i++) {
    lorem.push(
      loremIpsum({
        count: 1,
        format: "plain",
        units: "paragraph",
        paragraphLowerBound: 8,
        paragraphUpperBound: 12
      })
    );
  }
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${lorem.map((item) => {
    return renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${maybeRenderHead()}<p>${item}</p>` })}`;
  })}` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/widgets/LoremIpsum.astro", void 0);

const neuro1$1 = new Proxy({"src":"/astro-bootstrap-hypnos-preview/astro/neuro13.CicO391Y.jpg","width":1680,"height":1050,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/wp/neuro13.jpg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/wp/neuro13.jpg");
							return target[name];
						}
					});

const $$Astro$5 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$SpecCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$SpecCard;
  const { title, details } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card"> ${renderComponent($$result, "Image", $$Image, { "src": neuro1$1, "alt": "Hypnos", "class": "card-img-top app-card-img img-fluid", "loading": "eager" })} <div class="card-body"> <h4 class="card-title text-center"> <span class="d-block" style="font-size: 140%;"> ${title.split(" ").map((line, idx) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${line}${idx === 0 ? renderTemplate`<br>` : " "}` })}`)} </span> <span class="d-block opacity-50">${details}</span> </h4> <p class="card-text py-3"> ${renderComponent($$result, "LoremIpsum", $$LoremIpsum, { "count": 1 })} </p> <hr> <p class="card-text py-3"> <a href="#" class="btn btn-primary"> ${renderComponent($$result, "Iconx", $$Iconx, { "id": "arrowLink" })} <span>Go somewhere!</span></a> </p> </div> </div>`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/SpecCard.astro", void 0);

const $$Astro$4 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Spec = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Spec;
  getLangFromUrl(Astro2.url);
  globalService.currentPath(new URL(Astro2.url).pathname);
  const { contentEntry, class: className = null } = Astro2.props;
  const { Content, headings } = contentEntry ? await contentEntry.render() : { Content: null, headings: null };
  const { data } = contentEntry;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "contentEntry": contentEntry, "Content": Content, "data": data, "class": className }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="row"> ${data.content && data.content.map((spec) => renderTemplate`<div class="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3 p-2"> ${renderComponent($$result2, "SpecCard", $$SpecCard, { "title": spec.title, "details": spec.details })} </div>`)} </div> ` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/section/Spec.astro", void 0);

const $$Astro$3 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Contact;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const { contentEntry, class: className = null } = Astro2.props;
  const { Content, headings } = contentEntry ? await contentEntry.render() : { Content: null, headings: null };
  const { data } = contentEntry;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "contentEntry": contentEntry, "Content": Content, "data": data, "class": className }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="row"> <div class="col-md text-center fs-4"> <div class="row text-center"> <div class="col-lg-4 d-flex justify-content-center"> ${renderComponent($$result2, "Weather", $$Weather, {})} </div> <div class="col-lg text-center text-md-end"> ${renderComponent($$result2, "AddressCard", $$AddressCard, {})} </div> </div> <div class="row text-center pt-5"> <div class="vstack gap-5"> ${renderComponent($$result2, "Link", $$Link, { "href": t("phoneUrl"), "class": "btn-lg btn-success text-truncate py-3", "arial-label": "Phone", "label": t("phone"), "icon": "phone" })} ${renderComponent($$result2, "Link", $$Link, { "href": t("emailUrl"), "class": "btn-lg btn-warning text-truncate py-3", "arial-label": "Phone", "label": t("email"), "icon": "email" })} ${renderComponent($$result2, "Link", $$Link, { "href": t("instagramUrl"), "class": "btn-lg btn-danger text-truncate py-3", "arial-label": "Instagram", "label": t("instagram"), "icon": "instagram" })} </div> </div> </div> <div class="col-md p-3 my-auto"> <!-- <div class="app-map shadow"> --> <iframe class="w-100 shadow" title="Map" id="app-map"${addAttribute(t("mapEmbedUrl"), "src")} allowfullscreen="" loading="eager" referrerpolicy="no-referrer-when-downgrade"></iframe> <!-- </div> --> <div class="col text-center pt-3"> ${renderComponent($$result2, "Link", $$Link, { "href": t("mapUrl"), "class": "btn-lg btn-primary text-truncate py-3 w-100", "arial-label": t("nav.linkmap"), "label": t("nav.linkmap"), "icon": "map" })} </div> </div> </div> ` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/section/Contact.astro", void 0);

const neuro1 = new Proxy({"src":"/astro-bootstrap-hypnos-preview/astro/neuro15.CZQXlCw7.jpg","width":1920,"height":1080,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/wp/neuro15.jpg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/wp/neuro15.jpg");
							return target[name];
						}
					});

const $$Astro$2 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$ContactCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ContactCard;
  const { person, name, surname, job, id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card"> ${renderComponent($$result, "Image", $$Image, { "src": neuro1, "alt": "Hypnos", "class": "card-img-top app-card-img img-fluid", "loading": "eager" })} ${renderComponent($$result, "Image", $$Image, { "src": hypnosHead, "alt": "Hypnos", "class": "app-avatar img-fluid rounded-circle mx-auto", "loading": "eager" })} <div class="card-body"> <h3 class="card-title text-center"> <span class="d-block" style="font-size: 140%;">${name}</span><span class="d-block opacity-50">${surname}</span> </h3> <p class="card-text py-3"> ${renderComponent($$result, "LoremIpsum", $$LoremIpsum, {})}
#${id} </p> <hr> <p class="card-text py-3"> <a href="#" class="btn btn-primary"> ${renderComponent($$result, "Iconx", $$Iconx, { "id": "arrowLink" })} <span>Go somewhere ${id}</span></a> </p> </div> </div>`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/ContactCard.astro", void 0);

const $$Astro$1 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$We = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$We;
  getLangFromUrl(Astro2.url);
  globalService.currentPath(new URL(Astro2.url).pathname);
  const { contentEntry, class: className = null } = Astro2.props;
  const { Content, headings } = contentEntry ? await contentEntry.render() : { Content: null, headings: null };
  const { data } = contentEntry;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "contentEntry": contentEntry, "Content": Content, "data": data, "class": className }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="row"> ${data.content && data.content.map(
    (person) => person && renderTemplate`<div class="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3 p-2"> ${renderComponent($$result2, "ContactCard", $$ContactCard, { "name": person.name, "surname": person.surname, "id": person.id, "job": person.job })} </div>`
  )} </div> ` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/section/We.astro", void 0);

const $$Astro = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const getStaticPaths = async () => {
  return ui.map(({ lang, title, subtitle }) => {
    console.log("[lang]/index", lang);
    return {
      params: { lang },
      props: { lang, title, subtitle }
    };
  });
};
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  globalService.currentPath(Astro2.url.href);
  const { lang, title, subtitle } = Astro2.props;
  const collection = await getCollection(
    "site",
    (entry) => entry.id.startsWith(`${lang}/`) && !entry.id.startsWith(`${lang}/00`)
  );
  const specialtiesSection = collection[0];
  const weSection = collection[1];
  const contactSection = collection[2];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "header": true, "navbar": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div class="container-fluid text-center"> ${renderComponent($$result2, "Section", $$Section, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Iconx", $$Iconx, { "id": "quote", "size": 56, "class": "opacity-25" })} <div class="app-heading-text"> ${renderComponent($$result3, "LoremIpsum", $$LoremIpsum, {})} </div> ` })} ${renderComponent($$result2, "Spec", $$Spec, { "contentEntry": specialtiesSection, "class": "app-parallax-section-1" })} ${renderComponent($$result2, "We", $$We, { "contentEntry": weSection, "class": "app-parallax-section-2" })} ${renderComponent($$result2, "Contact", $$Contact, { "contentEntry": contactSection, "class": "app-parallax-section-3" })} ${renderComponent($$result2, "Section", $$Section, { "text": "Empty Section", "class": "app-parallax-section-4 text-center" }, { "default": ($$result3) => renderTemplate` <div class="p-5">${renderComponent($$result3, "LoremIpsum", $$LoremIpsum, {})}</div> ` })} ${renderComponent($$result2, "Section", $$Section, { "text": "Empty Section Again", "class": "app-parallax-section-5 text-center" }, { "default": ($$result3) => renderTemplate` <div class="p-5">${renderComponent($$result3, "LoremIpsum", $$LoremIpsum, {})}</div> ` })} </div> </main> ` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/pages/[...lang]/index.astro", void 0);

const $$file = "D:/DEV/Astro/astro-bootstrap-hypnos/src/pages/[...lang]/index.astro";
const $$url = "/astro-bootstrap-hypnos-preview/[...lang]";

export { $$Index as default, $$file as file, getStaticPaths, $$url as url };
